"use client";

import React, { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

type Props = {
  initialTheme?: "light" | "dark";
};

function ThemeSwitcher({ initialTheme }: Props) {
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme ?? "light");

  function toggleTheme() {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      document.cookie =
        "theme=dark; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/;";
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.cookie =
        "theme=light; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/;";
      setTheme("light");
    }
  }

  return (
    <div
      className="grid cursor-pointer place-items-center text-2xl transition-opacity hover:opacity-50"
      onClick={toggleTheme}
    >
      {theme === "light" && <MdLightMode />}
      {theme === "dark" && <MdDarkMode />}
    </div>
  );
}

export default ThemeSwitcher;
