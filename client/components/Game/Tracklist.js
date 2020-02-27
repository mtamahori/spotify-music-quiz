import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateScore, updateUser } from '../../store';
import { List, Button } from 'semantic-ui-react';

class Tracklist extends Component {
    constructor(props) {
      super(props);

      this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect = (event, data) => {
      event.preventDefault();
      let { currentTrack, user, instanceScore, updateUser, updateScore } = this.props;
      let selectedTrack = data.children[0];
      let correctTrack = currentTrack.name;

      if (selectedTrack === correctTrack) {
        console.log('CORRECT!')
        let newInstanceCorrect = instanceScore.correct + 1;
        let newInstanceRounds = instanceScore.rounds + 1;
        let newInstanceScore = instanceScore;
        newInstanceScore.correct = newInstanceCorrect;
        newInstanceScore.rounds = newInstanceRounds;
        updateScore(newInstanceScore)

        let newUserCorrect = user.user.correct + 1;
        let newUserRounds = user.user.rounds + 1;
        let newUser = user.user;
        newUser.correct = newUserCorrect;
        newUser.rounds = newUserRounds;
        console.log('NEW USER', newUser)
        updateUser(newUser)
      }

      else {
        console.log('NOPE')
      }
    }

    render() {
      const { randomTracks } = this.props;
      return (
        <div className="trackList">
        {
          (randomTracks[0] !== undefined) ?
          <List selection={true}>
            <List.Item
              as={Button}
              onClick={(event, data) => this.handleSelect(event, data)}>
                {randomTracks[0].name} - {randomTracks[0].artists[0].name}
            </List.Item>
            <List.Item
              as={Button}
              onClick={(event, data) => this.handleSelect(event, data)}>
                {randomTracks[1].name} - {randomTracks[1].artists[0].name}
            </List.Item>
            <List.Item
              as={Button}
              onClick={(event, data) => this.handleSelect(event, data)}>
                {randomTracks[2].name} - {randomTracks[2].artists[0].name}
            </List.Item>
            <List.Item
              as={Button}
              onClick={(event, data) => this.handleSelect(event, data)}>
                {randomTracks[3].name} - {randomTracks[3].artists[0].name}
            </List.Item>
            <List.Item
              as={Button}
              onClick={(event, data) => this.handleSelect(event, data)}>
                {randomTracks[4].name} - {randomTracks[4].artists[0].name}
            </List.Item>
          </List>
          :
          <h3>LOADING</h3>
        }
        </div>
      )
    }
}

const mapState = ({ user, instanceScore }) => ({ user, instanceScore });

const mapDispatch = ({ updateScore, updateUser })

export default connect(mapState, mapDispatch)(Tracklist);
