import React from "react";
import { AuthForm } from "./auth-form";
import { SocialLogin } from "./social-login";

export interface AuthBasicProps extends React.ComponentPropsWithoutRef<"div"> {
    /** The brand name displayed on the card */
    brandName?: string;
    /** Custom logo element */
    logo?: React.ReactNode;
    /** The color of the dotted grid/borders in light mode */
    dotColorLight?: string;
    /** The color of the dotted grid/borders in dark mode */
    dotColorDark?: string;
    /** Whether to show the social login buttons */
    showSocialLogin?: boolean;
}


export default function AuthBasic({
    brandName = "Jack UI",
    logo,
    dotColorLight = "rgba(0, 0, 0, 0.22)",
    dotColorDark = "rgba(255, 255, 255, 0.35)",
    showSocialLogin = true,
    className,
    style,
    ...props
}: AuthBasicProps) {
    const id = React.useId().replace(/:/g, "");
    const instanceClass = `jack-auth-basic-${id}`;

    return (
        <div 
            className={`relative flex min-h-[680px] h-full w-full items-center justify-center p-6 md:p-16 bg-[#f8f9fc] dark:bg-[#09090b] overflow-hidden rounded-[2.5rem] select-none font-mono ${instanceClass} ${className || ""}`}
            style={style}
            {...props}
        >
            {/* Dynamic CSS variables scoped to this component instance */}
            <style dangerouslySetInnerHTML={{ __html: `
                .${instanceClass} {
                    --dot-color: ${dotColorLight};
                }
                .dark .${instanceClass} {
                    --dot-color: ${dotColorDark};
                }
            ` }} />

            {/* Ambient Background Grid Dots */}
            <div 
                className="absolute inset-0 opacity-40 dark:opacity-45 pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, var(--dot-color) 1.2px, transparent 0)",
                    backgroundSize: "24px 24px"
                }}
            />

            {/* Ambient Rainbow/Aurora Background Glows */}
            <div 
                className="absolute w-[480px] h-[480px] rounded-full opacity-[0.28] dark:opacity-[0.16] pointer-events-none blur-[90px] select-none"
                style={{
                    background: "conic-gradient(from 0deg, #ff3b30, #ff9500, #ffcc00, #4cd964, #5ac8fa, #007aff, #5856d6, #ff2d55, #ff3b30)"
                }}
            />

            {/* Main Card */}
            <div 
                className="w-full max-w-[380px] sm:w-[380px] bg-white dark:bg-[#0c0c0e] border-[3px] border-dotted rounded-xl p-8 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 z-10 relative"
                style={{ borderColor: "var(--dot-color)" }}
            >
                
                {/* Header: Brand Identity */}
                <div className="flex items-center gap-3.5 mb-8">
                    {/* Custom logo or sleek default shield brand badge */}
                    {logo ?? (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 shadow-md">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                <rect x="9" y="11" width="6" height="4" rx="1" />
                            </svg>
                        </div>
                    )}
                    <div className="flex flex-col text-left font-sans">
                        <h2 className="text-base font-bold tracking-tight text-neutral-900 dark:text-white">
                            {brandName}
                        </h2>
                        <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
                            Secure Login
                        </span>
                    </div>
                </div>

                {/* Authentication Form */}
                <AuthForm />

                {/* Social Login */}
                {showSocialLogin && (
                    <div className="mt-6 space-y-4">
                        <SocialLogin />
                    </div>
                )}
            </div>
        </div>
    );
}


