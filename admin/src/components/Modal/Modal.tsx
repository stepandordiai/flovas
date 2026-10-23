import "./styles.scss";

type ModalProps = {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
	// TODO: learn this (can't do animations or smooth effects)
	if (!open) return null;

	return (
		<div className="modal">
			<div className="modal__backdrop" onClick={onClose}></div>
			<div className="modal__content">{children}</div>
		</div>
	);
}
