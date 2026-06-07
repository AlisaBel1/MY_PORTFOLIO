import { useEffect, useRef } from 'react';
import './Skills.css';

const techGroups = [
  {
    title: 'Languages',
    items: ['Python', 'Java', 'C#', 'JavaScript', 'TypeScript', 'HTML', 'CSS', '.NET'],
  },
  {
    title: 'Frontend & 3D',
    items: ['React.js', 'Next.js', 'Three.js', 'Vite', 'Webpack', 'Tailwind CSS'],
  },
  {
    title: 'Backend & DB',
    items: ['Node.js', 'Spring Boot', 'REST APIs', 'MongoDB', 'MySQL', 'NoSQL'],
  },
  {
    title: 'DevOps & Tools',
    items: ['Git', 'Docker', 'Kubernetes', 'Linux', 'Figma', 'Jupyter', 'TensorFlow', 'Pandas'],
  },
];

const bars = [
  { label: 'Web Development', pct: 88 },
  { label: 'Backend & APIs', pct: 75 },
  { label: 'Data & ML', pct: 65 },
  { label: 'Cybersecurity', pct: 60 },
  { label: 'DevOps / Infra', pct: 55 },
];

export default function Skills() {
  const barsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.skill-fill');
            const pct = entry.target.dataset.pct;
            if (fill) fill.style.width = pct + '%';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    barsRef.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills">
      <div className="skills-inner">
        <div className="section-label mono">
          <span>02</span> — tech skills
        </div>

        <div className="skills-grid">
          <div className="skills-left">
            <h2 className="serif skills-heading">
              My<br /><em>stack</em>
            </h2>

            <div className="skill-bars">
              {bars.map((b, i) => (
                <div
                  key={b.label}
                  className="skill-bar-row"
                  data-pct={b.pct}
                  ref={el => barsRef.current[i] = el}
                >
                  <div className="skill-bar-meta">
                    <span>{b.label}</span>
                    <span className="mono">{b.pct}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div className="skill-fill" style={{ width: 0 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="skills-right">
            {techGroups.map(g => (
              <div key={g.title} className="tech-group">
                <h3 className="mono tech-group-title">{g.title}</h3>
                <div className="tech-tags">
                  {g.items.map(item => (
                    <span key={item} className="tech-tag">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
