import Link from 'next/link';

export function generateStaticParams() {
  return [];
}

export const dynamicParams = false;

export default async function OptionPage({ params }) {
  const { option } = await params;
  const number = option.replace('option-', '');
  return (
    <main className="placeholder-page">
      <p className="eyebrow">SHERRINGWOOD WORLD SCHOOL</p>
      <h1>Option <em>{number}</em></h1>
      <p>This homepage direction is next to be developed.</p>
      <Link href="/" className="back-link">← Back to all options</Link>
    </main>
  );
}

