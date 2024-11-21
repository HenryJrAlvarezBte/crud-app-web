import React, { Children, useEffect, useRef } from 'react';
import '../App.css';

function Modal({ isOpen, setIsOpen, children }) {
	const modalRef = useRef();

	useEffect(() => {
		const modalClose = (e) => {
			if (modalRef.current && !modalRef.current.contains(e.target)) {
				setIsOpen(false);
			}
		};

		window.addEventListener('mousedown', modalClose);

		return () => {
			window.removeEventListener('mousedown', modalClose);
		};
	}, [modalRef]);

	return (
		<div className={`modal ${isOpen ? 'modal__open' : ''}`}>
			<div className="modal__overlay" onClick={() => setIsOpen(false)}></div>
			<div className="modal__container" ref={modalRef}>
				{children}
			</div>
		</div>
	);
}

export default Modal;
