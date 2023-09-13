import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const DeleteConfirmation = (props) => {
  const { showDeleteModal, setShowDeleteModal, removeDraft, draft} = props;

  const closeModal = () => {
    setShowDeleteModal(false);
  }

  const deleteDraft = () => {
    removeDraft(draft);
    closeModal();
  }

  return (
    <Modal show={showDeleteModal}>
      <Modal.Header>Delete</Modal.Header>
      <Modal.Body>
        <p>Are you sure you wanna delete?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={closeModal}>Close</Button>
        <Button variant='danger' onClick={() => deleteDraft()}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmation;
