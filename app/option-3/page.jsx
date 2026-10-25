import MotionText from '../../components/MotionText';
import Image from 'next/image';
import Gallery from '../../components/option-three/Gallery';
import SchoolLife from '../../components/option-three/SchoolLife';
import ExploreStepper from '../../components/option-three/ExploreStepper';
import ScrollReveal from '../../components/option-one/ScrollReveal';
import { schoolImages } from '../../components/option-three/school-images';
import s from './page.module.css';

export const metadata = { title: 'Sherringwood World School | Option 3' };
function VisitIcon({ kind }) {
  const paths = {
    calendar: <><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M8 3v5m8-5v5M4 11h16m-11 4h2v2H9z" /></>,
    enquiry: <><path d="M20 11a8 8 0 0 1-8 8H8l-5 3 2-6a8 8 0 1 1 15-5Z" /><path d="M10 8a2 2 0 1 1 3 2c-1 .5-1 1-1 2m0 3h.01" /></>,
    admissions: <><path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6m-6 4h6" /></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[kind]}</svg>;
}
function Photo({ name, alt, className = '', preload = false }) {
  const photo = schoolImages[name];
  return <div className={`${s.photo} ${className}`}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 700px) 90vw, 50vw" preload={preload} /></div>;
}
const stages = [
  { image: 'early', name: 'Early Years', description: <>A strong foundation<br />for curious minds.</> },
  { image: 'primary', name: 'Primary Years', description: <>Building confidence<br />through broader horizons.</> },
  { image: 'beyond', name: 'Beyond Primary', description: <>Greater independence<br />for a bright tomorrow.</> },
];
export default function OptionThree() {
  return <div className={s.page} id="option-three-top">
    <ScrollReveal rootId="option-three-top" skipSections={1} motionStyle="editorial" />
    <header className={s.header}><a href="#option-three-top" className={s.brand} aria-label="Sherringwood World School home"><span className={s.brandCrest} aria-hidden="true"><Image src="/images/school/original-live-logo.png" width={180} height={156} alt="" unoptimized /></span><span className={s.brandWordmark} aria-hidden="true"><Image src="/images/school/original-live-logo.png" width={180} height={156} alt="" unoptimized /></span></a><nav className={s.nav} aria-label="Main school navigation"><a href="#belief-three">The School</a><a href="#learning-three">Our Approach</a><a href="#life-three">Experiences</a><a href="#visit-three">Admissions</a></nav><a href="#visit-three" className={s.headerContact}><MotionText>Get in Touch</MotionText></a><details data-school-menu className={s.mobileMenu}><summary aria-label="Open navigation"><span /><span /><span /></summary><nav><a href="#belief-three">The School</a><a href="#learning-three">Our Approach</a><a href="#life-three">Experiences</a><a href="#visit-three">Admissions</a><a href="/">All Options</a></nav></details></header>
    <main>
      <section className={s.hero} aria-labelledby="hero-three-title"><div className={s.heroCopy} data-hero-content="copy"><p className={s.eyebrow}>SHERRINGWOOD WORLD SCHOOL / INDORE</p><h1 id="hero-three-title">Small<br />questions.<br />Big futures.</h1><p className={s.heroDescription}>A place to belong, explore and become.</p><a href="#belief-three" className={s.goldButton}><MotionText>Explore our world </MotionText><span aria-hidden="true">↗</span></a></div><div className={s.heroArt} data-hero-content="art"><div className={s.orbit} aria-hidden="true"><i /><i /><i /></div><Photo name="heroArt" className={s.heroCircle} preload /><div className={s.curiositySeal}>Curiosity<br />starts<br />here.</div></div><div className={s.scrollMark} aria-hidden="true"><span>Scroll to explore</span><b>↓</b><i />○<i />○<i />○</div><div className={s.motto}><i /><span>Ut Scientia Deducet &nbsp; — &nbsp; By knowledge we shall lead.</span><i /></div></section>
      <ExploreStepper />
      <section className={s.belief} id="belief-three"><div className={s.beliefLabel}>OUR BELIEF</div><div className={s.beliefCopy}><h2>Childhood is a beginning.<br />Let’s make it <em>extraordinary.</em></h2><p>We believe every child is unique, with a world of potential.<br />Through individual care and joyful discovery, we help them<br />find their voice and shape a brighter tomorrow.</p></div><Photo name="portrait" alt="A Sherringwood pupil looking ahead with curiosity" className={s.portrait} /></section>
      <section className={s.learning} id="learning-three"><div className={s.learningHeading}><p className={s.eyebrow}>OUR LEARNING MAP <span /></p><h2>Every stage opens a new door.</h2></div><div className={s.path}><svg viewBox="0 0 600 90" preserveAspectRatio="none" aria-hidden="true"><defs><radialGradient id="milestone"><stop stopColor="#633600" /><stop offset=".45" stopColor="#a87928" /><stop offset=".6" stopColor="#e4c77e" /><stop offset="1" stopColor="#d3ac5e" /></radialGradient></defs><path d="M10 83H170L202 65H390L423 35H595" fill="none" stroke="#ce9c3c" strokeWidth="1.3" /><circle cx="90" cy="83" r="6" fill="url(#milestone)" /><circle cx="300" cy="65" r="6" fill="url(#milestone)" /><circle cx="510" cy="35" r="6" fill="url(#milestone)" /></svg>{stages.map((stage) => <a className={s.stage} href="#visit-three" key={stage.name}><Photo name={stage.image} alt={`${stage.name} learning at Sherringwood`} className={s.stagePhoto} /><div className={s.stageBody}><h3>{stage.name}</h3><p>{stage.description}</p><span className={s.stageArrow} aria-hidden="true">→</span></div></a>)}</div></section>
      <SchoolLife /><Gallery />
      <section className={s.campus} id="campus-three" aria-label="Our campus"><Photo name="campus" alt="A leafy school campus, a place for possibility" className={s.campusPhoto} /><div className={s.campusCard}><p className={s.eyebrow}>OUR CAMPUS <span /></p><h2>A place for<br /><em>possibility.</em></h2><a href="#visit-three" className={s.goldButton}><MotionText>Discover our campus </MotionText><span aria-hidden="true">↗</span></a></div></section>
      <section className={s.visit} id="visit-three"><div><p className={s.eyebrow}>ADMISSIONS</p><h2>We’d love<br />to meet you.</h2><p className={s.visitCopy}>Come and experience the warmth of our community,<br />see our school in action and discover what makes<br />Sherringwood a special place to learn and grow.</p></div><nav aria-label="Admissions enquiries" className={s.visitLinks}><a href="mailto:reception@sherringwood.com?subject=Campus%20visit"><span className={s.visitIcon}><VisitIcon kind="calendar" /></span><span>Arrange a campus visit</span><b>→</b></a><a href="mailto:reception@sherringwood.com?subject=Admission%20enquiry"><span className={s.visitIcon}><VisitIcon kind="enquiry" /></span><span>Ask about admissions</span><b>→</b></a><a href="https://sherringwood.com/admission/" target="_blank" rel="noopener noreferrer"><span className={s.visitIcon}><VisitIcon kind="admissions" /></span><span>Explore admissions</span><b>→</b></a></nav></section>
    </main>
    <footer className={s.footer}><div className={s.footerMain}><a href="#option-three-top" className={s.footerBrand}><Image src="/images/school/original-live-logo.png" width={180} height={156} alt="Sherringwood World School" unoptimized /></a><div><h3>The School</h3><a href="#belief-three">Our Story</a><a href="#learning-three">Our Approach</a><a href="#life-three">School Life</a><a href="#campus-three">Our Campus</a></div><div><h3>Admissions</h3><a href="#visit-three">How To Apply</a><a href="#visit-three">Visit Our School</a><a href="mailto:reception@sherringwood.com">Fees &amp; Information</a><a href="https://sherringwood.com/admission/">FAQs</a></div><div className={s.contact}><h3>Contact</h3><a href="tel:+917898921212">♧ &nbsp; +91 7898921212</a><a href="mailto:reception@sherringwood.com">✉ &nbsp; reception@sherringwood.com</a><span>⌖ &nbsp; Indore, Madhya Pradesh</span></div></div><div className={s.footerBottom}><span>© 2026 Sherringwood World School, Indore. All rights reserved.</span><span>Ut Scientia Deducet &nbsp; — &nbsp; By knowledge we shall lead.</span></div></footer>
  </div>;
}



