import './Projects.css';

const projects = [
  {
    num: '01',
    title: 'TrackFlow Logistics OS',
    desc: 'Full-stack logistics management platform with shipment tracking, order management, analytics, and an interactive animated landing page. Improved operational visibility across multiple teams.',
    tags: ['React', 'Node.js', 'Vite', 'JavaScript', 'CSS', 'Vercel'],
    live: 'https://track-flow-logistics-os.vercel.app',
    github: 'https://github.com/AlisaBel1/TrackFlow-Logistics-OS',
    accent: 'var(--accent)',
  },
  {
    num: '02',
    title: 'Career Tracker',
    desc: 'Web application for tracking job applications, interview stages, and career goals in one centralized dashboard. Simplifies the job search process with structured progress monitoring.',
    tags: ['React', 'Node.js', 'Vite', 'JavaScript', 'Vercel'],
    live: 'https://career-tracker-zeta.vercel.app', 
    github: 'https://github.com/AlisaBel1/CareerTracker',
    accent: 'var(--accent2)',
  },
];

const experience = [
  {
    period: 'Dec 2025',
    company: 'JP Morgan Chase & Co',
    role: 'Software Engineering Intern',
    desc: 'Developed and maintained Java application features. Collaborated remotely via Git/GitHub, implemented and tested modules, fixed bugs, contributed to documentation. Stack: Spring, MySQL, REST APIs.',
  },
  {
    period: 'May 2025',
    company: '811 Dental Service',
    role: 'Network & IT Specialist',
    desc: 'Configured office network for a dental clinic. Set up shared file system, managed static IPs, created network drive mappings, improved overall system performance.',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="projects-inner">
        <div className="section-label mono">
          <span>03</span> — projects & experience
        </div>

        <h2 className="serif projects-heading">
          Selected<br /><em>work</em>
        </h2>

        <div className="project-list">
          {projects.map(p => (
            <div key={p.num} className="project-card">
              <div className="project-num mono" style={{ color: p.accent }}>{p.num}</div>
              <div className="project-body">
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map(t => (
                    <span key={t} className="project-tag mono">{t}</span>
                  ))}
                </div>
              </div>
              <div className="project-links">
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn-live"
                  data-hover
                >
                  Live ↗
                </a>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn-gh"
                  data-hover
                >
                  Code
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Experience */}
        <div className="exp-block">
          <h3 className="mono exp-title">// experience</h3>
          <div className="exp-list">
            {experience.map(e => (
              <div key={e.company} className="exp-item">
                <div className="exp-left">
                  <span className="mono exp-period">{e.period}</span>
                </div>
                <div className="exp-right">
                  <div className="exp-header">
                    <span className="exp-company">{e.company}</span>
                    <span className="mono exp-role">{e.role}</span>
                  </div>
                  <p className="exp-desc">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
