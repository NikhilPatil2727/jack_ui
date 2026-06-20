import type { Registry } from "./schema";

export const component: Registry = [
    // {
    //     name: "action-search-bar",
    //     type: "registry:component",
    //     dependencies: ["framer-motion", "lucide-react"],
    //     registryDependencies: ["badge", "input"],
    //     files: [
    //         {
    //             path: "components/jackui/action-search-bar.tsx",
    //             type: "registry:component",
    //         },
    //     ],
    // },
    // {
    //     name: "avatar-picker",
    //     type: "registry:component",
    //     dependencies: ["motion"],
    //     registryDependencies: ["card"],
    //     files: [
    //         {
    //             path: "components/jackui/avatar-picker.tsx",
    //             type: "registry:component",
    //         },
    //     ],
    // },
    
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
    // {
    //     name: "alert-01",
    //     type: "registry:component",
    //     dependencies: ["lucide-react"],
    //     files: [
    //         {
    //             path: "components/jackui/alert/alert-01.tsx",
    //             type: "registry:component",
    //         },
    //     ],
    // },
    //buttons 
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
        dependencies: ["lucide-react"],
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
        dependencies: ["lucide-react"],
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
        dependencies: ["lucide-react"],
        registryDependencies: ["button"],
        files: [
            {
                path: "components/jackui/buttons/btn-04.tsx",
                type: "registry:component",
            },
        ],
    },
    {
        name: "card-01",
        type: "registry:component",
        dependencies: ["motion"],
        files: [
            {
                path: "components/jackui/cards/card-01.tsx",
                type: "registry:component",
            },
        ],
    },
    
];
