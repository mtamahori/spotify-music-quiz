import React from 'react';
import { List, Button } from 'semantic-ui-react';

const Tracklist = (props) => {

    const { randomTracks } = props;
    const select = (event, data) => {
      event.preventDefault();
      let trackName = data.children[0];
      let artistName = data.children[2]
      console.log('trackName', trackName)
      console.log('artistName', artistName)
    }
    return (
      <div className="trackList">
      {
        (randomTracks[0] !== undefined) ?
        <List selection={true}>
          <List.Item
            as={Button}
            onClick={(event, data) => select(event, data)}>
              {randomTracks[0].name} - {randomTracks[0].artists[0].name}
          </List.Item>
          <List.Item
            as={Button}
            onClick={(event, data) => select(event, data)}>
              {randomTracks[1].name} - {randomTracks[1].artists[0].name}
          </List.Item>
          <List.Item
            as={Button}
            onClick={(event, data) => select(event, data)}>
              {randomTracks[2].name} - {randomTracks[2].artists[0].name}
          </List.Item>
          <List.Item
            as={Button}
            onClick={(event, data) => select(event, data)}>
              {randomTracks[3].name} - {randomTracks[3].artists[0].name}
          </List.Item>
          <List.Item
            as={Button}
            onClick={(event, data) => select(event, data)}>
              {randomTracks[4].name} - {randomTracks[4].artists[0].name}
          </List.Item>
        </List>
        :
        <h3>LOADING</h3>
      }
      </div>
    )
}

export default Tracklist;
