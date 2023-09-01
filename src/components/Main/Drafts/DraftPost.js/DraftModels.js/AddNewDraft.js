import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddNewDraft = (props) => {
  const { showAddModal, setShowAddModal, addDraft } = props;

  // Closes the modal
  const handleClose = () => {
    setShowAddModal(false);
  }

  // Adds new the draft the user created. Then closes the modal.
  const handleSubmit = (e) => {
    e.preventDefault(); // prevents instant refresh
    let newDraft = {
      title: e.target.title.value,
      text: e.target.text.value,
      email: "test",
      dateCreated: Date.now()
    }
    addDraft(newDraft);
    handleClose();
  }

  return (
    <Modal className="draft-modal" show={showAddModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add new</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' placeholder='Enter a title' maxLength={20} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="text">
          <Form.Label>Draft</Form.Label>
          <Form.Control as="textarea" rows={10} placeholder='Enter text' required />
        </Form.Group>
        <Button variant='primary' type='submit'>Add</Button>
      </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddNewDraft;
