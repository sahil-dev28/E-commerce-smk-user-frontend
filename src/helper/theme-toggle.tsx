"use client";

import { useTheme } from "next-themes";
import { useCallback } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { META_THEME_COLORS } from "@/config/site";
import { useMetaColor } from "@/hooks/theme/use-meta-color";
import { Kbd } from "@/components/ui/kbd";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunMediumIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSound } from "@/hooks/theme/use-sound";
import { SOUNDS } from "@/lib/sounds";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const { setMetaColor } = useMetaColor();

  const playClick = useSound(SOUNDS.click);

  const switchTheme = useCallback(() => {
    playClick(0.5);
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setMetaColor(
      resolvedTheme === "dark"
        ? META_THEME_COLORS.light
        : META_THEME_COLORS.dark,
    );
  }, [resolvedTheme, setTheme, setMetaColor, playClick]);

  useHotkeys("d", switchTheme);

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant="ghost"
          size="icon"
          onClick={switchTheme}
          // onClick={() => {
          //   if (!document.startViewTransition) switchTheme();
          //   document.startViewTransition(switchTheme);
          // }}
        />
        <MoonIcon className="relative hidden after:absolute after:-inset-2 [html.dark_&]:block" />
        <SunMediumIcon className="relative hidden after:absolute after:-inset-2 [html.light_&]:block" />
        <span className="sr-only">Theme Toggle</span>
      </TooltipTrigger>

      <TooltipContent className="pr-2 pl-3">
        <div className="flex items-center gap-3">
          Toggle Mode
          <Kbd>D</Kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
