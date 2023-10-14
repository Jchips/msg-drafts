import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './Drafts.scss';
import axios from 'axios';
import DraftPost from './DraftPost/DraftPost';
import { Button } from 'react-bootstrap';
import AddNewDraft from './DraftPost/DraftModals/AddNewDraft';
import EditNewDraft from './DraftPost/DraftModals/EditNewDraft';

const MsgDrafts = () => {
  const [drafts, setDrafts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDraft, setSelectedDraft] = useState({});
  const { getIdTokenClaims } = useAuth0();

  /**
   * Gets the user's jwt so that it can be verified in the Axios request.
   * @returns {Object} - Config object used to put jwt in Axios request.
   */
  const getJWT = async () => {
    const res = await getIdTokenClaims();
    const jwt = res.__raw;

    const config = {
      headers: {'Authorization': `Bearer ${jwt}`}
    }
    return config;
  }
  
  // Fetches all the drafts the user has created.
  const getDrafts = async () => {
    let requestURL = `${process.env.REACT_APP_SERVER}/message-drafts`;
    
    try {
      const allDrafts = await axios.get(requestURL, await getJWT());
      setDrafts(allDrafts.data.reverse());
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Adds new draft to the database as long as user is verified.
   * @param {Object} draftToAdd - The draft to be added to the database
   */
  const addDraft = async (draftToAdd) => {
    let requestURL = `${process.env.REACT_APP_SERVER}/message-drafts`;
    try {
      const addedDraft = await axios.post(requestURL, draftToAdd, await getJWT());
      let draftsCopy = [...drafts];
      draftsCopy.unshift(addedDraft);
      setDrafts(draftsCopy);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Edits a selected draft in the database as long as the user is verified.
   * @param {Object} drafttoEdit - The parts of the draft object to be edited.
   */
  const editDraft = async (drafttoEdit) => {
    let requestURL = `${process.env.REACT_APP_SERVER}/message-drafts/${selectedDraft._id}`;
    try {
      let editedDraft = await axios.patch(requestURL, drafttoEdit, await getJWT());
      let draftsCopy = [...drafts];
      draftsCopy.splice(draftsCopy.indexOf(selectedDraft), 1, editedDraft);
      setDrafts(draftsCopy);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * Removes selected draft from the database as long as user is verified.
   * @param {Object} draft - The draft to be removed from the database.
   */
  const removeDraft = async (draft) => {
    let requestURL = `${process.env.REACT_APP_SERVER}/message-drafts/${draft._id}`;
    try {
      await axios.delete(requestURL, await getJWT());
      let draftsCopy = [...drafts];
      draftsCopy.splice(draftsCopy.indexOf(draft), 1);
      setDrafts(draftsCopy);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getDrafts();
  });

  return (
    <div className='msg-drafts drafts'>
      <h2>Message Drafts</h2>

      <section className='drafts-scroller'>
        {drafts &&
          drafts.map((draft, index) =>
            <DraftPost 
            draft={draft}
            key={index}
            removeDraft={removeDraft}
            setShowEditModal={setShowEditModal}
            setSelectedDraft={setSelectedDraft}/>
          )
        }
      </section>

      <div className="add-btn-container text-center">
        <Button className='add-btn' onClick={() => setShowAddModal(true)}>+</Button>
      </div>

      <AddNewDraft 
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        addDraft={addDraft} />

      <EditNewDraft 
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        editDraft={editDraft}
        selectedDraft={selectedDraft}
      />
    </div>
  );
}

export default MsgDrafts;
