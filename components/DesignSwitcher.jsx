'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './DesignSwitcher.module.css';

export default function DesignSwitcher() {
  const pathname = usePathname();
  if (!/^\/option-[123]\/?$/.test(pathname || '')) return null;

  return (
    <nav className={styles.switcher} aria-label="Design options">
      <Link href="/" prefetch={false} className={styles.home}>← All Options</Link>
      <div className={styles.options}>
        {[1, 2, 3].map(option => (
          <Link key={option} href={`/option-${option}`} prefetch={false}
            aria-label={`Option ${option}`}
            aria-current={pathname.replace(/\/$/, '') === `/option-${option}` ? 'page' : undefined}>
            {option}
          </Link>
        ))}
      </div>
    </nav>
  );
}
