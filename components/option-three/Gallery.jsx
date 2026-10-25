'use client';
import MotionText from '../MotionText';

import Image from 'next/image';
import { useRef, useState } from 'react';
import s from '../../app/option-3/page.module.css';
const photoAlts = { 'creative-play': 'A pupil holding a colourful craft outdoors', music: 'A pupil playing a drum kit', discovery: 'Two adults taking part in an outdoor activity at a yellow table', classroom: 'Children seated at classroom desks wearing paper crowns', sports: 'Pupils crawling through colourful hoops on the lawn', celebration: 'Children smiling in red and gold costumes' };
const photos = [
  { image: 'creative-play', title: 'A splash of imagination', category: 'Arts' },
  { image: 'music', title: 'Finding the right notes', category: 'Arts' },
  { image: 'discovery', title: 'An outdoor activity together', category: 'Community' },
  { image: 'classroom', title: 'A new discovery every day', category: 'Learning' },
  { image: 'sports', title: 'Teamwork all the way', category: 'Sport' },
  { image: 'celebration', title: 'Celebrating our traditions', category: 'Community' },
];
export default function Gallery() {
  const [filter, setFilter] = useState('All'); const [active, setActive] = useState(0); const lastFocus = useRef(null); const dialog = useRef(null);
  const visible = photos.map((photo, index) => ({ ...photo, index })).filter((photo) => filter === 'All' || photo.category === filter);
  function open(index, target) { setActive(index); lastFocus.current = target; dialog.current.showModal(); }
  function move(direction) { setActive((value) => (value + direction + photos.length) % photos.length); }
  return <section className={s.gallery} id="gallery-three"><div className={s.galleryHeading}><div><p className={s.eyebrow}>THE SHERRINGWOOD ALBUM <span /></p><h2>Collected moments.</h2></div><div role="group" aria-label="Filter gallery" className={s.filters}>{['All', 'Learning', 'Arts', 'Sport', 'Community'].map((category) => <button key={category} aria-pressed={category === filter} onClick={() => setFilter(category)}>{category}</button>)}</div></div><div className={s.galleryGrid}>{visible.map((photo) => <button key={photo.image} className={s.galleryItem} onClick={(event) => open(photo.index, event.currentTarget)} aria-label={`Open photo: ${photo.title}`}><span className={s.galleryPhoto}><Image src={`/images/school/${photo.image}.webp`} alt={photoAlts[photo.image]} fill sizes="(max-width: 700px) 45vw, 25vw" />{<span className={s.expand} aria-hidden="true">↗</span>}</span><span className={s.caption}><b>{String(photo.index + 1).padStart(2, '0')}</b>{photo.title}</span></button>)}</div><div className={s.galleryControls}><div><button aria-label="Previous gallery image" onClick={(event) => open((active + 5) % 6, event.currentTarget)}>←</button><button aria-label="Next gallery image" onClick={(event) => open((active + 1) % 6, event.currentTarget)}>→</button></div><button className={s.redButton} onClick={(event) => { setFilter('All'); open(0, event.currentTarget); }}><MotionText>Open the full gallery </MotionText><span aria-hidden="true">↗</span></button><span className={s.galleryCount}><i />{String(active + 1).padStart(2, '0')} &nbsp; — &nbsp; 06</span></div><dialog className={s.lightbox} ref={dialog} aria-label="School photo gallery" onClose={() => lastFocus.current?.focus()} onClick={(event) => { if (event.target === dialog.current) dialog.current.close(); }} onKeyDown={(event) => { if (event.key === 'ArrowRight') move(1); if (event.key === 'ArrowLeft') move(-1); }}><button className={s.close} onClick={() => dialog.current.close()} autoFocus aria-label="Close photo">×</button><Image src={`/images/school/${photos[active].image}.webp`} width={800} height={450} alt={photoAlts[photos[active].image]} /><div><button aria-label="Previous photo" onClick={() => move(-1)}>←</button><h3>{photos[active].title}</h3><button aria-label="Next photo" onClick={() => move(1)}>→</button></div></dialog></section>;
}

