import { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero() {
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const badgeRef = useRef(null);

  useEffect(() => {
    const els = [badgeRef.current, headingRef.current, subRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 200 + i * 150);
    });
  }, []);

  return (
    <section id="hero" className="hero">

      {/* ── Photo — right side, full height bleed ── */}
      <div className="hero-photo-wrap">
        <img src="/alisa-hero.png" alt="Alisa Biliavska" className="hero-photo" />
        {/* gradient blends photo into bg on left edge */}
        <div className="hero-photo-fade" />
      </div>

      

      {/* ── Text content ── */}
      <div className="hero-content">
        <div className="hero-badge mono" ref={badgeRef}>
          <span className="hero-badge-dot" />
          available for work · Kaunas, Lithuania
        </div>

        <h1 className="hero-title" ref={headingRef}>
          <span className="hero-title-first serif">Alisa</span>
          <span className="hero-title-last serif">Biliavska</span>
        </h1>

        <div className="hero-sub-block" ref={subRef}>
          <p className="hero-role mono">
            <span className="hero-role-bracket">[</span>
            Software Engineer
            <span className="hero-role-bracket">]</span>
          </p>
          <p className="hero-desc">
            Web Engineering · Data Systems · Cybersecurity<br />
            Building things that ship.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn-primary" data-hover>View Work</a>
            <a href="#contact" className="btn-ghost" data-hover>Get in touch ↗</a>
          </div>

          <div className="hero-stack mono">
            {['React', 'Node.js', 'Three.js', 'Python', 'Java', 'Docker'].map(t => (
              <span key={t} className="hero-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Chapter label like Mina Massoud ── */}
      <div className="hero-chapter mono">
        <span>零</span>
        <span>CHAPTER 00</span>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero-scroll mono">
        <div className="hero-scroll-line" />
        <span>scroll</span>
      </div>

    </section>
  );
}
