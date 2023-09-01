import React from 'react';
import { Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import './DraftPost.scss';

const DraftPost = (props) => {
  const { draft, removeDraft, setShowEditModal, setSelectedDraft} = props;

  /**
   * Shows the edit modal so that user can edit their draft.
   * @param {Object} draft - The draft that was clicked to be edited.
   */
  const showEditModalAndSelectPost = (draft) => {
    setShowEditModal(true);
    setSelectedDraft(draft);
  }

  /**
   * Takes the date created from the Date.now() method and formats it in way 
   * that's easier to read.
   * @param {Date} date - The date and time the draft was created in an ugly, hard-to-read format
   * @returns {String} - The date and time the draft was created in a readable format 
   */
  const formatDate = (date) => {
    let timeElapsed = new Date(date);
    let formattedDate = timeElapsed.toLocaleDateString('en-us', { weekday: "short", year: "numeric", month: "short", day: "numeric" });
    let formattedTime = timeElapsed.toLocaleTimeString('en-US', { hour: "numeric", minute: "2-digit" });
    return formattedDate + ' @ ' + formattedTime;
  }

  return (
    <Card style={{ width: '35rem' }} className='draft-post'>
      <Card.Header>
        <Card.Title>{draft.title}</Card.Title>
        <div>
          <FaEdit className='edit-btn' onClick={() => showEditModalAndSelectPost(draft)}/>
          <FaTrash className='trash-btn' onClick={() => removeDraft(draft)} />
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text>{draft.text}</Card.Text>
      </Card.Body>
      <Card.Footer>{formatDate(draft.dateCreated)}</Card.Footer>
    </Card>
  );
}

export default DraftPost;