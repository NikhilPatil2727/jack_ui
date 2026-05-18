import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Flame } from "lucide-react";
import Image from "next/image";
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center">
           <Image
                                src="/image.png"
                                alt="Jack UI logo"
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-md"
                              />
          <span className="hidden md:inline-flex items-center text-lg font-bold tracking-tight text-black dark:text-white">
            JackUI
          </span>
        </div>
      ),
    },
    themeSwitch: {
      enabled: false,
    },
  };
}
