import { AuthForm } from "./auth-form";

export default function AuthBasic() {
    return (
        <div className="relative flex min-h-[680px] w-full items-center justify-center p-6 md:p-16 bg-[#f8f9fc] dark:bg-[#09090b] overflow-hidden rounded-[2.5rem] select-none font-mono">
            {/* Ambient Background Grid Dots */}
            <div 
                className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none"
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
                
                {/* Header: Brand Identity (Jack UI) */}
                <div className="flex items-center gap-3.5 mb-8">
                    {/* Custom geometric logo badge */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 shadow-md">
                        <svg className="h-5.5 w-5.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            {/* Sleek interlocking J and U symbol */}
                            <path d="M7 3h10v4H7z" />
                            <path d="M12 7v10a3 3 0 0 1-3 3" />
                            <path d="M17 7v7a3 3 0 0 1-3 3h-2" />
                        </svg>
                    </div>
                    <div className="flex flex-col text-left">
                        <h2 className="text-base font-bold tracking-tight text-neutral-900 dark:text-white font-sans">
                            Jack UI
                        </h2>
                        <span className="text-[8px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest font-mono">
                            Component v2.1
                        </span>
                    </div>
                </div>

                {/* Authentication Form */}
                <AuthForm />
            </div>
        </div>
    );
}

