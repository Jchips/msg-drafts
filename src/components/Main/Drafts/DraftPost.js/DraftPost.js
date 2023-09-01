import React, { useRef } from 'react';
import { Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaCopy } from 'react-icons/fa';
import './DraftPost.scss';

const DraftPost = (props) => {
  const { draft, removeDraft, setShowEditModal, setSelectedDraft} = props;
  const textareaRef = useRef(null);

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

  // Copies the text to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(textareaRef.current.innerText);
  }

  return (
    <Card style={{ maxWidth: '35rem' }} className='draft-post'>
      <Card.Header>
        <Card.Title>{draft.title}</Card.Title>
        <div>
          <FaCopy className='copy-btn' onClick={() => copyToClipboard()} title='copy' />
          <FaEdit className='edit-btn' onClick={() => showEditModalAndSelectPost(draft)} title='edit' />
          <FaTrash className='trash-btn' onClick={() => removeDraft(draft)} title='delete' />
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Text ref={textareaRef}>{draft.text}</Card.Text>
      </Card.Body>
      <Card.Footer>{formatDate(draft.dateCreated)}</Card.Footer>
    </Card>
  );
}

export default DraftPost;
