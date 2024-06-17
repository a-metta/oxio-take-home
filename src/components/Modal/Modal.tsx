import React from 'react';
import { FaRegCircleXmark } from 'react-icons/fa6';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function Modal({
  isOpen,
  onClose,
  children,
}: React.PropsWithChildren<ModalProps>) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <span
          className='close-button'
          data-testid='modal-close-button'
          onClick={onClose}
        >
          <FaRegCircleXmark />
        </span>
        {children}
      </div>
    </div>
  );
}

export default Modal;
