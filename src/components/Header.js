import React from 'react';
import MyNav from './MyNav';
import LoginButton from './Login';
import LogoutButton from './Logout';
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <header className='header'>
      <MyNav/>
      {isAuthenticated ? <LogoutButton variant='danger' /> : <LoginButton/>}
    </header>
  );
}

export default Header;
