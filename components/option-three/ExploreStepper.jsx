'use client';

import { useEffect, useRef, useState } from 'react';
import s from './ExploreStepper.module.css';

const steps = [
  { title: 'Meet Sherringwood', description: 'Get to know our school and what we believe.', href: '#belief-three' },
  { title: 'Explore Learning', description: 'Discover a learning journey for every stage.', href: '#learning-three' },
  { title: 'Life on Campus', description: 'Explore the experiences that shape each day.', href: '#life-three' },
  { title: 'Plan a Visit', description: 'Come and meet our school community.', href: '#visit-three' },
];

export default function ExploreStepper() {
  const frame = useRef(null);
  const [reached, setReached] = useState(-1);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setReached(3); return; }
    const seen = new Set();
    let completed = -1;
    let timer;
    const advance = () => {
      if (!seen.has(completed + 1)) return;
      completed += 1;
      setReached(completed);
      timer = setTimeout(() => { timer = null; advance(); }, 1000);
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { seen.add(Number(entry.target.dataset.step)); observer.unobserve(entry.target); } });
      if (!timer) advance();
    }, { threshold: .5 });
    // Each connector waits for its destination to enter the viewport.
    frame.current?.querySelectorAll('li').forEach(node => observer.observe(node));
    return () => { observer.disconnect(); clearTimeout(timer); };
  }, []);

  return <nav ref={frame} className={s.stepper}  aria-label="Explore Sherringwood">
    <ol className={s.steps}>
      {steps.map((step, index) => <li className={s.step} data-step={index} data-connected={reached > index} key={step.href} style={{ '--step-order': index }}>
        <a className={s.link} href={step.href}>
          <span className={s.artwork}>
            <span className={s.orbit} aria-hidden="true"><svg viewBox="0 0 160 160" fill="none"><circle cx="80" cy="80" r="65" stroke="currentColor" strokeDasharray="3 5" /><circle cx="80" cy="80" r="77" stroke="#d4af68" strokeWidth="1.5" strokeDasharray="110 374" transform="rotate(-135 80 80)" /><circle cx="80" cy="80" r="77" stroke="#aa586c" strokeWidth="1.5" strokeDasharray="105 379" transform="rotate(35 80 80)" /><circle cx="25.5" cy="25.5" r="3" fill="#d4af68" /><circle cx="150" cy="111" r="2.5" fill="#85061f" /></svg></span>
            <span className={s.disc}>{String(index + 1).padStart(2, '0')}</span>
          </span>
          <span className={s.copy}><strong>{step.title}</strong><span>{step.description}</span></span>
        </a>
        {index < steps.length - 1 && <span className={s.connector} aria-hidden="true" />}
      </li>)}
    </ol>
  </nav>;
}
