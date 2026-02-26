"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = (newLocale) => {

    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => toggleLanguage("en")}
        className={`px-3 py-1 rounded ${locale === "en" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
      >
        EN
      </button>
      <button
        onClick={() => toggleLanguage("bn")}
        className={`px-3 py-1 rounded ${locale === "bn" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
      >
        বাংলা
      </button>
    </div>
  );
}