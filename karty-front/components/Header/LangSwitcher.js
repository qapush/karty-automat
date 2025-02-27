'use client'

import {usePathname} from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { Link } from "@/i18n/routing";

export default function LangSwitcher() {

    const pathname = usePathname();
    const locale = useLocale();

    const locales = ["pl", "en", "fr", "de"].map((lang) => {

        return <Link key={lang} href={pathname} locale={lang} className={lang === locale ? "active" : ""}>
            {lang.toUpperCase()}
        </Link>

    })
    

    return <div className="lang">
        {locales}
    </div>
}