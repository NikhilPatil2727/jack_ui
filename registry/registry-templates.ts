import type { Registry } from "./schema";

export const templates: Registry = [
    {
        name: "ai-landing-page",
        type: "registry:block",
        dependencies: ["lucide-react", "framer-motion"],
        registryDependencies: [],
        files: [
            {
                path: "components/jackui/templates/ai-landing-page/index.tsx",
                type: "registry:component",
            },
            {
                path: "components/jackui/templates/ai-landing-page/navbar.tsx",
                type: "registry:component",
            },
            {
                path: "components/jackui/templates/ai-landing-page/hero.tsx",
                type: "registry:component",
            },
            {
                path: "components/jackui/templates/ai-landing-page/logo-cloud.tsx",
                type: "registry:component",
            },
            {
                path: "components/jackui/templates/ai-landing-page/features.tsx",
                type: "registry:component",
            },
            {
                path: "components/jackui/templates/ai-landing-page/how-it-works.tsx",
                type: "registry:component",
            },
            {
                path: "components/jackui/templates/ai-landing-page/pricing.tsx",
                type: "registry:component",
            },
            {
                path: "components/jackui/templates/ai-landing-page/testimonials.tsx",
                type: "registry:component",
            },
            {
                path: "components/jackui/templates/ai-landing-page/faq.tsx",
                type: "registry:component",
            },
            {
                path: "components/jackui/templates/ai-landing-page/cta.tsx",
                type: "registry:component",
            },
            {
                path: "components/jackui/templates/ai-landing-page/footer.tsx",
                type: "registry:component",
            },
        ],
    },
];
