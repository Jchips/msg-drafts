import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './Main.scss';
import MsgDrafts from './Drafts/MsgDrafts';
// import OnlineDrafts from './Drafts/OnlineDrafts';

const Main = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div className='main container'>
      {isAuthenticated ? (
        <MsgDrafts/>
        // <OnlineDrafts/>
      ) :
        <p>Log in to view your drafts!</p>
      }
    </div>
  );
}

export default Main;
