import Link from 'next/link';

const options = [1, 2, 3];

export default function Home() {
  return (
    <main className="selection-page">
      <nav className="option-grid" aria-label="Choose a homepage option">
        {options.map((option) => (
          <Link key={option} href={`/option-${option}`} className="option-button" prefetch={false}>
            Option {option}
          </Link>
        ))}
      </nav>
    </main>
  );
}
