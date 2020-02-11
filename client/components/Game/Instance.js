import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecentTracks } from '../../store';
import { List, Button } from 'semantic-ui-react';

class Instance extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="instance">
        <h3>INSTANCE</h3>
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

const mapDispatch = ({ getRecentTracks })

export default connect(mapState, mapDispatch)(Instance);
