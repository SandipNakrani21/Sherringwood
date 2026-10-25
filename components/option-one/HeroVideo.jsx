'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import s from '../../app/option-1/page.module.css';

export default function HeroVideo() {
  const video = useRef(null);
  const frame = useRef(null);
  const reducedMotion = useReducedMotion();
  const [posterReady, setPosterReady] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const updateVisibility = () => setTabVisible(!document.hidden);
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    if (frame.current) observer.observe(frame.current);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', updateVisibility); };
  }, []);

  useEffect(() => {
    const connection = navigator.connection;
    if (!posterReady) return;
    const timer = setTimeout(() => setEnabled(!reducedMotion && !connection?.saveData), 1800);
    return () => clearTimeout(timer);
  }, [reducedMotion, posterReady]);

  useEffect(() => {
    if (!enabled || !video.current) return;
    if (paused || !inView || !tabVisible) video.current.pause();
    else video.current.play().catch(() => setPlaying(false));
  }, [enabled, paused, inView, tabVisible]);

  function togglePlayback() {
    if (!video.current) return;
    setPaused((value) => !value);
  }

  return <LazyMotion features={domAnimation}><div ref={frame} className={s.heroVideoBackground}>
    <div className={s.heroVideoPoster} aria-hidden="true"><Image src="/images/school/hero-main.webp" alt="" fill sizes="100vw" preload style={{objectFit: 'cover', objectPosition: '70% center'}} onLoad={() => setPosterReady(true)} /></div>
    {enabled && <m.div className={s.heroVideoLayer} initial={false} animate={{ opacity: playing ? 1 : 0 }} transition={{ duration: .65 }}>
      <video ref={video} className={s.heroVideo} muted loop playsInline preload="metadata" poster="/images/school/hero-main.webp" onPlaying={() => setPlaying(true)} aria-hidden="true"><source src="/videos/sherringwood-hero.mp4" type="video/mp4" /></video>
    </m.div>}
    <div className={s.heroVideoShade} aria-hidden="true" />
    {enabled && playing && <button type="button" className={s.heroVideoControl} onClick={togglePlayback} aria-label={paused ? 'Play background video' : 'Pause background video'}>{paused ? '▶ Play' : 'Ⅱ Pause'}</button>}
  </div></LazyMotion>;
}
