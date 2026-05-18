import type { Registry } from "./schema";

export const component: Registry = [
    {
        name: "action-search-bar",
        type: "registry:component",
        dependencies: ["framer-motion", "lucide-react"],
        registryDependencies: ["badge", "input"],
        files: [
            {
                path: "components/jackui/action-search-bar.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "avatar-picker",
        type: "registry:component",
        dependencies: ["motion"],
        registryDependencies: ["card"],
        files: [
            {
                path: "components/jackui/avatar-picker.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "background-circles",
        type: "registry:component",
        dependencies: ["clsx", "motion"],
        files: [
            {
                path: "components/jackui/background-circles.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "background-paths",
        type: "registry:component",
        dependencies: ["framer-motion"],
        registryDependencies: ["button"],
        files: [
            {
                path: "components/jackui/background-paths.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "beams-background",
        type: "registry:component",
        dependencies: ["motion"],
        files: [
            {
                path: "components/jackui/beams-background.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "bento-grid",
        type: "registry:component",
        dependencies: ["lucide-react"],
        files: [
            {
                path: "components/jackui/bento-grid.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "checkout-interaction",
        type: "registry:component",
        dependencies: ["lucide-react", "motion"],
        registryDependencies: ["button"],
        files: [
            {
                path: "components/jackui/checkout-interaction.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "currency-transfer",
        type: "registry:component",
        dependencies: ["framer-motion", "lucide-react"],
        registryDependencies: ["button", "card"],
        files: [
            {
                path: "components/jackui/currency-transfer.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "hand-written-title",
        type: "registry:component",
        dependencies: ["motion"],
        files: [
            {
                path: "components/jackui/hand-written-title.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "hero-geometric",
        type: "registry:component",
        dependencies: ["motion"],
        files: [
            {
                path: "components/jackui/hero-geometric.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "matrix-text",
        type: "registry:component",
        dependencies: ["motion"],
        files: [
            {
                path: "components/jackui/matrix-text.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "particle-button",
        type: "registry:component",
        dependencies: ["lucide-react", "motion"],
        registryDependencies: ["button"],
        files: [
            {
                path: "components/jackui/particle-button.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "particles-background",
        type: "registry:component",
        dependencies: ["motion"],
        files: [
            {
                path: "components/jackui/particles-background.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "toolbar",
        type: "registry:component",
        dependencies: ["lucide-react", "motion"],
        files: [
            {
                path: "components/jackui/toolbar.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "tweet-card",
        type: "registry:component",
        dependencies: ["lucide-react"],
        files: [
            {
                path: "components/jackui/tweet-card.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "vercel-v0-chat",
        type: "registry:component",
        dependencies: ["lucide-react"],
        registryDependencies: ["textarea"],
        files: [
            {
                path: "components/jackui/vercel-v0-chat.tsx",
                type: "registry:component",
            },
            {
                path: "hooks/use-auto-resize-textarea.ts",
                type: "registry:hook",
            },
        ],
    },
    {
        name: "ai-input-01",
        type: "registry:component",
        dependencies: ["lucide-react"],
        registryDependencies: ["textarea"],
        files: [
            {
                path: "components/jackui/ai-input/ai-input-01.tsx",
                type: "registry:component",
            },
            {
                path: "hooks/use-auto-resize-textarea.ts",
                type: "registry:hook",
            },
        ],
    },
    {
        name: "alert-01",
        type: "registry:component",
        dependencies: ["lucide-react"],
        files: [
            {
                path: "components/jackui/alert/alert-01.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "btn-01",
        type: "registry:component",
        dependencies: ["lucide-react"],
        registryDependencies: ["button"],
        files: [
            {
                path: "components/jackui/buttons/btn-01.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "btn-02",
        type: "registry:component",
        registryDependencies: ["button"],
        files: [
            {
                path: "components/jackui/buttons/btn-02.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "btn-03",
        type: "registry:component",
        dependencies: ["lucide-react", "motion"],
        registryDependencies: ["button"],
        files: [
            {
                path: "components/jackui/buttons/btn-03.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "btn-04",
        type: "registry:component",
        dependencies: ["lucide-react", "motion"],
        registryDependencies: ["button"],
        files: [
            {
                path: "components/jackui/buttons/btn-04.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "btn-05",
        type: "registry:component",
        dependencies: ["lucide-react", "motion"],
        registryDependencies: ["button"],
        files: [
            {
                path: "components/jackui/buttons/btn-05.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "btn-06",
        type: "registry:component",
        dependencies: ["lucide-react"],
        registryDependencies: ["button"],
        files: [
            {
                path: "components/jackui/buttons/btn-06.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "btn-07",
        type: "registry:component",
        dependencies: ["lucide-react"],
        registryDependencies: ["button"],
        files: [
            {
                path: "components/jackui/buttons/btn-07.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "btn-08",
        type: "registry:component",
        dependencies: ["lucide-react"],
        registryDependencies: ["button"],
        files: [
            {
                path: "components/jackui/buttons/btn-08.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "btn-09",
        type: "registry:component",
        registryDependencies: ["button"],
        files: [
            {
                path: "components/jackui/buttons/btn-09.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "btn-10",
        type: "registry:component",
        dependencies: ["lucide-react"],
        registryDependencies: ["button"],
        files: [
            {
                path: "components/jackui/buttons/btn-10.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "btn-11",
        type: "registry:component",
        dependencies: ["lucide-react"],
        registryDependencies: ["button"],
        files: [
            {
                path: "components/jackui/buttons/btn-11.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "btn-12",
        type: "registry:component",
        registryDependencies: ["button"],
        files: [
            {
                path: "components/jackui/buttons/btn-12.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "btn-13",
        type: "registry:component",
        registryDependencies: ["button"],
        files: [
            {
                path: "components/jackui/buttons/btn-13.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "btn-14",
        type: "registry:component",
        dependencies: ["lucide-react"],
        registryDependencies: ["button"],
        files: [
            {
                path: "components/jackui/buttons/btn-14.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "btn-15",
        type: "registry:component",
        dependencies: ["lucide-react"],
        registryDependencies: ["button"],
        files: [
            {
                path: "components/jackui/buttons/btn-15.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "card-01",
        type: "registry:component",
        dependencies: ["lucide-react"],
        files: [
            {
                path: "components/jackui/cards/card-01.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "card-02",
        type: "registry:component",
        dependencies: ["lucide-react"],
        registryDependencies: ["button"],
        files: [
            {
                path: "components/jackui/cards/card-02.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "card-03",
        type: "registry:component",
        dependencies: ["lucide-react"],
        files: [
            {
                path: "components/jackui/cards/card-03.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "card-04",
        type: "registry:component",
        dependencies: ["lucide-react"],
        files: [
            {
                path: "components/jackui/cards/card-04.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "card-05",
        type: "registry:component",
        dependencies: ["lucide-react"],
        files: [
            {
                path: "components/jackui/cards/card-05.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "card-06",
        type: "registry:component",
        dependencies: ["lucide-react"],
        files: [
            {
                path: "components/jackui/cards/card-06.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "card-07",
        type: "registry:component",
        dependencies: ["lucide-react"],
        files: [
            {
                path: "components/jackui/cards/card-07.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "card-08",
        type: "registry:component",
        dependencies: ["lucide-react"],
        files: [
            {
                path: "components/jackui/cards/card-08.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "card-09",
        type: "registry:component",
        dependencies: ["lucide-react"],
        files: [
            {
                path: "components/jackui/cards/card-09.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "card-10",
        type: "registry:component",
        dependencies: ["lucide-react"],
        registryDependencies: ["button", "progress"],
        files: [
            {
                path: "components/jackui/cards/card-10.tsx",
                type: "registry:component",
            },
        ],
    },
];
