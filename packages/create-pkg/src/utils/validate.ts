import { exit } from 'node:process';
import { red } from 'kolorist';
import { PkgType } from '../constants';

interface Params {
  template: PkgType;
  packageName: string;
}

const formatPackageName = (packageName: string): string => {
  return (
    packageName
      .trim()
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
      ) || []
  )
    .map((s) => s.toLowerCase())
    .join('-');
};

const validate = (params: Params) => {
  if (!PkgType[params.template]) {
    console.log(
      red(`\ntemplate must be one of [${Object.values(PkgType)}].\n`),
    );
    exit(1);
  }

  if (!params.packageName) {
    console.log(red('\npackage name must be provided.\n'));
    exit(1);
  }

  return {
    template: params.template,
    packageName: formatPackageName(params.packageName),
  };
};

export default validate;
