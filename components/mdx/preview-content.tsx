"use client";

import {
    useActionState,
    useEffect,
    useState,
    useTransition,
    useRef,
} from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Copy, CheckCheck, Terminal } from "lucide-react";
import { copyComponent } from "@/lib/action";
import { cn } from "@/lib/utils";
import Btn07 from "@/components/jackui/buttons/btn-07";
import { OpenInV0Button } from "../open-in-v0-button";
import { AnimatePresence, motion } from "motion/react";

const particleOffsets = [
    { x: -34, y: -42 },
    { x: 28, y: -48 },
    { x: -52, y: -24 },
    { x: 48, y: -28 },
    { x: -20, y: -58 },
    { x: 16, y: -34 },
];

function SuccessParticles({ x, y }: { x: number; y: number }) {

    return (
        <AnimatePresence>
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="fixed w-1 h-1 bg-black dark:bg-white rounded-full"
                    style={{ left: x, top: y }}
                    initial={{
                        scale: 0,
                        x: 0,
                        y: 0,
                    }}
                    animate={{
                        scale: [0, 1, 0],
                        x: [0, particleOffsets[i].x],
                        y: [0, particleOffsets[i].y],
                    }}
                    transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                        ease: "easeOut",
                    }}
                />
            ))}
        </AnimatePresence>
    );
}

export default function PreviewContent({
    link,
    prePath,
    isBlock = false,
}: {
    link: string;
    prePath: string;
    isBlock?: boolean;
}) {
    const [isPending, startTransition] = useTransition();
    const [state, formAction] = useActionState(copyComponent, {
        error: "",
        content: "",
        success: false,
    });
    const [isCopied, setIsCopied] = useState(false);
    const [isTerminalCopied, setIsTerminalCopied] = useState(false);
    const [particleOrigin, setParticleOrigin] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const [pm, setPm] = useState("npx");

    const pkgManagers: Record<string, { label: string; command: string }> = {
        npx: { label: "npx", command: `npx shadcn@latest add ${prePath}/r/` },
        bun: { label: "bun", command: `bunx shadcn@latest add ${prePath}/r/` },
        pnpm: { label: "pnpm", command: `pnpm dlx shadcn@latest add ${prePath}/r/` },
        yarn: { label: "yarn", command: `yarn dlx shadcn@latest add ${prePath}/r/` },
    };

    const showParticlesFrom = (
        buttonRef: React.RefObject<HTMLButtonElement | null>
    ) => {
        const rect = buttonRef.current?.getBoundingClientRect();
        if (!rect) return;

        setParticleOrigin({
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        });
    };

    const handleCopyClick = async () => {
        const [folder, filename] = link.split("/");

        startTransition(async () => {
            const formData = new FormData();
            formData.append("folder", folder);
            formData.append("fileName", filename);

            formAction(formData);
        });
    };

    const getFileName = () => {
        const [folder, filename] = link.split("/");
        return filename ? filename : folder;
    };

    const handleTerminalClick = () => {
        const [folder, filename] = link.split("/");
        const name = filename ? filename : folder;
        const COPY = `${pkgManagers[pm].command}${name}.json`;
        navigator.clipboard.writeText(COPY);
        showParticlesFrom(terminalButtonRef);
        setIsTerminalCopied(true);
        setTimeout(() => {
            setIsTerminalCopied(false);
        }, 1000);
    };

    const openInV0 = () => {
        const [folder, filename] = link.split("/");

        return filename ? filename : folder;
    };

    useEffect(() => {
        if (state.success && state.content) {
            navigator.clipboard.writeText(state.content);

            const showCopiedTimeout = setTimeout(() => {
                showParticlesFrom(copyButtonRef);
                setIsCopied(true);
            }, 0);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
            return () => clearTimeout(showCopiedTimeout);
        }
    }, [state.content, state.success]);

    const terminalButtonRef = useRef<HTMLButtonElement>(null);
    const copyButtonRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            {(isTerminalCopied || isCopied) && particleOrigin && (
                <SuccessParticles x={particleOrigin.x} y={particleOrigin.y} />
            )}

            <div className={cn("relative mt-4", "rounded-xl px-0 py-3 sm:p-3")}>
                <div className="relative flex flex-col gap-3 lg:flex-row lg:items-center">
                    {/* <a
                        href={`${prePath}/preview/${link}`}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                            "flex items-center gap-2",
                            "text-sm font-medium",
                            "text-zinc-800 dark:text-zinc-200",
                            "hover:text-zinc-600 dark:hover:text-zinc-400",
                            "transition-all duration-200 no-underline group"
                        )}
                    >
                        Live Preview
                        <ArrowUpRight
                            className={cn(
                                "h-4 w-4",
                                "transition-transform duration-200 group-hover:rotate-12"
                            )}
                        />
                    </a> */}

                    <div className="flex w-full flex-wrap items-center gap-2 lg:w-auto lg:justify-start">
                        <div className="inline-flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-0.5 shadow-xs">
                             {Object.entries(pkgManagers).map(([key, { label }]) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setPm(key)}
                                    className={cn(
                                        "px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 select-none cursor-pointer",
                                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                                        pm === key
                                            ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                                            : "bg-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                                    )}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        <OpenInV0Button
                            name={openInV0()}
                            prePath={prePath}
                            className="rounded-[5px]"
                        />
                        <Btn07
                            onClick={handleTerminalClick}
                            className="!rounded-[5px] !h-7 !px-3 !text-xs"
                        >
                            {isTerminalCopied ? (
                                <CheckCheck className="h-3.5 w-3.5" />
                            ) : (
                                <Terminal className="h-3.5 w-3.5" />
                            )}
                            <span className="truncate">{pm} shadcn add {getFileName()}</span>
                        </Btn07>

                        {!isBlock && (
                            <Btn07
                                onClick={handleCopyClick}
                                disabled={isPending}
                                className="!rounded-[5px] !h-7 !px-3 !text-xs !bg-black dark:!bg-white !text-white dark:!text-black hover:!bg-black/90 dark:hover:!bg-white/90"
                            >
                                {isCopied ? (
                                    <CheckCheck className="h-3.5 w-3.5" />
                                ) : (
                                    <Copy className="h-3.5 w-3.5" />
                                )}
                                <span>Copy</span>
                            </Btn07>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
