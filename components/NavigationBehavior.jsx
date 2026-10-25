'use client';
import { useEffect } from 'react';

export default function NavigationBehavior() {
  useEffect(() => {
    const menus = [...document.querySelectorAll('details')];
    const update = (event) => {
      const menu = event.currentTarget;
      menu.querySelector('summary')?.setAttribute('aria-label', menu.open ? 'Close navigation' : 'Open navigation');
    };
    const click = (event) => {
      if (event.target.closest('a')) menus.forEach(menu => { menu.open = false; });
    };
    const key = (event) => {
      const dialog = document.querySelector('dialog[open]');
      if (event.key === 'Tab' && dialog) {
        const controls = [...dialog.querySelectorAll('button, a[href], input, select, [tabindex="0"]')].filter(node => !node.disabled && node.getClientRects().length);
        const first = controls[0], last = controls[controls.length - 1];
        if (first && (controls.length === 1 || (!event.shiftKey && document.activeElement === last))) { event.preventDefault(); first.focus(); }
        else if (last && event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      }
      if (event.key === 'Escape') menus.forEach(menu => {
        if (menu.open) { menu.open = false; menu.querySelector('summary')?.focus(); }
      });
    };
    menus.forEach(menu => menu.addEventListener('toggle', update));
    document.addEventListener('click', click);
    document.addEventListener('keydown', key);
    return () => {
      menus.forEach(menu => menu.removeEventListener('toggle', update));
      document.removeEventListener('click', click);
      document.removeEventListener('keydown', key);
    };
  }, []);
  return null;
}
