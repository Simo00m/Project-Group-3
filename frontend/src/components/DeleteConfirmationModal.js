import React from 'react';

const DeleteConfirmationModal = ({ showModal, onDelete, onCancel }) => {
  return (
    showModal && (
      <div className="modal">
        <div className="modal-content">
          <h3>Are you sure you want to delete this book?</h3>
          <button onClick={onDelete}>Yes, Delete</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    )
  );
};

export default DeleteConfirmationModal;
