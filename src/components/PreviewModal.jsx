import { useEffect, useRef } from "react";
import "../styles/PreviewModal.css";
export default function PreviewModal({ isOpen, onClose, clickPost, onDelete }) {
  const modalRef = useRef();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
		document.addEventListener("keydown", handleEscape);
		return () => {
			document.removeEventListener("keydown", handleEscape);
		};
  }, [onClose]);
	const handleOutsideClick = (e) => {
		if (modalRef.current && !modalRef.current.contains(e.target)) {
			onClose();
		}
	};
  if (!isOpen || !clickPost) return null;
  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div className="modal-content-preview" ref={modalRef}>
        <button onClick={onClose} className="closeBtn">
          ❌
        </button>
        <img src={clickPost.src} alt={clickPost.alt} className="previewImage" />
        <p>{clickPost.alt}</p>
        <button onClick={() => onDelete(clickPost.id)} className="deleteBtn">
          Delete
        </button>
      </div>
    </div>
  );
}
