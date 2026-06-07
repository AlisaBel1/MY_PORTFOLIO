import { useEffect, useRef } from 'react';
import Scene3D from '../components/Scene3D';
import './Hero.css';

export default function Hero() {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    setTimeout(() => {
      el.style.transition = 'opacity 1s ease, transform 1s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 300);
  }, []);

  return (
    <section id="hero" className="hero">
      {/* 3D canvas */}
      <div className="hero-canvas">
        <Scene3D />
      </div>

      {/* Radial gradient overlay */}
      <div className="hero-gradient" />

      {/* Content */}
      <div className="hero-content" ref={textRef}>
        <div className="hero-badge mono">
          <span className="hero-badge-dot" />
          available for work · Kaunas, Lithuania
        </div>

        <h1 className="hero-title serif">
          Alisa<br />
          <em>Biliavska</em>
        </h1>

        <p className="hero-sub">
          Software Engineering Student<br />
          <span className="hero-sub-accent">Web · Data · Cybersecurity</span>
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn-primary" data-hover>
            View Work
          </a>
          <a href="#contact" className="btn-ghost" data-hover>
            Get in touch ↗
          </a>
        </div>

        <div className="hero-stack mono">
          {['React', 'Node.js', 'Three.js', 'Python', 'Java', 'C#'].map(t => (
            <span key={t} className="hero-tag">{t}</span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll mono">
        <span>scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
