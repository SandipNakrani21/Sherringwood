'use client';
import Image from 'next/image';
import MotionText from '../MotionText';
import { useRef, useState } from 'react';
import s from '../../app/option-2/page.module.css';

const photos = [
  { image: '/images/school/music.webp', label: 'Performing Arts', title: 'Express.', alt: 'A Sherringwood student playing the drums', position: '55% 45%' },
  { image: '/images/school/sports.webp', label: 'Sport', title: 'Move.', alt: 'Sherringwood children playing with colourful hoops outdoors', position: '50% 45%' },
  { image: '/images/school/discovery.webp', label: 'Community', title: 'Together.', alt: 'Two adults taking part in an outdoor activity at a yellow table', position: '50% 45%' },
];
export default function Experiences() {
  const [active, setActive] = useState(1);
  const [previous, setPrevious] = useState(1);
  const lockedUntil = useRef(0);
  function select(index) {
    if (performance.now() < lockedUntil.current || index === active) return;
    lockedUntil.current = performance.now() + (matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 820);
    setPrevious(active);
    setActive(index);
  }
  return <section className={s.experiences} id="experiences"><div className={s.experienceHeading}><h2>One school. Many ways to shine.</h2><a href="#journal-two" className={s.link}><MotionText>Explore school life ↗</MotionText></a></div><div className={s.galleryStage} onKeyDown={(event) => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); select((active + (event.key === 'ArrowRight' ? 1 : 2)) % 3); } }}>{photos.map((photo, index) => { const relative = (index - active + 3) % 3; const offset = relative === 2 ? -1 : relative; const oldRelative = (index - previous + 3) % 3; const oldOffset = oldRelative === 2 ? -1 : oldRelative; const wrapping = offset * oldOffset === -1; return <button key={photo.image} data-wrapping={wrapping} data-from={oldOffset} className={`${s.experiencePhoto} ${offset === 0 ? s.centerPhoto : offset < 0 ? s.leftPhoto : s.rightPhoto}`} aria-label={`Show ${photo.label}`} aria-pressed={active === index} onClick={() => select(index)}><Image src={photo.image} alt={photo.alt} fill sizes="(max-width: 700px) 65vw, 55vw" style={{ objectPosition: photo.position }} /><span className={s.experienceShade} aria-hidden="true" /><span className={s.experienceCaption}>{photo.title}</span></button>; })}</div><div className={s.galleryControls}><span className={s.floorRing} aria-hidden="true" /><button onClick={() => select((active + 2) % 3)} aria-label="Previous experience" className={s.galleryPrev}>‹</button><div className={s.galleryTabs}>{photos.map((photo, index) => { const relative = (index - active + 3) % 3; const offset = relative === 2 ? -1 : relative; const oldRelative = (index - previous + 3) % 3; const oldOffset = oldRelative === 2 ? -1 : oldRelative; const wrapping = offset * oldOffset === -1; return <button key={photo.image} data-wrapping={wrapping} data-from={oldOffset} aria-pressed={active === index} onClick={() => select(index)} className={`${s.experienceTab} ${active === index ? s.activeGallery : ''}`} style={{ '--tab-position': offset + 1 }}>{photo.label}</button>; })}</div><button onClick={() => select((active + 1) % 3)} aria-label="Next experience" className={s.galleryNext}>›</button></div></section>;
}


