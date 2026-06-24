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
                        className="text-xs font-semibold uppercase tracking-wider transition-colors"
                        style={{ color: "var(--color-text-primary, oklch(0.556 0 0))" }}
                    >
                        Email
                    </label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        required
                        disabled={isLoading}
                        className="w-full h-11 px-3.5 rounded-xl border transition-all text-sm outline-none focus-visible:ring-2 focus-visible:ring-[oklab(0.140764_0.00120224_-0.00421676_/_0.5)]"
                        style={{ 
                            backgroundColor: "var(--color-surface-muted, #ffffff)", 
                            borderColor: "var(--color-border-default, #e4e4e7)",
                            color: "var(--color-text-tertiary, oklch(0.205 0 0))"
                        }}
                        autoComplete="email"
                    />
                </div>

                <div className="space-y-1.5 text-left">
                    <div className="flex justify-between items-center">
                        <label
                            htmlFor="password"
                            className="text-xs font-semibold uppercase tracking-wider transition-colors"
                            style={{ color: "var(--color-text-primary, oklch(0.556 0 0))" }}
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
                        className="w-full h-11 px-3.5 rounded-xl border transition-all text-sm outline-none focus-visible:ring-2 focus-visible:ring-[oklab(0.140764_0.00120224_-0.00421676_/_0.5)]"
                        style={{ 
                            backgroundColor: "var(--color-surface-muted, #ffffff)", 
                            borderColor: "var(--color-border-default, #e4e4e7)",
                            color: "var(--color-text-tertiary, oklch(0.205 0 0))"
                        }}
                    />
                </div>
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={isLoading}
                className="relative w-full h-12 text-[15px] font-semibold text-white rounded-2xl transition-all duration-200 cursor-pointer mt-2 border-0"
                style={{
                    background: "linear-gradient(180deg, #2a2a2e 0%, #121214 100%)",
                    boxShadow: "oklch(0.205 0 0) 0px 0px 0px 2px inset, oklab(0.999994 0.0000455678 0.0000200868 / 0.2) 0px 0px 0px 3px inset, rgba(255, 255, 255, 0.2) 0px 0px 10px 0px inset, rgba(0, 0, 0, 0.35) 0px 14px 28px -6px"
                }}
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

