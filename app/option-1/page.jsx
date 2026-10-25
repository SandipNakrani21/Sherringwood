import MotionText from '../../components/MotionText';
import Image from 'next/image';
import Gallery from '../../components/option-one/Gallery';
import LearningStepper from '../../components/option-one/LearningStepper';
import HeroVideo from '../../components/option-one/HeroVideo';
import EnquiryForm from '../../components/option-one/EnquiryForm';
import ScrollReveal from '../../components/option-one/ScrollReveal';
import { schoolImages } from '../../components/option-one/school-images';
import styles from './page.module.css';

export const metadata = { title: 'Sherringwood World School | Option 1' };

function Photo({ name, alt, className = '', sizes = '(max-width: 700px) 92vw, 50vw', preload = false }) {
  const image = schoolImages[name];
  return <div className={`${styles.photo} ${className}`}><Image src={image.src} alt={image.alt || alt} fill sizes={sizes} preload={preload} style={{ objectPosition: image.position }} /></div>;
}

function SchoolLogo({ footer = false }) {
  return <a href="#top" className={footer ? styles.footerLogo : styles.logo} aria-label="Sherringwood World School home"><Image src="/images/sherringwood-logo.png" alt="Sherringwood World School" width={180} height={158} sizes="(max-width: 700px) 85px, 12vw" unoptimized /></a>;
}

function NavLinks() {
  return <><a href="#our-school">Our School <svg className={styles.navChevron} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="m3 4.5 3 3 3-3" /></svg></a><a href="#learning">Learning <svg className={styles.navChevron} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="m3 4.5 3 3 3-3" /></svg></a><a href="#school-life">School Life <svg className={styles.navChevron} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="m3 4.5 3 3 3-3" /></svg></a><a href="#admissions">Admissions <svg className={styles.navChevron} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="m3 4.5 3 3 3-3" /></svg></a></>;
}

