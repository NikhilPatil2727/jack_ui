// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "blocks/auth-basic.mdx": () => import("../content/docs/blocks/auth-basic.mdx?collection=docs"), "components/button.mdx": () => import("../content/docs/components/button.mdx?collection=docs"), "components/card.mdx": () => import("../content/docs/components/card.mdx?collection=docs"), "components/svg-animations.mdx": () => import("../content/docs/components/svg-animations.mdx?collection=docs"), "components/terminal.mdx": () => import("../content/docs/components/terminal.mdx?collection=docs"), "hooks/use-auto-resize-textarea.mdx": () => import("../content/docs/hooks/use-auto-resize-textarea.mdx?collection=docs"), "hooks/use-click-outside.mdx": () => import("../content/docs/hooks/use-click-outside.mdx?collection=docs"), }),
};
export default browserCollections;