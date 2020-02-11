import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecentTracks, me } from '../../store';
import { List, Button } from 'semantic-ui-react';

class Instance extends Component {
  constructor(props){
    super(props)

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const { me, user } = this.props;
    me();
  }

  render() {
    return (
      <div className="instance">
        <h3>INSTANCE</h3>
        <Button onClick={(event) => this.handleClick(event)}>GET ME</Button>
      </div>
    )
  }

}

const mapState = ({ user, tracks }) => {
  return {
    user,
    tracks
  }
}

const mapDispatch = ({ getRecentTracks, me })

export default connect(mapState, mapDispatch)(Instance);
