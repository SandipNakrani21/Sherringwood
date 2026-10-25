'use client';

import Image from 'next/image';
import MotionText from '../MotionText';
import { useRef, useState } from 'react';
import { schoolImages } from './school-images';
import styles from '../../app/option-1/page.module.css';

const albums = [
  { image: 'science', title: 'An outdoor activity together', category: 'Community', className: 'galleryScience', width: 395, height: 218 },
  { image: 'violin', title: 'Finding their rhythm', category: 'Arts & Culture', className: 'galleryViolin', width: 219, height: 218 },
  { image: 'painting', title: 'Ideas in colour', category: 'Learning', className: 'galleryPainting', width: 198, height: 163 },
  { image: 'football', title: 'Growing through play', category: 'Sports', className: 'galleryFootball', width: 190, height: 163 },
  { image: 'celebration', title: 'Together, we belong', category: 'Community', className: 'galleryCelebration', width: 219, height: 163 },
];
const categories = ['All Moments', 'Learning', 'Arts & Culture', 'Sports', 'Community'];

export default function Gallery() {
  const [category, setCategory] = useState('All Moments');
  const [selected, setSelected] = useState(0);
  const dialog = useRef(null);
  const lastFocus = useRef(null);
  const visible = albums.filter((album) => category === 'All Moments' || album.category === category);

  function open(index) { lastFocus.current = document.activeElement; setSelected(index); dialog.current.showModal(); }
  function move(direction) { setSelected((index) => (index + direction + albums.length) % albums.length); }

  return (
    <section className={styles.gallery} id="gallery" aria-labelledby="gallery-title">
      <div className={styles.galleryHeading}><div><p className={styles.eyebrow}>THE SHERRINGWOOD COLLECTION</p><h2 id="gallery-title">Life, in its many colours.</h2><p>Explore the moments that make our school community.</p></div><button className={styles.textLink} onClick={() => { setCategory('All Moments'); open(0); }}><MotionText>View All Albums</MotionText><span aria-hidden="true">↗</span></button></div>
      <div className={styles.filters} role="group" aria-label="Filter albums">{categories.map((label) => <button key={label} onClick={() => setCategory(label)} aria-pressed={category === label} className={category === label ? styles.activeFilter : ''}>{label}</button>)}</div>
      <div className={`${styles.galleryGrid} ${category !== 'All Moments' ? styles.filteredGrid : ''}`}>{visible.map((album) => <button className={`${styles.galleryTile} ${styles[album.className]}`} key={album.image} onClick={() => open(albums.indexOf(album))} aria-label={`Open album: ${album.title}`}><Image src={schoolImages[album.image].src} alt={schoolImages[album.image].alt} style={{ objectPosition: schoolImages[album.image].position }} width={album.width} height={album.height} sizes="(max-width: 700px) 92vw, 60vw" /><span className={styles.captionBacking} aria-hidden="true" /><span className={styles.albumCaption}><span className={styles.albumCategory}>{album.category}</span><span className={styles.albumTitle}>{album.title}</span></span><span className={styles.expandIcon} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M5 19 19 5M7 5h12v12" /></svg></span></button>)}</div>
      <div className={styles.galleryBottom}><p>Explore a moment. Open an album.</p><div><button onClick={() => open((selected + albums.length - 1) % albums.length)} aria-label="Previous album">←</button><span>{String(selected + 1).padStart(2, '0')} / 05</span><button onClick={() => open((selected + 1) % albums.length)} aria-label="Next album">→</button></div></div>
      <dialog aria-label="School album viewer" onClose={() => lastFocus.current?.focus()} className={styles.albumDialog} ref={dialog} onClick={(event) => { if (event.target === dialog.current) dialog.current.close(); }} onKeyDown={(event) => { if (event.key === 'ArrowRight') move(1); if (event.key === 'ArrowLeft') move(-1); }}><button className={styles.dialogClose} autoFocus aria-label="Close album" onClick={() => dialog.current.close()}>×</button><Image src={schoolImages[albums[selected].image].src} alt={schoolImages[albums[selected].image].alt} width={albums[selected].width} height={albums[selected].height} sizes="90vw" /><div className={styles.dialogControls}><button onClick={() => move(-1)} aria-label="Previous image">←</button><h3>{albums[selected].title}</h3><button onClick={() => move(1)} aria-label="Next image">→</button></div></dialog>
    </section>
  );
}


