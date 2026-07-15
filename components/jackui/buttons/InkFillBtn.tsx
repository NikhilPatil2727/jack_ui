"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type Variant = "dark" | "light" | "coral" | "neon";

interface InkFillBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: string;
    variant?: Variant;
    tag?: string;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
    life: number;
    maxLife: number;
    color: string;
}

const variantConfig: Record<
    Variant,
    {
        border: string;
        baseText: string;
        bgClass: string;
        glowColor: string;
        particleColors: string[];
    }
> = {
    dark: {
        border: "border-zinc-800 dark:border-zinc-700",
        baseText: "text-zinc-900 dark:text-zinc-100",
        bgClass: "bg-white dark:bg-zinc-950",
        glowColor: "rgba(99, 102, 241, 0.15)", // Indigo glow
        particleColors: ["#a855f7", "#6366f1", "#06b6d4"], // Violet, Indigo, Cyan
    },
    light: {
        border: "border-zinc-300",
        baseText: "text-zinc-800",
        bgClass: "bg-zinc-50",
        glowColor: "rgba(244, 63, 94, 0.1)", // Rose glow
        particleColors: ["#f43f5e", "#fda4af", "#fb7185"], // Pink/Rose
    },
    coral: {
        border: "border-[#d85a30]/30 hover:border-[#d85a30]",
        baseText: "text-[#d85a30]",
        bgClass: "bg-[#d85a30]/5 dark:bg-[#d85a30]/10",
        glowColor: "rgba(216, 90, 48, 0.2)",
        particleColors: ["#eab308", "#ff7849", "#d85a30"], // Gold, Orange, Coral
    },
    neon: {
        border: "border-cyan-500/40 hover:border-cyan-400",
        baseText: "text-cyan-500 dark:text-cyan-400",
        bgClass: "bg-cyan-950/10",
        glowColor: "rgba(6, 182, 212, 0.25)",
        particleColors: ["#06b6d4", "#10b981, #34d399"], // Cyan, Emerald, Mint
    },
};

