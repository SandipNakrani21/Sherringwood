'use client';

import Image, { getImageProps } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import s from '../../app/option-2/page.module.css';

const slides = [
  { src: '/images/school/hero-main.webp', alt: 'A Sherringwood student exploring outdoors', position: '62% 32%' },
  { src: '/images/school/sports.webp', alt: 'Sherringwood children playing with colourful hoops outdoors', position: '50% 45%' },
  { src: '/images/school/discovery.webp', alt: 'Two adults taking part in an outdoor activity at a yellow table', position: '50% 45%' },
  { src: '/images/school/campus.webp', alt: 'The Sherringwood school building and grounds', position: '50% 50%' },
];

export default function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [pending, setPending] = useState(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [ready, setReady] = useState([0]);
  const [visible, setVisible] = useState(true);
  const frame = useRef(null);
  const [inView, setInView] = useState(true);
  const [firstLoaded, setFirstLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    if (frame.current) observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    const visibility = () => setVisible(!document.hidden);
    update(); visibility();
    preference.addEventListener('change', update);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      preference.removeEventListener('change', update);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  useEffect(() => {
    // Warm the next original photo before its scheduled transition.
    if (!firstLoaded || !inView || !visible || paused || reduced || navigator.connection?.saveData) return;
    const next = (active + 1) % slides.length;
    const image = new window.Image();
    const { props } = getImageProps({ src: slides[next].src, alt: '', fill: true, sizes: '100vw' });
    image.sizes = props.sizes;
    image.srcset = props.srcSet;
    image.src = props.src;
    image.onload = () => setReady((values) => values.includes(next) ? values : [...values, next]);
    return () => { image.onload = null; };
  }, [active, firstLoaded, inView, visible, paused, reduced]);

  useEffect(() => {
    if (paused || reduced || !visible || !inView || navigator.connection?.saveData) return;
    const timer = setInterval(() => {
      const next = (active + 1) % slides.length;
      if (ready.includes(next)) setActive(next);
    }, 4000);
    return () => clearInterval(timer);
  }, [active, paused, reduced, visible, inView, ready]);

  return <>
    <div ref={frame} className={s.heroSlides} aria-hidden="true">{slides.map((slide, index) => (index === active || index === pending || index === 0 || ready.includes(index)) && <div key={slide.src} className={`${s.heroSlide} ${active === index ? s.heroSlideActive : ''}`}><Image src={slide.src} alt="" fill sizes="100vw" preload={index === 0} onLoad={() => { setReady((values) => values.includes(index) ? values : [...values, index]); if (index === 0) setFirstLoaded(true); if (index === pending) { setActive(index); setPending(null); } }} style={{ objectFit: 'cover', objectPosition: slide.position }} /></div>)}</div>
    <div className={s.heroSlideControls} aria-label="Hero slideshow">
      {slides.map((slide, index) => <button key={slide.src} type="button" onClick={() => { if (ready.includes(index)) setActive(index); else setPending(index); }} aria-label={`Show photo ${index + 1}: ${slide.alt}`} aria-pressed={index === active}>{String(index + 1).padStart(2, '0')}</button>)}
      <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} aria-pressed={paused}>{paused ? '▶' : 'Ⅱ'}</button>
    </div>
  </>;
}
