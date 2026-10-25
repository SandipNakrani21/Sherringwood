'use client';
import MotionText from '../MotionText';

import Image from 'next/image';
import { useState } from 'react';
import s from '../../app/option-2/page.module.css';
const stages = [{ label: 'Early Years', title: 'Big discoveries begin\nwith small questions.', description: 'In a nurturing environment, children build confidence as they explore, play and make meaning of the world.', src: '/images/school/creative-play.webp' }, { label: 'Primary Years', title: 'Growing curiosity.\nBuilding confidence.', description: 'Children explore ideas, work together and develop the skills to become independent learners.', src: '/images/school/classroom.webp' }, { label: 'Beyond Primary', title: 'New perspectives.\nWider possibilities.', description: 'Deeper inquiry and collaboration encourage children to discover their strengths and find their own voice.', src: '/images/school/teamwork.webp' }];
export default function Learning() {
  const [active, setActive] = useState(0); const stage = stages[active];
  return <section className={s.learning} id="learning-two"><h2>A learning journey, shaped around childhood.</h2><div role="tablist" aria-label="Learning stages" className={s.learningTabs}>{stages.map((item, i) => <button key={item.label} role="tab" tabIndex={i === active ? 0 : -1} id={`stage-tab-${i}`} aria-selected={i === active} aria-controls={`stage-panel-${i}`} onClick={() => setActive(i)} onKeyDown={(e) => { if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) { e.preventDefault(); const next = e.key === 'Home' ? 0 : e.key === 'End' ? 2 : (i + (e.key === 'ArrowRight' ? 1 : 2)) % 3; setActive(next); document.getElementById(`stage-tab-${next}`)?.focus(); } }}>{item.label}</button>)}</div><div className={s.learningBody} role="tabpanel" tabIndex={0} id={`stage-panel-${active}`} aria-labelledby={`stage-tab-${active}`}><div className={s.learningPhoto}><Image src={stage.src} alt={['A pupil holding a colourful craft outdoors', 'Children seated at classroom desks wearing paper crowns', 'Children and adults gathered on mats outdoors'][active]} fill sizes="60vw" /></div><div className={s.learningCopy}><h3>{stage.title.split('\n').map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</h3><p>{stage.description}</p><a href="#visit-two" className={s.goldButton}><MotionText>{`Explore ${stage.label} ↗`}</MotionText></a></div></div></section>;
}


