import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

const regex = /\$\{([^}]+)\}/g;

export const configLoader = (configPath: string) => () => {
  return yaml.load(
    readFileSync(configPath, 'utf-8').replace(
      regex,
      (_, key) => process.env[key],
    ),
  ) as Record<string, any>;
};
