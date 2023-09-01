import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const EditNewDraft = (props) => {
  const { showEditModal, setShowEditModal, selectedDraft, editDraft} = props;

  // Closes modal
  const handleClose = () => {
    setShowEditModal(false);
  }

  /**
   * Handles when the use submits the edit form.
   * Doesn't need email or date created properties in object because it's a patch request.
   * @param {Event} e - Submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // prevents instant refresh
    let form = e.target;
    let formData = new FormData(form);
    let editedDraft = Object.fromEntries(formData.entries());
    editedDraft.title = editedDraft.title || selectedDraft.title;
    editedDraft.text = editedDraft.text || selectedDraft.text;
    editDraft(editedDraft);

    handleClose();
  }
  return (
    <Modal className="draft-modal" show={showEditModal} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Edit draft</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control type='text' name='title' placeholder={selectedDraft.title} maxLength={20} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="text">
        <Form.Label>Draft</Form.Label>
        <Form.Control as="textarea" rows={10} name='text' defaultValue={selectedDraft.text} />
      </Form.Group>
      <Button variant='primary' type='submit'>Add</Button>
    </Form>
    </Modal.Body>
  </Modal>
  );
}

export default EditNewDraft;
