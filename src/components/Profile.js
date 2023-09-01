import React from "react";
import { Card } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

// Code from Auth0
const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated ? (
      <Card className='profile-card' style={{ width: '18rem' }}>
        <Card.Img variant="top" src={user.picture} />
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>
            {user.email}
          </Card.Text>
        </Card.Body>
      </Card>
    ) :
    <Card className='profile-card text-center' style={{ width: '18rem' }}>
      <Card.Body>Please log in to view</Card.Body>
    </Card>
  );
};

export default Profile;