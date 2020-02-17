import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
      <div className="home">
        <h2>It's the iPod Music Quiz, but for your Spotify Library</h2>
        <Button as={Link} to="/instance">Play!</Button>
      </div>
    )
}

export default Home;
