import {
  getBooleanInput,
  getInput,
  getMultilineInput,
  getNumberInput,
  getUnionInput,
  getYAMLInput,
} from 'actions-parsers';
import * as rt from 'runtypes';

const configValueRt = rt.Dictionary(
  rt.Record({
    value: rt.String,
    secret: rt.Boolean.optional(),
  }),
  rt.String,
);

const config = {
  command: getUnionInput('command', {
    required: true,
    alternatives: ['up', 'update', 'refresh', 'destroy', 'preview'] as const,
  }),
  stackName: getInput('stack-name', { required: true }),
  pulumiVersion: getInput('pulumi-version'),
  workDir: getInput('work-dir', { required: true }),
  secretsProvider: getInput('secrets-provider'),
  cloudUrl: getInput('cloud-url'),
  githubToken: getInput('github-token'),
  commentOnPr: getBooleanInput('comment-on-pr'),
  commentOnPrNumber: getNumberInput('comment-on-pr-number', {}),
  upsert: getBooleanInput('upsert'),
  remove: getBooleanInput('remove'),
  refresh: getBooleanInput('refresh'),
  configMap: getYAMLInput('config-map', {
    parser: (configMap) => configValueRt.check(configMap),
  }),
  editCommentOnPr: getBooleanInput('edit-pr-comment'),

  options: {
    parallel: getNumberInput('parallel', {}),
    message: getInput('message'),
    expectNoChanges: getBooleanInput('expect-no-changes'),
    diff: getBooleanInput('diff'),
    replace: getMultilineInput('replace'),
    target: getMultilineInput('target'),
    targetDependents: getBooleanInput('target-dependents'),
    policyPacks: getMultilineInput('policyPacks'),
    policyPackConfigs: getMultilineInput('policyPackConfigs'),
    userAgent: 'pulumi/actions@v3',
  },
};

export type Config = typeof config;

export type Commands = Config['command'];

export async function makeConfig(): Promise<Config> {
  return config;
}
