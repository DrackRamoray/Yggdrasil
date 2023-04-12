import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { cwd, exit } from 'node:process';
import { default as glob } from 'fast-glob';
import { default as minimist } from 'minimist';
import { red } from 'kolorist';
import { default as semver } from 'semver';

const upgradeAppVersion = function () {
  const pkgs = glob.sync('apps/!(node_modules)/package.json');
  const argv = minimist(process.argv.slice(2));
  const version = argv.version
    ? argv.version
    : argv.v
      ? argv.v
      : Array.isArray(argv._) && argv._.length
        ? argv._[0]
        : undefined;

  if (!version) {
    console.log(
      red(
        '\n upgrade app version failed. version(major.minor.patch) must be provided. \n',
      ),
    );
    exit(1);
  }

  if (!semver.valid(version)) {
    console.log(
      red(`\n upgrade app version failed. version = '${version}' is invalid. \n`),
    );
    exit(1);
  }

  pkgs.forEach((pkgPath) => {
    const absPath = join(cwd(), pkgPath);
    const str = readFileSync(absPath, 'utf-8');
    const pkg = JSON.parse(str);
    pkg.version = version;

    writeFileSync(absPath, `${JSON.stringify(pkg, null, 2)}\n`);
  });
};

upgradeAppVersion();
