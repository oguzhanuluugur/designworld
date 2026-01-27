"use client";

import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {motion, AnimatePresence} from "framer-motion";
import "flag-icons/css/flag-icons.min.css";

const languages = [
  {code: "tr", label: "TR", flagCode: "tr"},
  {code: "en", label: "EN", flagCode: "gb"},
  {code: "ru", label: "RU", flagCode: "ru"},
  {code: "ar", label: "AR", flagCode: "sa"},
  {code: "fr", label: "FR", flagCode: "fr"},
] as const;

interface LanguageSwitcherProps {
  // Optional flag to allow header to tweak colors when scrolled
  isScrolled?: boolean;
}

export default function LanguageSwitcher({isScrolled}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Infer current locale from URL: /tr/..., /en/..., etc.
  const segments = (pathname || "/").split("/");
  const urlLocale = languages.find((l) => l.code === segments[1])?.code || "tr";

  const current = languages.find((l) => l.code === urlLocale) ?? languages[0];

  const baseTextColor = isScrolled ? "text-gray-900" : "text-white";

  const handleChange = (code: string) => {
    const currentPath = pathname || "/";
    const segments = currentPath.split("/");
    // segments[0] === '' always; segments[1] may be locale
    if (segments[1] && languages.some((l) => l.code === segments[1])) {
      segments[1] = code;
    } else {
      segments.splice(1, 0, code);
    }
    const nextPath = segments.join("/") || "/";
    router.push(nextPath);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-2 text-xs md:text-sm font-medium tracking-[0.2em] uppercase ${baseTextColor} hover:text-[#C5A059] transition-colors`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`fi fi-${current.flagCode} text-lg rounded`}></span>
        <span>{current.label}</span>
        <svg
          className="w-3 h-3"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 7L10 12L15 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{opacity: 0, y: -8}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -8}}
            transition={{duration: 0.18, ease: "easeOut"}}
            className="absolute right-0 mt-3 w-32 rounded-md border border-white/20 bg-white/90 backdrop-blur-md shadow-lg ring-1 ring-black/5 z-[910]"
            role="listbox"
          >
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  type="button"
                  onClick={() => handleChange(lang.code)}
                  className={`flex w-full items-center gap-3 px-3 py-2 text-xs md:text-sm uppercase tracking-[0.18em] ${
                    lang.code === urlLocale
                      ? "text-gray-900 font-semibold bg-gray-100"
                      : "text-gray-700 hover:bg-gray-100/80 hover:text-gray-900"
                  }`}
                >
                  <span className={`fi fi-${lang.flagCode} text-lg rounded`}></span>
                  <span>{lang.label}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