export default function OptionOne() {
  return (
    <div className={styles.page} id="top">
      <ScrollReveal motionStyle="editorial" />
      <header className={styles.header}>
        <SchoolLogo />
        <nav className={styles.desktopNav} aria-label="School navigation"><NavLinks /></nav>
        <a className={styles.visitButton} href="#admissions"><MotionText>Visit Sherringwood </MotionText><span aria-hidden="true">→</span></a>
        <details data-school-menu className={styles.mobileMenu}><summary aria-label="Open navigation"><span /><span /><span /></summary><nav aria-label="Mobile school navigation"><NavLinks /></nav></details>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="hero-title">
          <HeroVideo />
          <div className={styles.heroCopy} data-hero-content="copy">
            <p className={styles.eyebrow}>SHERRINGWOOD WORLD SCHOOL · INDORE</p>
            <h1 id="hero-title"><span className={styles.heroFillLine}>A childhood</span><br /><span className={styles.heroFillLine}>of wonder.</span><br /><span className={styles.heroFillLine}>A future of</span><br /><span className={styles.heroFillLine}>possibilities.</span></h1>
            <p className={styles.heroDescription}>A nurturing community where curious<br className={styles.desktopBreak} /> minds grow, kind hearts lead and<br className={styles.desktopBreak} /> every child finds their unique tomorrow.</p>
            <a className={styles.primaryButton} href="#our-school"><MotionText>Discover Sherringwood </MotionText><span aria-hidden="true">→</span></a>
            <p className={styles.motto}><span />By knowledge we shall lead.</p>
          </div>
        </section>

        <section className={styles.values} aria-label="Our values">
          <span className={styles.valuesWord}>Curiosity</span><span className={styles.valuesDot} aria-hidden="true">•</span><span className={styles.valuesWord}>Confidence</span><span className={styles.valuesDot} aria-hidden="true">•</span><span className={styles.valuesWord}>Character</span>
        </section>

        <Gallery />

        <section className={styles.film} id="school-film" aria-labelledby="film-title">
          <a href="https://www.youtube.com/watch?v=Vg5GocYF_7E" target="_blank" rel="noopener noreferrer" className={styles.filmLink} aria-label="Find the Sherringwood school film on YouTube"><Photo name="film" alt="A teacher sharing a learning activity with children" className={styles.filmPhoto} /><span className={styles.playButton} aria-hidden="true">▶</span></a>
          <div className={styles.filmCopy}><h2 id="film-title">See a day unfold.</h2><p>A glimpse into learning, friendships<br className={styles.desktopBreak} /> and everyday discoveries.</p><a className={styles.textLink} href="https://www.youtube.com/watch?v=Vg5GocYF_7E" target="_blank" rel="noopener noreferrer"><MotionText>Watch the School Film</MotionText><span aria-hidden="true">→</span></a></div>
          <div className={styles.leaf} aria-hidden="true" />
        </section>

        <section className={styles.learning} id="learning" aria-labelledby="learning-title">
          <p className={styles.eyebrow}>THE LEARNING JOURNEY</p>
          <h2 id="learning-title">Growing, one discovery at a time.</h2>
          <div className={styles.learningBody}>
            <LearningStepper />
            <Photo name="learning" alt="A student absorbed in reading and writing" className={styles.learningPhoto} />
          </div>
        </section>

        <section className={styles.philosophy} id="our-school" aria-label="Our approach">
          <div className={styles.statement}><span className={styles.quoteMark} aria-hidden="true">“</span><h2>Every child deserves<br />to be seen, heard and<br />encouraged.</h2><span className={styles.quoteMarkEnd} aria-hidden="true"><svg viewBox="0 0 200 150" fill="currentColor"><path d="M45 8C70 8 84 25 84 54C84 96 64 125 22 145L10 124C39 108 54 90 57 71H38C15 71 5 59 5 39C5 20 20 8 45 8Z" /><path d="M153 8C178 8 192 25 192 54C192 96 172 125 130 145L118 124C147 108 162 90 165 71H146C123 71 113 59 113 39C113 20 128 8 153 8Z" /></svg></span></div>
          <div className={styles.philosophyCopy}><p>We believe in the power of individual attention,<br className={styles.desktopBreak} /> the spark of curiosity and the lasting impact<br className={styles.desktopBreak} /> of a caring community.</p><a className={styles.textLink} href="#learning"><MotionText>Our Approach</MotionText><span aria-hidden="true">→</span></a></div>
        </section>

        <section className={styles.campus} id="campus" aria-labelledby="campus-title">
          <Photo name="campus" alt="Students enjoying a green school courtyard" className={styles.campusPhoto} sizes="(max-width: 700px) 100vw, 69vw" />
          <div className={styles.campusCopy}><h2 id="campus-title">Room to explore.<br />Space to become.</h2><p>Beautiful spaces that inspire learning,<br className={styles.desktopBreak} /> play, friendship and a deeper connection<br className={styles.desktopBreak} /> with the world.</p><a className={styles.textLink} href="#admissions"><MotionText>Discover the Campus</MotionText><span aria-hidden="true">→</span></a><div className={styles.leaf} aria-hidden="true" /></div>
        </section>

        <section className={styles.journal} id="school-life" aria-labelledby="journal-title">
          <div className={styles.journalHeading}><div><p className={styles.eyebrow}>OUR JOURNAL</p><h2 id="journal-title">The everyday extraordinary</h2></div><p>Stories from our classrooms, playgrounds and beyond —<br className={styles.desktopBreak} /> a glimpse into the life, learning and spirit of Sherringwood.</p></div>
          <div className={styles.journalGrid}><article className={styles.mainStory}><Photo name="journalArt" alt="Students painting a colourful collaborative mural" className={styles.journalArt} /><h3>Ideas come to life</h3><p>Creativity helps our students see the world differently —<br className={styles.desktopBreak} /> and express it in their own way.</p></article><article className={styles.sideStory}><Photo name="journalLearning" alt="Children learning together through a hands-on activity" className={styles.journalLearning} /><div><h3>Learning together</h3><p>Collaboration builds confidence,<br className={styles.desktopBreak} /> deeper understanding and<br className={styles.desktopBreak} /> lifelong skills.</p></div></article></div>
        </section>

        <section className={styles.admissions} id="admissions" aria-labelledby="admissions-title"><div className={styles.admissionsCopy}><h2 id="admissions-title">Your next chapter<br />starts with a visit.</h2><p>Come and experience our school community,<br className={styles.desktopBreak} /> meet our team and see what makes<br className={styles.desktopBreak} /> Sherringwood special.</p><div className={styles.leaf} aria-hidden="true" /></div><EnquiryForm /></section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <SchoolLogo footer />
            <p>By knowledge we shall lead.</p>
          </div>
          <div className={`${styles.footerColumn} ${styles.footerExplore}`}>
            <nav aria-label="Explore the school">
              <a href="#our-school">Our School</a>
              <a href="#learning">Learning Journey</a>
              <a href="#school-life">School Life</a>
              <a href="#gallery">Photo Gallery</a>
            </nav>
          </div>
          <div className={styles.footerColumn}>
            <h3>Start your journey</h3>
            <nav aria-label="Admissions links">
              <a href="#admissions">Admissions Enquiry</a>
              <a href="#admissions">Book a Campus Visit</a>
              <a href="#campus">Explore Our Campus</a>
            </nav>
            <a className={styles.footerVisit} href="#admissions"><MotionText>Come, meet us </MotionText><span aria-hidden="true">↗</span></a>
          </div>
          <div className={styles.footerColumn}>
            <h3>Get in touch</h3>
            <address>
              <p><ContactIcon name="location" /><span>4, Gyans Park, Telephone Nagar,<br />Indore, Madhya Pradesh – 452018</span></p>
              <a href="tel:+917898921212"><ContactIcon name="phone" /><span>+91 7898921212</span></a>
              <a href="mailto:reception@sherringwood.com"><ContactIcon name="email" /><span>reception@sherringwood.com</span></a>
            </address>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>© 2026 Sherringwood World School. All rights reserved.</span>
          <div><a href="https://sherringwood.com/privacy-policy/">Privacy Policy</a><a href="https://sherringwood.com/terms-and-conditions/">Terms of Use</a><a href="#top" className={styles.footerBackTop}>Back to top ↑</a></div>
        </div>
      </footer>
    </div>
  );
}

function ContactIcon({ name }) {
  const paths = {
    location: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
    phone: <path d="m7 3 3 5-3 2c1.4 3.2 3.8 5.6 7 7l2-3 5 3-1 4c-9 1-18-8-17-17Z" />,
    email: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 6 9 7 9-7" /></>,
  };
  return <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">{paths[name]}</svg>;
}






