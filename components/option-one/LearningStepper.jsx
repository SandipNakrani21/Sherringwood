'use client';

import { useEffect, useRef, useState } from 'react';
import MotionText from '../MotionText';
import s from '../../app/option-1/page.module.css';

const stages = [
  { title: 'Early Years', description: <>A strong foundation through <br />play, exploration and care.</> },
  { title: 'Primary Years', description: <>Building skills, curiosity <br />and independent thinking.</> },
  { title: 'Beyond Primary', description: <>Encouraging deeper inquiry <br />and a broader perspective.</> },
];

export default function LearningStepper() {
  const root = useRef(null);
  const [active, setActive] = useState(-1);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let timers = [];
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (preference.matches) { setActive(2); return; }
      timers = [0, 1, 2].map((index) => setTimeout(() => setActive(index), 200 + index * 750));
    }, { threshold: .25 });
    observer.observe(root.current);
    return () => { observer.disconnect(); timers.forEach(clearTimeout); };
  }, []);

  return <div ref={root} className={s.alternatingJourney}>
    <ol className={s.journeySteps} style={{ '--journey-progress': Math.max(0, active) / 2 }} aria-label="Learning stages">
      {stages.map((stage, index) => <li key={stage.title} className={`${s.journeyRow} ${active >= index ? s.journeyReached : ''}`}>
        <div className={s.journeyContent}><h3>{stage.title}</h3><p>{stage.description}</p></div>
        <a href="#admissions" aria-label={`Enquire about ${stage.title}`} className={`${s.stageNumber} ${s.journeyNumber}`} aria-current={active === index ? 'step' : undefined}>{String(index + 1).padStart(2, '0')}</a>
      </li>)}
    </ol>
    <a className={`${s.primaryButton} ${s.learningButton}`} href="#admissions"><MotionText>Explore Learning</MotionText><span aria-hidden="true">→</span></a>
  </div>;
}

