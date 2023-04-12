import type { PromptObject } from 'prompts';
import { PkgType } from '../constants';

const createQuestions = (): PromptObject[] => {
  return [
    {
      type: 'select',
      name: 'template',
      message: 'pick a template',
      choices: [
        {
          title: PkgType.App,
          value: PkgType.App,
        },
        {
          title: PkgType.Component,
          value: PkgType.Component,
        },
        {
          title: PkgType.Library,
          value: PkgType.Library,
        },
      ],
    },
    {
      type: 'text',
      name: 'packageName',
      message: 'package name',
    },
  ];
};

export default createQuestions;
