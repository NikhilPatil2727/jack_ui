import { CheckCircle2, Search } from "lucide-react";

interface ComponentShowcaseCardProps {
    className: string;
}

export function ComponentShowcaseCard({
    className,
}: ComponentShowcaseCardProps) {
    return (
        <div className={className}>
            <div className="text-2xl sm:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-zinc-700 to-zinc-400 dark:from-zinc-100 dark:to-zinc-400">
                Buttons, Inputs & More
            </div>

            <div className="space-y-12">
                <div className="space-y-20 mt-8">
                    {[
                        {
                            component: (
                                <div className="flex w-64 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-500 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
                                    <Search className="size-4" />
                                    <span>Search components</span>
                                </div>
                            ),
                            label: "Input",
                        },
                        {
                            component: (
                                <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                                    <CheckCircle2 className="size-4" />
                                    <span>Component copied</span>
                                </div>
                            ),
                            label: "Alert",
                        },
                        {
                            component: (
                                <div className="w-full flex justify-center gap-4">
                                    <button className="w-full rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-800 dark:text-zinc-200">
                                        Welcome
                                    </button>
                                    <button className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-950">
                                        Button
                                    </button>
                                </div>
                            ),
                            label: "Welcome",
                        },
                    ].map((btn, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center gap-8"
                        >
                            <div className="h-16 flex items-center gap-8">
                                {btn.component}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center pt-8">
                    <div className="h-10 w-56 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-left text-sm text-zinc-400 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                        Email address
                    </div>
                </div>
            </div>

            <p className="text-sm text-center text-zinc-500 dark:text-zinc-400 mt-4">
                + more available
            </p>
        </div>
    );
}
