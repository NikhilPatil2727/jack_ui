// @ts-nocheck
import { default as __fd_glob_15 } from "../content/docs/components/buttons/meta.json?collection=meta"
import { default as __fd_glob_14 } from "../content/docs/meta.json?collection=meta"
import * as __fd_glob_13 from "../content/docs/components/buttons/star-burst-button.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/components/buttons/spark-button.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/components/buttons/smoke-flare-button.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/components/buttons/ink-fill-button.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/components/buttons/3d-tilt-shimmer-button.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/hooks/use-click-outside.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/hooks/use-auto-resize-textarea.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/components/terminal.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/components/svg-animations.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/components/dock.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/components/card.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/blocks/pricing.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/blocks/auth-basic.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/index.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.doc("docs", "content/docs", {"index.mdx": __fd_glob_0, "blocks/auth-basic.mdx": __fd_glob_1, "blocks/pricing.mdx": __fd_glob_2, "components/card.mdx": __fd_glob_3, "components/dock.mdx": __fd_glob_4, "components/svg-animations.mdx": __fd_glob_5, "components/terminal.mdx": __fd_glob_6, "hooks/use-auto-resize-textarea.mdx": __fd_glob_7, "hooks/use-click-outside.mdx": __fd_glob_8, "components/buttons/3d-tilt-shimmer-button.mdx": __fd_glob_9, "components/buttons/ink-fill-button.mdx": __fd_glob_10, "components/buttons/smoke-flare-button.mdx": __fd_glob_11, "components/buttons/spark-button.mdx": __fd_glob_12, "components/buttons/star-burst-button.mdx": __fd_glob_13, });

export const meta = await create.meta("meta", "content/docs", {"meta.json": __fd_glob_14, "components/buttons/meta.json": __fd_glob_15, });