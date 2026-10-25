'use client';
import Image from 'next/image';
import { useState } from 'react';
import s from '../../app/option-3/page.module.css';
const rows = [
  { title: 'Sport & Wellbeing', description: 'Movement and play encourage confidence, resilience and teamwork. Every child has space to find joy in being active.', photo: 'sports' },
  { title: 'Arts & Expression', description: 'Art, music and performance give children the freedom to imagine, experiment and discover their own voice.', photo: 'music' },
  { title: 'Discovery & Collaboration', description: 'From hands-on exploration to shared problem-solving, we nurture curiosity, teamwork and the confidence to take on new challenges.', photo: 'classroom' },
];
export default function SchoolLife() {
  const [open, setOpen] = useState(2);
  return <section className={s.life} id="life-three"><div className={s.sportPhoto}><Image src="/images/school/sports.webp" alt="Sherringwood pupils enjoying sports and outdoor play" fill sizes="50vw" /></div><div className={s.lifeCopy}><p className={s.eyebrow}>SCHOOL LIFE <span /></p><h2>Learning takes<br />many <em>forms.</em></h2><div className={s.accordion}>{rows.map((row, index) => <div key={row.title} className={s.accordionRow}><button aria-expanded={open === index} aria-controls={`experience-panel-${index}`} onClick={() => setOpen(open === index ? null : index)} className={index === 1 ? s.artsTitle : ''}>{row.title}<span aria-hidden="true">{open === index ? '−' : '+'}</span></button><div id={`experience-panel-${index}`} hidden={open !== index} className={s.accordionPanel}><p>{row.description}</p><div className={s.detailPhoto}><Image src={`/images/school/${row.photo}.webp`} alt={['Pupils crawling through colourful hoops on the lawn', 'A pupil playing a drum kit', 'Children seated at classroom desks wearing paper crowns'][index]} fill sizes="20vw" /></div></div></div>)}</div></div></section>;
}
