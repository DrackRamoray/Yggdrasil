import { cyan } from 'kolorist';
import prompts from 'prompts';
import createQuestions from './question';
import validate from './validate';
import {
  appendScriptsToRootPackage,
  copy,
  ensureDirIsExist,
  getTargetDir,
  getTemplateDir,
  readdir,
  readPackageJson,
  writePackageJson,
  writeREADME,
} from './fs';
import { PkgPrefix } from '../constants';

async function init() {
  let result: prompts.Answers<'template' | 'packageName'>;

  try {
    const questions = createQuestions();
    result = await prompts(questions);
  } catch (cancelled: any) {
    console.log(cancelled.message);
    return;
  }

  const { template, packageName } = validate(result);

  const templateDir = getTemplateDir(template);
  const targetDir = getTargetDir(template, packageName);

  ensureDirIsExist(targetDir);

  const entries = readdir(templateDir);

  entries.forEach((entry) => {
    if (entry === 'package.json') {
      return;
    }

    copy(templateDir, targetDir, entry);
  });

  const pkg = readPackageJson(templateDir);
  pkg.name = `${PkgPrefix[template]}${packageName}`;

  writePackageJson(targetDir, pkg);

  writeREADME(targetDir, `### ${pkg.name} \n`);

  appendScriptsToRootPackage(template, packageName);

  console.log(`\nDone. Now run:\n`);
  console.log(cyan(`  pnpm install \n`));
}

export default init;
