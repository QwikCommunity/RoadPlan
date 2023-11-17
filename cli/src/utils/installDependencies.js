import { spawn } from "cross-spawn";
import { exec } from 'child_process';

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
      resolve();
    });
  });
};