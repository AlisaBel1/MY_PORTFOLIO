import { useState, useEffect } from 'react';
import './Nav.css';

const links = [
  { label: 'about', href: '#about' },
  { label: 'skills', href: '#skills' },
  { label: 'projects', href: '#projects' },
  { label: 'contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a href="#hero" className="nav-logo" data-hover>
        <span className="serif">AB</span>
        <span className="mono nav-logo-sub">alisa.dev</span>
      </a>

      <ul className={`nav-links ${open ? 'nav-links--open' : ''}`}>
        {links.map((l, i) => (
          <li key={l.href}>
            <a href={l.href} data-hover onClick={() => setOpen(false)}>
              <span className="mono nav-index">{String(i + 1).padStart(2,'0')}</span>
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <a href="mailto:alisa.programmerhack@gmail.com" className="nav-cta" data-hover>
        hire me
      </a>

      <button className={`nav-burger ${open ? 'nav-burger--open' : ''}`} onClick={() => setOpen(!open)}>
        <span /><span /><span />
      </button>
    </nav>
  );
}
