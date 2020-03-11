import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateScore, updateUser } from '../../store';
import { List, Button, Loader, Message, Form } from 'semantic-ui-react';

class Tracklist extends Component {
    constructor(props) {
      super(props);

      this.state = {
        answerBool: null
      }

      this.handleSelect = this.handleSelect.bind(this);

    }

    handleSelect = (event, data) => {
      event.preventDefault();
      let { currentTrack, user, instanceScore, updateUser, updateScore } = this.props;
      let selectedTrack = data.children[0];
      let correctTrack = currentTrack.name;

      let newInstanceScore = instanceScore;
      let newInstanceRounds = ++instanceScore.rounds;
      newInstanceScore.rounds = newInstanceRounds;

      let newUser = user.user;
      let newUserRounds = ++user.user.rounds;
      newUser.rounds = newUserRounds;

      if (selectedTrack === correctTrack) {
        console.log('CORRECT!')
        this.setState({ answerBool: true })

        setTimeout(() => {
          this.setState({ answerBool: null })
        }, 1000)

        const { player } = this.props;
        const pauseParams = ({ playerInstance: player })
        axios
          .post('/api/spotify/pause', pauseParams)
          .catch(err => console.error('Pausing track unsuccessful', err))

        let newInstanceCorrect = ++instanceScore.correct;
        let newUserCorrect = ++user.user.correct;
        newInstanceScore.correct = newInstanceCorrect;
        newUser.correct = newUserCorrect;
        updateScore(newInstanceScore)
        updateUser(newUser)
      }

      else {
        console.log('INCORRECT!')
        this.setState({ answerBool: false })

        setTimeout(() => {
          this.setState({ answerBool: null })
        }, 1000)

        ++newInstanceRounds;
        ++newUserRounds;
      }
    }

    render() {
      const { randomTracks } = this.props;
      return (
        <div className="trackList">
        {
          (randomTracks[0] !== undefined) ?
          <Form success={this.state.answerBool === true} error={this.state.answerBool === false}>
            <Form.Button onClick={(event, data) => this.handleSelect(event, data)}>
              {randomTracks[0].name} - {randomTracks[0].artists[0].name}
            </Form.Button>
            <Form.Button onClick={(event, data) => this.handleSelect(event, data)}>
              {randomTracks[1].name} - {randomTracks[1].artists[0].name}
            </Form.Button>
            <Form.Button onClick={(event, data) => this.handleSelect(event, data)}>
              {randomTracks[2].name} - {randomTracks[2].artists[0].name}
            </Form.Button>
            <Form.Button onClick={(event, data) => this.handleSelect(event, data)}>
              {randomTracks[3].name} - {randomTracks[3].artists[0].name}
            </Form.Button>
            <Form.Button onClick={(event, data) => this.handleSelect(event, data)}>
              {randomTracks[4].name} - {randomTracks[4].artists[0].name}
            </Form.Button>
            <Message success header="Correct!"/>
            <Message error header="Nope!"/>
          </Form>
          :
          <Loader active inline="centered">Loading Tracks</Loader>
        }
        </div>
      )
    }
}

const mapState = ({ user, instanceScore }) => ({ user, instanceScore });

const mapDispatch = ({ updateScore, updateUser })

export default connect(mapState, mapDispatch)(Tracklist);
