import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../history'
import Script from 'react-load-script';
import axios from 'axios';
import { fetchTracks, fetchMoreTracks, removeTracks } from '../../store';
import { Tracklist, Buttons, Score } from '../';

class Instance extends Component {
  constructor(props){
    super(props)

    this.state = {
      scriptLoaded: false,
      player: {},
      currentCorrect: 0,
      currentRounds: 0
    }

    this.handleLoadSuccess = this.handleLoadSuccess.bind(this);
    this.tokenCallback = this.tokenCallback.bind(this);
    this.handleFetchTracks = this.handleFetchTracks.bind(this);
    this.handleFetchMoreTracks = this.handleFetchMoreTracks.bind(this);
    this.handleEndGame = this.handleEndGame.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  componentDidMount() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.handleLoadSuccess();
    }
    this.handleFetchTracks('RecentlyPlayedTracks')
    this.handleFetchMoreTracks('TopTracks')
    this.handleFetchMoreTracks('SavedTracks')
    this.handleFetchMoreTracks('SavedAlbums')
  }

  handleLoadSuccess() {
    const { user } = this.props;
    this.setState({ scriptLoaded: true });
    console.log('SPOTIFY SDK SCRIPT LOAD SUCCESS');
    const token = user.access;
    const player = new window.Spotify.Player({
      name: 'Spotify Music Quiz Player',
      getOAuthToken: callback => { callback(token) }
    })

    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    player.addListener('player_state_changed', state => {
      console.log(state);
    });

    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });

    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    player.connect();

    this.setState({ player });
  }

  tokenCallback(token) {
    return token;
  }

  handleScriptCreate() {
    this.setState({ scriptLoaded: false });
    console.log("Script created");
  }

  handleScriptError() {
    this.setState({ scriptError: true });
    console.log("Script error");
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true });
    console.log("Script loaded");
  }

  handleFetchTracks(type) {
    const { fetchTracks } = this.props;
    fetchTracks(type);
  }

  handleFetchMoreTracks(type) {
    const { fetchMoreTracks } = this.props;
    fetchMoreTracks(type);
  }

  handleEndGame(event) {
    event.preventDefault();
    const { removeTracks } = this.props;
    removeTracks();
    history.push('/home')
  }

  handlePlay(event) {
    event.preventDefault();
    const { player } = this.state;
    const playParams = ({
      playerInstance: player,
      spotify_uri: 'spotify:track:5B4r3ByjXsuuSSju6Ht5rf'
    })
    return (
      axios
        .post('/api/spotify/play', playParams)
        .catch(err => console.error('Playing track unsuccessful', err))
    )
  }

  handlePause(event) {
    event.preventDefault();
    const { player } = this.state;
    const pauseParams = ({ playerInstance: player })
    return (
      axios
        .post('/api/spotify/pause', pauseParams)
        .catch(err => console.error('Pausing track unsuccessful', err))
    )
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

    const { user, tracks } = this.props;
    const { currentCorrect, currentRounds } = this.state;
    // let randomTracks = [];
    // let randomTrackIndexes = this.shuffle(tracks.length);
    // console.log('random track indexes', randomTrackIndexes)
    // for (let i = 0; i < 5; i++) {
    //   randomTracks.push(tracks[randomTrackIndexes[i]])
    // }

    return (
      <div className="instance">

        <h2>GAME INSTANCE</h2>

        <div className="player">
          <Script
            url="https://sdk.scdn.co/spotify-player.js"
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}
          />
        </div>

        <Tracklist
          randomTracks={tracks}
        />

        <Buttons
          handlePlay={this.handlePlay}
          handlePause={this.handlePause}
          handleEndGame={this.handleEndGame}
        />

        <Score
          user={user}
          currentCorrect={currentCorrect}
          currentRounds={currentRounds}
        />

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

const mapDispatch = ({ fetchTracks, fetchMoreTracks, removeTracks })

export default connect(mapState, mapDispatch)(Instance);
