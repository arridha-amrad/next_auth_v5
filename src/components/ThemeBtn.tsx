"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";

export default function ThemeButton() {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="w-5 h-5 dark:hidden block" />
      <Moon className="w-5 h-5 hidden dark:block" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
}
