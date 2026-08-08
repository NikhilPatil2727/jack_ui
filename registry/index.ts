import {component} from './registry-components';

import {hooks} from './registry-hooks';

import type {Registry} from './schema'
import {block} from './registry-blocks';
import { lib } from './registry-lib';
import { templates } from './registry-templates';

export const registry: Registry = [...component, ...hooks, ...block ,...lib, ...templates]
