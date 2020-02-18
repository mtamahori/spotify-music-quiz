import React, { Component } from 'react';
import { List } from 'semantic-ui-react';

class Tracklist extends Component {
  constructor(props) {
    super(props)

    this.shuffle = this.shuffle.bind(this);
  }

  componentDidMount() {

  }

  shuffle(max) {

    function randomInt(max) {
      return Math.floor(Math.random() * Math.floor(max))
    }

    let randomArr = [];

    while (randomArr.length < 5) {
      let currentRandom = randomInt(max)
      console.log(currentRandom)
      if (randomArr.indexOf(currentRandom) === -1) {
        randomArr.push(currentRandom)
      }
    }
    return randomArr;
  }

  render() {
    const { tracks } = this.props;
    // let randomTracks = [];
    // let randomTrackIndexes = this.shuffle(tracks.length);
    // console.log('random track indexes', randomTrackIndexes)
    // for (let i = 0; i < 5; i++) {
    //   randomTracks.push(tracks[randomTrackIndexes[i]])
    // }

    return (
      <div className="trackList">
      {
        (tracks[0] !== undefined) ?
        <List>
          <List.Item>{tracks[0].name}</List.Item>
          <List.Item>{tracks[1].name}</List.Item>
          <List.Item>{tracks[2].name}</List.Item>
          <List.Item>{tracks[3].name}</List.Item>
          <List.Item>{tracks[4].name}</List.Item>
        </List>
        :
        <h3>LOADING</h3>
      }
      </div>
    )
  }
}

export default Tracklist;
