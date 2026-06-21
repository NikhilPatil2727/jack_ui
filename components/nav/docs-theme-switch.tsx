"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface DocsThemeSwitchProps {
  className?: string;
}

const themes = [
  { value: "light", label: "Light theme", icon: Sun },
  { value: "dark", label: "Dark theme", icon: Moon },
  { value: "system", label: "System theme", icon: Monitor },
];

export function DocsThemeSwitch({ className }: DocsThemeSwitchProps) {
  const { setTheme, theme } = useTheme();
  const activeTheme = theme ?? "system";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border bg-fd-background p-1 shadow-sm",
        className
      )}
      suppressHydrationWarning
    >
      {themes.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          aria-label={label}
          onClick={() => setTheme(value)}
          className={cn(
            "inline-flex size-7 items-center justify-center rounded-full text-fd-muted-foreground transition-colors hover:text-fd-foreground cursor-pointer",
            activeTheme === value && "bg-fd-accent text-fd-accent-foreground"
          )}
        >
          <Icon className="size-4" />
        </button>
      ))}
    </div>
  );
}
