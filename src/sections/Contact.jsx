import './Contact.css';

const links = [
  { label: 'Email', value: 'alisa.programmerhack@gmail.com', href: 'mailto:alisa.programmerhack@gmail.com' },
  { label: 'LinkedIn', value: '/in/alisa-biliavska-9a771b349', href: 'https://www.linkedin.com/in/alisa-biliavska-9a771b349' },
  { label: 'GitHub', value: 'github.com/AlisaBel1', href: 'https://github.com/AlisaBel1' },
  { label: 'Phone', value: '+370 642 62733', href: 'tel:+37064262733' },
];

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact-inner">
        <div className="section-label mono">
          <span>04</span> — contact
        </div>

        <div className="contact-grid">
          <div className="contact-left">
            <h2 className="serif contact-heading">
              Let's build<br />
              <em>something</em>
            </h2>
            <p className="contact-sub">
              Open to internships, part-time collaborations,
              and interesting freelance projects. Always happy
              to chat about tech, ideas, and opportunities.
            </p>

            <a
              href="mailto:alisa.programmerhack@gmail.com"
              className="contact-cta"
              data-hover
            >
              Say hello ↗
            </a>
          </div>

          <div className="contact-links">
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="contact-link"
                data-hover
              >
                <span className="mono contact-link-label">{l.label}</span>
                <span className="contact-link-value">{l.value}</span>
                <span className="contact-link-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>

        <div className="contact-footer mono">
          <span>© 2025 Alisa Biliavska</span>
          <span>Built with React · Three.js</span>
          <span>Kaunas, Lithuania</span>
        </div>
      </div>
    </section>
  );
}
