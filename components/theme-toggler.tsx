"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { LucideIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

const toggleThemes: { name: string; theme: string; icon: LucideIcon }[] = [
  { name: "Light", theme: "light", icon: SunIcon },
  { name: "Dark", theme: "dark", icon: MoonIcon },
  { name: "System", theme: "system", icon: MonitorIcon },
];

export function ThemeToggler() {
  const { setTheme, theme: currentTheme, resolvedTheme } = useTheme();
  const isMobile = useIsMobile();
  return (
    <div className="">
      {" "}
      <span>{isMobile ? "" : "Choose your preferred theme: "}</span>
      {toggleThemes.map(({ name, theme, icon }) => {
        const Icon = icon;
        return (
          <Button
            key={name}
            variant={currentTheme === theme ? "secondary" : "ghost"}
            size={"icon"}
            onClick={() => setTheme(theme)}
            title={name + " mode"}
          >
            <Icon suppressHydrationWarning />
            <span className="sr-only">{name} theme mode</span>
          </Button>
        );
      })}
    </div>
  );
}
