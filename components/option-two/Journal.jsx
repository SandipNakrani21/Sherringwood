'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import s from '../../app/option-2/page.module.css';

// Original school photos; captions describe the visible activity only.
// Provenance: public/images/school/sources.json.
const albums = [
  {
    image: '/images/school/teamwork.webp', label: 'School Life', topic: 'Together at School',
    caption: 'Little moments, shared together.',
    alt: 'Sherringwood children and adults sitting together on mats at an outdoor school gathering',
    width: 2000, height: 1333, position: '50% 55%',
  },
  {
    image: '/images/school/music.webp', label: 'Music', topic: 'Drums & Rhythm',
    caption: 'Finding a rhythm of their own.',
    alt: 'A Sherringwood pupil playing a drum kit with drumsticks',
    width: 1500, height: 1000, position: '50% 52%',
  },
  {
    image: '/images/school/sports.webp', label: 'Sport', topic: 'Outdoor Hoop Games',
    caption: 'Playing together, one hoop at a time.',
    alt: 'Sherringwood pupils crawling through colourful hoops held by their classmates on the school lawn',
    width: 2000, height: 1330, position: '50% 55%',
  },
  {
    image: '/images/school/celebration.webp', label: 'Community', topic: 'Festive Moments',
    caption: 'Colourful costumes and happy faces.',
    alt: 'Young Sherringwood children smiling together in red and gold festive costumes',
    width: 1600, height: 768, position: '50% 45%',
  },
];

export default function Journal() {
  const [active, setActive] = useState(1);
  const dialog = useRef(null);
  const lastFocus = useRef(null);
  const album = albums[active];
  const previews = [0, 3, 1, 2].filter((index) => index !== active).slice(0, 2);
  const move = (direction) => setActive((value) => (value + direction + albums.length) % albums.length);

  return <section className={s.journal} id="journal-two" aria-labelledby="journal-title">
    <p className={s.eyebrow}>THE PHOTO JOURNAL</p>
    <div className={s.journalHeading}>
      <h2 id="journal-title">Inside the everyday.</h2><span />
      <div>
        <button aria-label="Previous journal photo" onClick={() => move(-1)}>‹</button>
        <button aria-label="Next journal photo" onClick={() => move(1)}>›</button>
      </div>
    </div>
    <div className={s.journalGrid}>
      <button className={s.journalMain} aria-label={`Expand photo: ${album.topic}`} onClick={(event) => { lastFocus.current = event.currentTarget; dialog.current.showModal(); }}>
        <Image src={album.image} alt={album.alt} fill sizes="(max-width: 700px) 90vw, 56vw" style={{ objectPosition: album.position }} />
        <span className={s.expand} aria-hidden="true">↗</span>
        <span className={s.photoCaption}><small className={s.journalTopic}>{album.topic}</small>{album.caption}</span>
      </button>
      <div className={s.journalStories}>
        {previews.map((index) => {
          const preview = albums[index];
          return <button key={preview.image} onClick={() => setActive(index)} aria-label={`Show ${preview.topic}`}>
            <span className={s.storyPhoto}><Image src={preview.image} alt={preview.alt} fill sizes="(max-width: 700px) 44vw, 24vw" style={{ objectPosition: preview.position }} /></span>
            <span><small className={s.journalTopic}>{preview.label}</small>{preview.topic}<b aria-hidden="true">⟶</b></span>
          </button>;
        })}
      </div>
    </div>
    <div className={s.journalTabs} role="group" aria-label="Photo journal topics">
      {albums.map((item, index) => <button key={item.image} aria-pressed={active === index} onClick={() => setActive(index)} className={active === index ? s.activeJournal : ''}><small>0{index + 1}</small>{item.label}</button>)}
    </div>
    <dialog ref={dialog} className={s.lightbox} aria-label="Photo journal viewer" onClose={() => lastFocus.current?.focus()} onKeyDown={(event) => {
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
    }} onClick={(event) => { if (event.target === dialog.current) dialog.current.close(); }}>
      <button className={s.close} onClick={() => dialog.current.close()} autoFocus aria-label="Close photo">×</button>
      <Image src={album.image} width={album.width} height={album.height} sizes="90vw" alt={album.alt} />
      <h3 className={s.journalLightboxTitle}>{album.topic}</h3><p>{album.caption}</p>
    </dialog>
  </section>;
}
