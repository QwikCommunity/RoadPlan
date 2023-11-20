#! /usr/bin/env node

import { cancel, confirm, intro, isCancel, log, outro, spinner, text } from "@clack/prompts";
import { ChildProcess, exec, spawn } from "child_process";
import { cpSync, existsSync, mkdirSync } from "fs";
import { gray, red } from 'kleur/colors';
import fs from 'node:fs';
import os from 'node:os';
import { join } from 'node:path';
import path, { resolve } from "path";
import { fileURLToPath } from "url";
import detectPackageManager from 'which-pm-runs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function resolveRelativeDir(dir: string) {
  // check if the outDir start with home ~
  if (dir.startsWith('~/')) {
    return resolve(os.homedir(), dir);
  } else {
    return resolve(process.cwd(), dir);
  }
}

export function runCommand(cmd: string, args: string[], cwd: string) {
  let child: ChildProcess;

  const install = new Promise<boolean>((resolve) => {
    try {
      child = spawn(cmd, args, {
        cwd,
        stdio: 'ignore',
      });

      child.on('error', (e) => {
        if (e) {
          if (e.message) {
            log.error(red(String(e.message)) + `\n\n`);
          } else {
            log.error(red(String(e)) + `\n\n`);
          }
        }
        resolve(false);
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    } catch (e) {
      resolve(false);
    }
  });

  const abort = async () => {
    if (child) {
      child.kill('SIGINT');
    }
  };

  return { abort, install };
}

export const isPackageManagerInstalled = (packageManager) => {
  return new Promise((resolve) => {
    exec(`${packageManager} --version`, (error, _, stderr) => {
      if (error || stderr) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

export const installDependencies = async (packageManager, appPath) => {
  let args = ['install'];

  return new Promise((resolve, reject) => {
    const child = spawn(packageManager, args, {
      cwd: appPath,
      stdio: 'inherit',
      env: {
        ...process.env,
        ADBLOCK: '1',
        NODE_ENV: 'development',
        DISABLE_OPENCOLLECTIVE: '1',
      },
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject({ command: `${packageManager} ${args.join(' ')}` });
        return;
      }
      resolve(true);
    });
  });
};

export function getPackageManager() {
  return detectPackageManager()?.name || 'npm';
}

const createProject = async () => {
  const packageManager = getPackageManager();

  const defaultProjectName = "./roadplan-app";
  const projectNameAnswer = await text({
    message: `Where would you like to create your new project? ${gray(
      `(Use '.' or './' for current directory)`
    )}`,
    placeholder: defaultProjectName,
    validate(value) {
      if (value.length === 0) return `Value is required!`;
    },
  });

  if (typeof projectNameAnswer === 'symbol') {
    cancel("Operation canceled.");
    return process.exit(0);
  }

  if (isCancel([projectNameAnswer, packageManager])) {
    cancel("Operation canceled.");
    process.exit(0);
  }

  const templatePath = path.join(__dirname, "..", "template");

  try {
    log.step("Creating project directories and copying files...");
    if (!existsSync(projectNameAnswer)) {
      mkdirSync(projectNameAnswer, { recursive: true });
    }
    cpSync(templatePath, projectNameAnswer, { recursive: true });

    const outDir: string = resolveRelativeDir(projectNameAnswer.trim());

    const runDepInstallAnswer = await confirm({
      message: `Would you like to install ${packageManager} dependencies?`,
      initialValue: true,
    });

    if (typeof runDepInstallAnswer === 'symbol' || !runDepInstallAnswer) {
      outro("RoadPlan starter creation completed successfully!");
      process.exit(0);
    }

    const gitInitAnswer = await confirm({
      message: `Initialize a new git repository?`,
      initialValue: true,
    });

    log.step("Installing dependencies...");
    await installDependencies(packageManager, projectNameAnswer);

    const s = spinner();

    if (gitInitAnswer) {
      if (fs.existsSync(join(outDir, '.git'))) {
        log.info(`Git has already been initialized before. Skipping...`);
      } else {
        s.start('Git initializing...');
  
        try {
          const res = [];
          res.push(await runCommand('git', ['init'], outDir).install);
          res.push(await runCommand('git', ['add', '-A'], outDir).install);
          res.push(await runCommand('git', ['commit', '-m', 'Initial commit ⚡️'], outDir).install);
  
          if (res.some((r) => r === false)) {
            throw '';
          }
  
          s.stop('Git initialized 🎲');
        } catch (e) {
          s.stop('Git failed to initialize');
          log.error(red(`Git failed to initialize. You can do this manually by running: git init`));
        }
      }
    }

    outro("RoadPlan starter creation completed successfully!");
  } catch (err) {
    console.error("An error occurred during RoadPlan starter creation:", err);
    process.exit(1);
  }
};

async function main() {
  intro("RoadPlan starter creation");
  await createProject();
}

main().catch(console.error);