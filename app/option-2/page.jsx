import MotionText from '../../components/MotionText';
import Image from 'next/image';
import ScrollReveal from '../../components/option-one/ScrollReveal';
import Experiences from '../../components/option-two/Experiences';
import Learning from '../../components/option-two/Learning';
import Journal from '../../components/option-two/Journal';
import HeroSlideshow from '../../components/option-two/HeroSlideshow';
import s from './page.module.css';

export const metadata = { title: 'Sherringwood World School | Option 2' };

export function Photo({ name, alt, className = '', preload = false }) {
  return <div className={`${s.photo} ${className}`}><Image src={`/images/school/${({portrait:'hero-main', campus:'campus', visit:'teamwork'})[name]}.webp`} alt={alt} fill sizes="(max-width: 700px) 100vw, 65vw" preload={preload} /></div>;
}

export default function OptionTwo() {
  return <div className={s.page} id="option-two-top">
    <ScrollReveal rootId="option-two-top" skipSections={1} />
    <main>
      <section className={s.hero} aria-labelledby="option-two-hero-title">
        <HeroSlideshow />
        <div className={s.heroShade} aria-hidden="true" />
        <a className={s.heroOriginalLogo} href="#option-two-top" aria-label="Sherringwood World School home"><Image src="/images/sherringwood-logo.png" alt="Sherringwood World School" width={180} height={158} unoptimized preload /></a>
        <div className={s.heroContent} data-hero-content="copy">
          <h1 id="option-two-hero-title">A world of<br />possibility.</h1>
          <p className={s.heroSchool}>SHERRINGWOOD WORLD SCHOOL · INDORE</p>
          <p className={s.heroSubtitle}>Curiosity starts here. Possibility goes everywhere.</p>
          <div className={s.heroActions}>
            <a href="#philosophy" className={s.heroCta}><MotionText>Explore Sherringwood ↗</MotionText></a>
            <a href="https://www.youtube.com/watch?v=Vg5GocYF_7E" target="_blank" rel="noopener noreferrer" className={s.heroFilm}><span aria-hidden="true">▶</span>Watch our story</a>
          </div>
        </div>
        <a href="#philosophy" className={s.heroScrollText}>Scroll to discover <span aria-hidden="true">↓</span></a>
<nav className={s.navigation} aria-label="Option 2 school navigation"><a href="#philosophy">Discover</a><a href="#learning-two">Learning</a><a href="#experiences">Beyond Learning</a><a href="#visit-two">Admissions</a><a className={s.enquire} href="mailto:reception@sherringwood.com"><MotionText>Enquire</MotionText></a><details data-school-menu className={s.menu}><summary aria-label="Open school menu"><span /><span /><span /></summary><div><a href="/">All Options</a><a href="#philosophy">Our School</a><a href="#journal-two">Photo Journal</a><a href="#visit-two">Visit Our Campus</a></div></details></nav>
      </section>
      <section className={s.philosophy} id="philosophy"><div className={s.belief}><p className={s.eyebrow}>THE SHERRINGWOOD WAY</p><h2>Rooted in care.<br />Open to possibility.</h2></div><div className={s.beliefCopy}><p>A community where children are<br />encouraged to question, create<br />and find their own voice.</p><a href="#learning-two" className={s.link}><MotionText>Discover our philosophy ↗</MotionText></a></div><Photo name="portrait" alt="A pupil looking up during an outdoor activity" className={s.portrait} /></section>
      <Experiences />
      <Learning />
      <section id="campus-two" className={s.campus}><div className={s.campusHeading}><div><p className={s.eyebrow}>OUR CAMPUS</p><h2>Step inside a world built for discovery.</h2></div><a href="#visit-two" className={s.link}><MotionText>More about our campus ↗</MotionText></a></div><a href="#visit-two" aria-label="Explore the campus — arrange an in-person visit"><Photo name="campus" alt="The school building and surrounding trees" className={s.campusImage} /></a></section>
      <Journal />
      <section className={s.visit} id="visit-two"><Photo name="visit" alt="Children and adults gathered on mats outdoors" className={s.visitImage} /><h2>Come see what<br />a school day can become.</h2><div><a href="mailto:reception@sherringwood.com?subject=Campus%20visit" className={s.goldButton}><MotionText>Book a Campus Visit ↗</MotionText></a><a href="tel:+917898921212" className={s.visitLink}><MotionText>Speak to Admissions →</MotionText></a></div></section>
    </main>
    <footer className={s.footer}><a href="#option-two-top" className={s.logo}><Image src="/images/sherringwood-logo.png" alt="Sherringwood World School" width={180} height={158} unoptimized /></a><div><h3>Discover</h3><a href="#philosophy">Our Philosophy</a><a href="#experiences">Life at Sherringwood</a><a href="#campus-two">Our Campus</a><a href="#journal-two">Photo Journal</a></div><div><h3>Learning</h3><a href="#learning-two">Early Years</a><a href="#learning-two">Primary Years</a><a href="#learning-two">Beyond Primary</a><a href="#experiences">Holistic Development</a></div><div><h3>Admissions</h3><a href="#visit-two">How to Apply</a><a href="#visit-two">Visit Our Campus</a><a href="mailto:reception@sherringwood.com">Enquiry</a><a href="https://sherringwood.com/admission/">FAQs</a></div><div className={s.contact}><h3>Connect</h3><a href="tel:+917898921212">♧ &nbsp; +91 7898921212</a><a href="mailto:reception@sherringwood.com">✉ &nbsp; reception@sherringwood.com</a><span>⌖ &nbsp; Indore, Madhya Pradesh</span></div><div className={s.footerEnd}><div className={s.socials}><a href="https://www.instagram.com/sherringwoodworldschool/" aria-label="Instagram">◎</a><a href="https://www.facebook.com/sherringwood/" aria-label="Facebook">f</a><a href="https://www.youtube.com/watch?v=Vg5GocYF_7E" aria-label="School video">▶</a><a href="mailto:reception@sherringwood.com" aria-label="Email the school">✉</a></div><p>© 2026 Sherringwood World School.<br />All rights reserved.</p></div></footer>
  </div>;
}



