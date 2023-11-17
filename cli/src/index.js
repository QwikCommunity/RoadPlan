#!/usr/bin/env node

import { intro, select, isCancel, text, cancel, outro, log } from "@clack/prompts";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs-extra";
import { installDependencies, isPackageManagerInstalled } from "./utils/installDependencies.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createProject = async () => {
  const defaultProjectName = "./roadplan-app";

  const packageManager = await select({
    message: "Choose your favourite package manager:",
    options: [
      { value: "npm", label: "npm" },
      { value: "pnpm", label: "pnpm" },
      { value: "bun", label: "bun" },
      { value: "yarn", label: "yarn" },
    ],
  });

  const packageManagerInstalled = await isPackageManagerInstalled(packageManager);

  if (!packageManagerInstalled) {
    cancel(`The package manager ${packageManager} is not installed on your machine`);
    return process.exit(0);
  }

  const projectNameAnswer = await text({
    message: "Dove desideri creare il nuovo progetto?",
    placeholder: defaultProjectName,
  });;

  if (isCancel([projectNameAnswer, packageManager])) {
    cancel("Operation canceled.");
    process.exit(0);
  }

  const appPath = path.join(projectNameAnswer);
  const templatePath = path.join(__dirname, "templates", "roadplan");

  try {
    log.step("Creating project directories and copying files...");
    fs.ensureDirSync(appPath);
    fs.copySync(templatePath, appPath);

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