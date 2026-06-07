import { useState } from 'react';
import CertModal from '../components/CertModal';
import './About.css';

const certs = [
  {
    label: 'JP Morgan Chase — Software Engineering',
    issuer: 'JP Morgan Chase & Co · December 2025',
    image: '/certs/intern JP Morgan .pdf', 
  },
  {
    label: 'Mastercard — Cybersecurity Specialist',
    issuer: 'Mastercard',
    image: '/certs/intern Mastercard.pdf',
  },
  {
    label: 'IBM — Machine Learning with Python',
    issuer: 'IBM',
    image: '/certs/Coursera Machine learning with Python.pdf',
  },
  {
    label: 'IBM — Deep Learning · Keras & TensorFlow',
    issuer: 'IBM',
    image: '/certs/Coursera Deep Learning with Keras and Tensorflow.pdf',
  },
  {
    label: 'SkillUp EDTech - Certified blockchain security professional',
    issuer: 'SkillUp EDTech',
    image: '/certs/Certified Blockchain Security Prof (CBSP).pdf',
  },
  {
    label: 'IBM — Ethical Security with Linux',
    issuer: 'IBM',
    image: '/certs/Specialization IBM Ethical Hacking.pdf',
  },
];

const langs = [
  { lang: 'English', level: 'C1', note: 'IELTS certified' },
  { lang: 'Ukrainian', level: 'Native', note: '' },
  { lang: 'German', level: 'B2', note: '' },
  { lang: 'Lithuanian', level: 'B1', note: '' },
  { lang: 'Spanish', level: 'A1', note: '' },
];

export default function About() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="about" className="about">
      <div className="about-inner">

        <div className="section-label mono">
          <span>01</span> — about me
        </div>

        <div className="about-grid">
          <div className="about-text">
            <h2 className="serif about-heading">
              Software student<br />
              <em>building real things</em>
            </h2>
            <p>
              I'm a 3rd-year Informatics Systems student at Vytautas Magnus University.
              My interest sits at the intersection of web engineering, data systems,
              and cybersecurity — I like tackling problems that actually ship.
            </p>
            <p>
              I've completed internships at <strong>JP Morgan Chase</strong> and earned
              cybersecurity credentials from <strong>Mastercard</strong>. Whether it's
              a logistics dashboard or a full-stack app, I push to production.
            </p>

            <div className="about-langs">
              {langs.map(l => (
                <div key={l.lang} className="lang-item">
                  <span className="lang-name">{l.lang}</span>
                  <span className="mono lang-level">{l.level}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-certs">
            <h3 className="mono about-certs-title">// certifications — click to view</h3>
            <ul>
              {certs.map((c, i) => (
                <li
                  key={c.label}
                  className="cert-item cert-clickable"
                  onClick={() => setSelected(c)}
                  data-hover
                >
                  <span className="cert-dot" />
                  <span className="cert-text">{c.label}</span>
                  <span className="cert-view mono">view ↗</span>
                </li>
              ))}
            </ul>

            <div className="about-edu">
              <span className="mono about-edu-label">education</span>
              <p className="about-edu-degree serif">Bachelor of Informatics Systems</p>
              <p className="mono about-edu-school">Vytautas Magnus University · 2023–2027</p>
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <CertModal cert={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
