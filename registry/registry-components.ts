import type { Registry } from "./schema";

export const component: Registry = [
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
        name: "btn-01",
        type: "registry:component",
        dependencies: ["motion"],
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
        dependencies: ["motion"],
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
        dependencies: ["motion"],
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
        dependencies: ["motion"],
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
        dependencies: ["motion"],
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
        dependencies: ["motion"],
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
        name: "envelope-card",
        type: "registry:component",
        dependencies: ["motion"],
        files: [
            {
                path: "components/jackui/cards/envelope-card.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "inbox-deck",
        type: "registry:component",
        dependencies: ["motion"],
        files: [
            {
                path: "components/jackui/cards/InboxDeck.tsx",
                type: "registry:component",
            },
        ],
    },
];
