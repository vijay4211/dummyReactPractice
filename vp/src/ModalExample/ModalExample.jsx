

import React from 'react';
import useModal from './useModal';
export default function ModalExample() {
  const { isOpen, open, close } = useModal();
  return (
    <div>
      <button onClick={open}>Show Modal</button>
      {isOpen && (
        <div className="modal">
          <p>This is a modal!</p>
          <button onClick={close}>Close</button>
        </div>
      )}
    </div>
  );
}