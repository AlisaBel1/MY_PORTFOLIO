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
              Frontend dev who<br />
              <em>knows the network</em>
            </h2>
            <p>
              I build React interfaces, and I understand what runs underneath them.
              I'm a 3rd-year Informatics Systems student at Vytautas Magnus University
              who just wrapped up a QA internship at <strong>Teltonika Networks</strong>,
              testing industrial IoT hardware: VLANs, routing, firewalls, Modbus TCP,
              MQTT and SNMP.
            </p>
            <p>
              I work empirically. I reproduce the bug, capture the packets, and
              prove the fix before I call it done. Wireshark, Postman, a Linux box
              and a test bench beat guessing every time. Add hands-on security work
              (Metasploit, Aircrack-ng, TryHackMe) and a <strong>Mastercard</strong> cybersecurity
              background, and I build things with attack surface in mind from day one.
            </p>
            <p>
              I want to ship fast, secure, scalable products where the frontend is
              only as good as the infrastructure behind it, backed by internships at{' '}
              <strong>JP Morgan Chase</strong> and Teltonika.
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
