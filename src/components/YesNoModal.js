import React, { useState, useEffect } from 'react';
import './modal.scss';

export default function YesNoModal({ show, onClose, onSave, fileName})
{
  if (!show) {
    return null;
  }

  const handleYes = () =>
  {
    onSave(fileName);
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Do you indeed want to delete this file?</h2>
        <div className="modal-actions">
          <button onClick={onClose}>No</button>
          <button onClick={handleYes}>
            Yes, delete!
          </button>
        </div>
      </div>
    </div>
  );
}