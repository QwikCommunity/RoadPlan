import { cancel, intro, isCancel, log, outro, select, text } from "@clack/prompts";
import { exec, spawn } from "child_process";
import { cpSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const isPackageManagerInstalled = (packageManager) => {
  return new Promise((resolve) => {
    exec(`${packageManager} --version`, (error, stdout, stderr) => {
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

const createProject = async () => {
  const packageManager = await select({
    message: "Choose your favourite package manager:",
    options: [
      { value: "npm", label: "npm" },
      { value: "pnpm", label: "pnpm" },
      { value: "bun", label: "bun" },
      { value: "yarn", label: "yarn" },
    ],
  });

  if (typeof packageManager === 'symbol') {
    cancel("Operation canceled.");
    return process.exit(0);
  }

  const packageManagerInstalled = await isPackageManagerInstalled(packageManager);

  if (!packageManagerInstalled) {
    cancel(`The package manager ${packageManager} is not installed on your machine`);
    return process.exit(0);
  }

  const defaultProjectName = "./roadplan-app";
  const projectNameAnswer = await text({
    message: "Dove desideri creare il nuovo progetto?",
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

  const appPath = path.join(__dirname, projectNameAnswer);
  const templatePath = path.join(__dirname, "..", "template");

  try {
    log.step("Creating project directories and copying files...");
    console.log('-------', appPath)
    if (!existsSync(appPath)) {
      console.log('---111---', appPath)
      mkdirSync(appPath, { recursive: true });
    }
    cpSync(templatePath, appPath, {recursive: true});

    log.step("Installing dependencies...");
    await installDependencies(packageManager, appPath);

    outro("Project creation completed successfully!");
  } catch (err) {
    console.error("An error occurred during project creation:", err);
    process.exit(1);
  }
};

async function main() {
  intro("create-my-roadplan-app");
  await createProject();
}

main().catch(console.error);