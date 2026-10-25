'use client';
import MotionText from '../MotionText';


import { useState } from 'react';
import styles from '../../app/option-1/page.module.css';

export default function EnquiryForm() {
  const [ready, setReady] = useState(false);
  const [mailLink, setMailLink] = useState('');

  function prepareEnquiry(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const phone = event.currentTarget.elements.phone;
    const digits = String(data.get('phone')).replace(/\D/g, '');
    phone.setCustomValidity(digits.length >= 7 && digits.length <= 15 ? '' : 'Enter a phone number with 7–15 digits.');
    if (!event.currentTarget.reportValidity()) return;
    const body = `Hello Sherringwood,\n\nI would like to arrange a campus visit.\n\nParent's name: ${data.get('name')}\nPhone number: ${data.get('phone')}\nInterested in: ${data.get('interest')}\n\nPlease contact me to discuss a suitable time.`;
    setMailLink(`mailto:reception@sherringwood.com?subject=${encodeURIComponent('Campus visit enquiry')}&body=${encodeURIComponent(body)}`);
    setReady(true);
  }

  return <form onChange={() => { setReady(false); setMailLink(''); }} className={styles.enquiry} onSubmit={prepareEnquiry}><h3>Let’s connect</h3><p className={styles.formMessage}>Prepare an email draft for reception@sherringwood.com. You must open your email app and send it yourself; this website does not send or save enquiries.</p><div className={styles.fields}><label>Parent’s name<input name="name" autoComplete="name" placeholder="Your name" required maxLength={100} /></label><label>Phone number<input name="phone" onInput={(event) => event.currentTarget.setCustomValidity('')} type="tel" autoComplete="tel" placeholder="+91 98765 43210" required minLength={7} maxLength={25} pattern="[+0-9() .-]{7,25}" title="Use 7–15 digits, optionally with +, spaces, brackets or hyphens" /></label><label>Interested in<select name="interest" defaultValue="" required><option value="" disabled>Select an option</option><option>Early Years</option><option>Primary Years</option><option>Beyond Primary</option><option>Campus Visit</option></select></label></div><button className={styles.goldButton} type="submit"><MotionText>Prepare visit email </MotionText><span aria-hidden="true">→</span></button>{ready && <p className={styles.formMessage} role="status">Draft prepared — nothing has been sent. <a href={mailLink}>Open it in your email app →</a></p>}</form>;
}