export default function InkFillBtn({
    className,
    children = "Initialize App",
    variant = "dark",
    tag,
    disabled,
    onClick,
    ...props
}: InkFillBtnProps) {
    const v = variantConfig[variant];
    const buttonRef = useRef<HTMLButtonElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const [hovered, setHovered] = useState(false);
    
    // Track mouse position & velocity
    const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, vx: 0, vy: 0, active: false });
    const particlesRef = useRef<Particle[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = canvas.offsetWidth);
        let height = (canvas.height = canvas.offsetHeight);

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };

        window.addEventListener("resize", handleResize);

        const maxParticles = 60;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            const mouse = mouseRef.current;
            const isDark = document.documentElement.classList.contains("dark");

            // 1. Calculate real-time mouse velocity
            if (mouse.active) {
                mouse.vx = mouse.x - mouse.lastX;
                mouse.vy = mouse.y - mouse.lastY;
                mouse.lastX = mouse.x;
                mouse.lastY = mouse.y;
            } else {
                mouse.vx *= 0.95;
                mouse.vy *= 0.95;
            }

            // 2. Spawn particles
            if (mouse.active && (Math.abs(mouse.vx) > 0.1 || Math.abs(mouse.vy) > 0.1)) {
                // Hover Active trail: Spawn glowing particles based on mouse movement speed
                const spawnCount = Math.min(3, Math.ceil(Math.hypot(mouse.vx, mouse.vy) * 0.4));
                for (let i = 0; i < spawnCount; i++) {
                    if (particlesRef.current.length < maxParticles) {
                        particlesRef.current.push({
                            x: mouse.x + (Math.random() - 0.5) * 8,
                            y: mouse.y + (Math.random() - 0.5) * 8,
                            // Eject opposite to mouse direction + slight drift
                            vx: -mouse.vx * 0.25 + (Math.random() - 0.5) * 1.2,
                            vy: -mouse.vy * 0.25 + (Math.random() - 0.5) * 1.2 - 0.2,
                            size: Math.random() * 2.2 + 1.2,
                            alpha: 1,
                            life: 0,
                            maxLife: Math.random() * 25 + 20,
                            color: v.particleColors[Math.floor(Math.random() * v.particleColors.length)],
                        });
                    }
                }
            } else {
                // Idle Ambient: Spawn 1 gentle particle every few frames to keep it looking active and premium initially
                if (Math.random() < 0.12 && particlesRef.current.length < 20) {
                    particlesRef.current.push({
                        x: Math.random() * width,
                        y: height + 2,
                        vx: (Math.random() - 0.5) * 0.4,
                        vy: -Math.random() * 0.4 - 0.2, // float upwards
                        size: Math.random() * 1.5 + 0.8,
                        alpha: 0.6,
                        life: 0,
                        maxLife: Math.random() * 60 + 50,
                        color: v.particleColors[Math.floor(Math.random() * v.particleColors.length)],
                    });
                }
            }

            // 3. Draw ambient cursor background radial glow
            if (mouse.active) {
                const glowGrad = ctx.createRadialGradient(
                    mouse.x,
                    mouse.y,
                    0,
                    mouse.x,
                    mouse.y,
                    65
                );
                glowGrad.addColorStop(0, v.glowColor);
                glowGrad.addColorStop(1, "transparent");
                ctx.fillStyle = glowGrad;
                ctx.beginPath();
                ctx.arc(mouse.x, mouse.y, 65, 0, Math.PI * 2);
                ctx.fill();
            }

            // 4. Update and render particles
            ctx.globalCompositeOperation = "screen";
            particlesRef.current.forEach((p, idx) => {
                p.life++;
                p.x += p.vx;
                p.y += p.vy;
                
                // Slow down and fade out
                p.vx *= 0.98;
                p.vy *= 0.98;
                p.alpha = 1 - (p.life / p.maxLife);

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.fill();
            });
            ctx.globalAlpha = 1.0;
            ctx.globalCompositeOperation = "source-over";

            // Clean up dead particles
            particlesRef.current = particlesRef.current.filter(p => p.life < p.maxLife);

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [v]);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const mouse = mouseRef.current;
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;
        setHovered(true);
        const mouse = mouseRef.current;
        mouse.active = true;
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.lastX = mouse.x;
            mouse.lastY = mouse.y;
        }
    };

    const handleMouseLeave = () => {
        setHovered(false);
        mouseRef.current.active = false;
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;

        // Trigger circular shockwave of click particles at click coordinate
        const mouse = mouseRef.current;
        const burstCount = 18;
        for (let i = 0; i < burstCount; i++) {
            const angle = (i * Math.PI * 2) / burstCount + (Math.random() - 0.5) * 0.3;
            const speed = Math.random() * 2.8 + 2.2;
            particlesRef.current.push({
                x: mouse.x,
                y: mouse.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 3 + 1.5,
                alpha: 1,
                life: 0,
                maxLife: Math.random() * 20 + 20,
                color: v.particleColors[Math.floor(Math.random() * v.particleColors.length)],
            });
        }

        if (onClick) onClick(e);
    };

    return (
        <button
            ref={buttonRef}
            disabled={disabled}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onClick={handleButtonClick}
            className={cn(
                "relative h-[50px] min-w-[160px] px-8 rounded-[12px] border font-bold font-sans transition-all duration-300",
                "cursor-pointer select-none overflow-hidden outline-none flex items-center justify-center gap-2",
                "focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2",
                "disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97]",
                v.border,
                v.bgClass,
                className
            )}
            {...props}
        >
            {/* Interactive Particle Canvas Background */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none z-0 w-full h-full"
            />

            {/* Content Text Label */}
            <span 
                className={cn(
                    "relative z-10 flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest transition-transform duration-300",
                    hovered && "scale-[1.03]"
                )}
            >
                {tag && <span className="opacity-60">{tag}</span>}
                <span className={cn(v.baseText)}>{children}</span>
            </span>
        </button>
    );
}
