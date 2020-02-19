import React from 'react';
import { List } from 'semantic-ui-react';

const Tracklist = (props) => {

    const { randomTracks } = props;
    return (
      <div className="trackList">
      {
        (randomTracks[0] !== undefined) ?
        <List>
          <List.Item>{randomTracks[0].name}</List.Item>
          <List.Item>{randomTracks[1].name}</List.Item>
          <List.Item>{randomTracks[2].name}</List.Item>
          <List.Item>{randomTracks[3].name}</List.Item>
          <List.Item>{randomTracks[4].name}</List.Item>
        </List>
        :
        <h3>LOADING</h3>
      }
      </div>
    )
}

export default Tracklist;
