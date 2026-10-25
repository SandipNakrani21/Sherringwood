export default function MotionText({ children }) {
  const text = String(children);
  return <span className="button-motion-label" aria-label={text}>
    {Array.from(text).map((character, index) => <span className="button-motion-character" aria-hidden="true" style={{ '--character-delay': `${index * 17}ms` }} key={index}>{character === ' ' ? '\u00a0' : character}</span>)}
  </span>;
}
