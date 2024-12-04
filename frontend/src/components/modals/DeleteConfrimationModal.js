import React from 'react';

const DeleteConfrimationModal = ({ showModal, onDelete, onCancel }) => {
  return (
    <div className={`modal ${showModal ? 'show' : ''}`}>
      <div className="modal-content">
        <h3>Are you sure you want to delete this book?</h3>
        <button onClick={onDelete}>Yes, Delete</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteConfrimationModal;
