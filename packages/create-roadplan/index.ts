#! /usr/bin/env node

import { cancel, confirm, intro, isCancel, log, outro, text } from "@clack/prompts";
import { exec, spawn } from "child_process";
import { cpSync, existsSync, mkdirSync } from "fs";
import { gray } from 'kleur/colors';
import path from "path";
import { fileURLToPath } from "url";
import detectPackageManager from 'which-pm-runs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  const templatePath = path.join(__dirname, "../", "template");

  try {
    log.step("Creating project directories and copying files...");
    if (!existsSync(projectNameAnswer)) {
      mkdirSync(projectNameAnswer, { recursive: true });
    }
    cpSync(templatePath, projectNameAnswer, { recursive: true });

    const runDepInstallAnswer = await confirm({
      message: `Would you like to install ${packageManager} dependencies?`,
      initialValue: true,
    });

    if (typeof runDepInstallAnswer === 'symbol' || !runDepInstallAnswer) {
      outro("RoadPlan starter creation completed successfully!");
      process.exit(0);
    }

    log.step("Installing dependencies...");
    await installDependencies(packageManager, projectNameAnswer);

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