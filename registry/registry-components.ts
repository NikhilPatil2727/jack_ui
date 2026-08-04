import type { Registry } from "./schema";

export const component: Registry = [
    // {
    //     name: "ai-input-01",
    //     type: "registry:component",
    //     dependencies: ["lucide-react"],
    //     registryDependencies: ["textarea"],
    //     files: [
    //         {
    //             path: "components/jackui/ai-input/ai-input-01.tsx",
    //             type: "registry:component",
    //         },
    //         {
    //             path: "hooks/use-auto-resize-textarea.ts",
    //             type: "registry:hook",
    //         },
    //     ],
    // },
    {
        name: "InkFillBtn",
        type: "registry:component",
        dependencies: ["motion"],
        files: [
            {
                path: "components/jackui/buttons/InkFillBtn.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "smoke-flare-button",
        type: "registry:component",
        dependencies: ["motion"],
        files: [
            {
                path: "components/jackui/buttons/smoke-flare-button.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "spark-button",
        type: "registry:component",
        dependencies: ["motion"],
        files: [
            {
                path: "components/jackui/buttons/spark-button.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "3d-tilt-shimmer-button",
        type: "registry:component",
        dependencies: ["motion"],
        registryDependencies: ["button"],
        files: [
            {
                path: "components/jackui/buttons/3d-tilt-shimmer-button.tsx",
                type: "registry:component",
            },
        ],
    },
    // {
    //     name: "btn-05",
    //     type: "registry:component",
    //     dependencies: ["motion"],
    //     files: [
    //         {
    //             path: "components/jackui/buttons/btn-05.tsx",
    //             type: "registry:component",
    //         },
    //     ],
    // },
    // {
    //     name: "btn-06",
    //     type: "registry:component",
    //     dependencies: ["motion"],
    //     files: [
    //         {
    //             path: "components/jackui/buttons/btn-06.tsx",
    //             type: "registry:component",
    //         },
    //     ],
    // },
    {
        name: "star-burst-button",
        type: "registry:component",
        dependencies: ["motion"],
        files: [
            {
                path: "components/jackui/buttons/star-burst-button.tsx",
                type: "registry:component",
            },
        ],
    },
    // {
    //     name: "btn-08",
    //     type: "registry:component",
    //     dependencies: ["lucide-react"],
    //     registryDependencies: ["button"],
    //     files: [
    //         {
    //             path: "components/jackui/buttons/btn-08.tsx",
    //             type: "registry:component",
    //         },
    //     ],
    // },
    // {
    //     name: "btn-09",
    //     type: "registry:component",
    //     registryDependencies: ["button"],
    //     files: [
    //         {
    //             path: "components/jackui/buttons/btn-09.tsx",
    //             type: "registry:component",
    //         },
    //     ],
    // },
    // {
    //     name: "btn-10",
    //     type: "registry:component",
    //     dependencies: ["lucide-react"],
    //     registryDependencies: ["button"],
    //     files: [
    //         {
    //             path: "components/jackui/buttons/btn-10.tsx",
    //             type: "registry:component",
    //         },
    //     ],
    // },
    // {
    //     name: "btn-11",
    //     type: "registry:component",
    //     dependencies: ["lucide-react"],
    //     registryDependencies: ["button"],
    //     files: [
    //         {
    //             path: "components/jackui/buttons/btn-11.tsx",
    //             type: "registry:component",
    //         },
    //     ],
    // },
    // {
    //     name: "btn-12",
    //     type: "registry:component",
    //     registryDependencies: ["button"],
    //     files: [
    //         {
    //             path: "components/jackui/buttons/btn-12.tsx",
    //             type: "registry:component",
    //         },
    //     ],
    // },
    // {
    //     name: "btn-13",
    //     type: "registry:component",
    //     registryDependencies: ["button"],
    //     files: [
    //         {
    //             path: "components/jackui/buttons/btn-13.tsx",
    //             type: "registry:component",
    //         },
    //     ],
    // },
    // {
    //     name: "btn-14",
    //     type: "registry:component",
    //     dependencies: ["lucide-react"],
    //     registryDependencies: ["button"],
    //     files: [
    //         {
    //             path: "components/jackui/buttons/btn-14.tsx",
    //             type: "registry:component",
    //         },
    //     ],
    // },
    // {
    //     name: "btn-15",
    //     type: "registry:component",
    //     dependencies: ["lucide-react"],
    //     registryDependencies: ["button"],
    //     files: [
    //         {
    //             path: "components/jackui/buttons/btn-15.tsx",
    //             type: "registry:component",
    //         },
    //     ],
    // },
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
    {
        name: "audience-hub-animation",
        type: "registry:component",
        dependencies: ["motion", "lucide-react"],
        files: [
            {
                path: "components/jackui/svganimations/AudienceHubAnimation.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "neural-circuit-orchestrator",
        type: "registry:component",
        dependencies: ["motion", "lucide-react"],
        files: [
            {
                path: "components/jackui/svganimations/NeuralCircuitOrchestrator.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "terminal",
        type: "registry:component",
        dependencies: ["motion", "lucide-react"],
        files: [
            {
                path: "components/jackui/terminal.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "ai-agent-terminal",
        type: "registry:component",
        dependencies: ["motion", "lucide-react"],
        files: [
            {
                path: "components/jackui/ai-agent-terminal.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "terminal-mockup",
        type: "registry:component",
        dependencies: ["motion", "lucide-react"],
        files: [
            {
                path: "components/jackui/terminal-mockup.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "dock",
        type: "registry:component",
        dependencies: ["motion", "lucide-react"],
        files: [
            {
                path: "components/jackui/dock/animated-dock-demo.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "spring-animated-button",
        type: "registry:component",
        dependencies: ["motion"],
        files: [
            {
                path: "components/jackui/buttons/spring-animated-button.tsx",
                type: "registry:component",
            },
        ],
    },
];

