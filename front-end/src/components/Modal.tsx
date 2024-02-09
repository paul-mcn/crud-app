import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { MouseEvent, MouseEventHandler } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
	children: React.ReactNode;
	onClickOutside?: MouseEventHandler;
	onClickExit?: MouseEventHandler;
};

const Modal = (props: ModalProps) => {
	return createPortal(
		<>
			<div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg z-[9998]">
				<div className="relative">
					<div className="absolute top-2 right-3 z-[9999]">
						<FontAwesomeIcon
							icon={faClose}
							className="text-gray-800 text-lg cursor-pointer hover:opacity-50 transition-opacity"
							onClick={props.onClickExit}
						/>
					</div>
					{props.children}
				</div>
			</div>
			<div
				className="fixed inset-0 bg-black/40 z-[9997] overflow-hidden"
				onClick={props.onClickOutside}
			></div>
		</>,
		document.body,
	);
};

export default Modal;
