'use client';

import { useEffect } from 'react';

export default function ScrollReveal({ rootId = 'top', skipSections = 0, motionStyle = 'simple' }) {
  useEffect(() => {
    const page = document.getElementById(rootId);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!page || !('IntersectionObserver' in window)) return;

    let observer;
    let targets = [];
    let deferredSections = [];

    function reset() {
      observer?.disconnect();
      targets.forEach((target) => {
        target.removeAttribute('data-scroll-reveal');
        target.removeAttribute('data-scroll-visible');
        target.removeAttribute('data-reveal-motion');
        target.style.removeProperty('--reveal-delay');
      });
      targets = [];
      deferredSections.forEach((section) => {
        section.removeAttribute('data-scroll-deferred');
        section.style.removeProperty('--deferred-block-size');
      });
      deferredSections = [];
    }

    function setup() {
      reset();
      if (preference.matches) return;

      const sections = page.querySelectorAll('main > section, main > nav, footer');
      // Preserve each section's real layout size while the browser skips drawing
      // distant content. The markup and anchor destinations stay in the document.
      const sizes = [...sections].map((section) => section.getBoundingClientRect().height);
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-scroll-visible', 'true');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

      sections.forEach((section, index) => {
        // Hero copy has an immediate entrance; never wait for a scroll to show it.
        if (index === 0 || index < skipSections) return;
        [...section.children].forEach((child, order) => {
          if (child.tagName === 'DIALOG' || child.getAttribute('aria-hidden') === 'true') return;
          // Never hide content already visible or above the current scroll position.
          const bounds = child.getBoundingClientRect();
          if (bounds.top < 0 || bounds.bottom <= 0) return;
          child.setAttribute('data-scroll-reveal', 'true');
          if (motionStyle === 'editorial') {
            const motions = {
              gallery: ['rise', 'rise', 'soft-zoom', 'rise'],
              'school-film': ['from-left', 'from-right'],
              learning: ['from-top', 'rise', 'rise'],
              'our-school': ['from-left', 'from-right'],
              campus: ['soft-zoom', 'from-right'],
              'school-life': ['rise', 'rise'],
              admissions: ['from-left', 'rise'],
              'belief-three': ['rise', 'from-left', 'soft-zoom'],
              'learning-three': ['rise', 'rise'],
              'life-three': ['from-left', 'from-right'],
              'gallery-three': ['rise', 'soft-zoom', 'rise'],
              'campus-three': ['soft-zoom', 'from-right'],
              'visit-three': ['from-left', 'from-right'],
            };
            child.setAttribute('data-reveal-motion', motions[section.id]?.[order] || 'rise');
          }
          child.style.setProperty('--reveal-delay', `${Math.min(order, 3) * (motionStyle === 'editorial' ? 150 : 120)}ms`);
          targets.push(child);
          observer.observe(child);
        });
      });

    }

    setup();
    const revealPassed = () => {
      targets.forEach(target => {
        if (target.getBoundingClientRect().top < window.innerHeight - 24) target.setAttribute('data-scroll-visible', 'true');
      });
    };
    window.addEventListener('scroll', revealPassed, { passive: true });
    window.addEventListener('pageshow', revealPassed);
    revealPassed();
    // Keyboard and anchor navigation must never land on invisible content.
    const revealFocused = (event) => {
      event.target.closest?.('[data-scroll-reveal]')?.setAttribute('data-scroll-visible', 'true');
    };
    page.addEventListener('focusin', revealFocused);
    preference.addEventListener('change', setup);
    return () => {
      reset();
      window.removeEventListener('scroll', revealPassed);
      window.removeEventListener('pageshow', revealPassed);
      page.removeEventListener('focusin', revealFocused);
      preference.removeEventListener('change', setup);
    };
  }, [rootId, skipSections, motionStyle]);

  return null;
}
