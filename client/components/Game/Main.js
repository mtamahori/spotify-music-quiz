import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="main">
        <h2>MAIN GAME VIEW</h2>
        <Button as={Link} to="/instance">Play!</Button>
      </div>
    )
  }

}

export default Main;
