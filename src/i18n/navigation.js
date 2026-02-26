// i18n/navigation.js
import { createNavigation } from 'next-intl/navigation';

export const locales = ['en', 'bn'];
export const localePrefix = 'always'; // ইউআরএল-এ সবসময় /en বা /bn থাকবে

// নতুন ভার্সনে createNavigation ব্যবহার করা হয়
export const { Link, redirect, usePathname, useRouter } =
  createNavigation({ locales, localePrefix });