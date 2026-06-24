"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export function AuthForm() {
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            console.log("Signing in with:", email, password);
        } catch (error) {
            console.error("Authentication error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Input Fields */}
            <div className="space-y-4">
                <div className="space-y-1.5 text-left">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                    >
                        Email
                    </label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        required
                        disabled={isLoading}
                        className="w-full h-11 px-3.5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl placeholder:text-neutral-400 dark:placeholder:text-neutral-600 text-neutral-900 dark:text-neutral-100 focus-visible:ring-1 focus-visible:ring-neutral-400 focus-visible:border-neutral-400 transition-all text-sm"
                        autoComplete="email"
                    />
                </div>

                <div className="space-y-1.5 text-left">
                    <div className="flex justify-between items-center">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                        >
                            Password
                        </label>
                    </div>
                    <Input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                        disabled={isLoading}
                        className="w-full h-11 px-3.5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl placeholder:text-neutral-400 dark:placeholder:text-neutral-600 text-neutral-900 dark:text-neutral-100 focus-visible:ring-1 focus-visible:ring-neutral-400 focus-visible:border-neutral-400 transition-all text-sm"
                    />
                </div>
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={isLoading}
                className="relative w-full h-12 text-[15px] font-semibold bg-gradient-to-b from-[#2a2a2e] to-[#121214] hover:from-[#323237] hover:to-[#17171a] text-white rounded-2xl transition-all duration-200 border border-[#0f0f11] shadow-[0_14px_28px_-6px_rgba(0,0,0,0.35),_inset_0_1px_0px_rgba(255,255,255,0.15)] cursor-pointer mt-2"
            >
                {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Signing in...
                    </span>
                ) : (
                    "Sign in"
                )}
            </Button>
        </form>
    );
}

