import { useEffect } from 'react';
import './CertModal.css';

export default function CertModal({ cert, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} data-hover>
          <span>✕</span>
        </button>

        <div className="modal-header mono">
          <span className="modal-tag">certificate</span>
        </div>

        <div className="modal-img-wrap">
          {cert.image ? (
            <img src={cert.image} alt={cert.label} className="modal-img" />
          ) : (
            <div className="modal-placeholder">
              <div className="modal-placeholder-icon">📜</div>
              <p className="mono">Certificate image coming soon</p>
              <p className="mono modal-placeholder-sub">{cert.label}</p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <h3 className="serif modal-title">{cert.label}</h3>
          {cert.issuer && (
            <p className="mono modal-issuer">{cert.issuer}</p>
          )}
        </div>
      </div>
    </div>
  );
}
