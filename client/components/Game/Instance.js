import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../history'
import Script from 'react-load-script';
import axios from 'axios';
import { fetchTracks, removeTracks } from '../../store';
import { Tracklist, Buttons, Score } from '../';

class Instance extends Component {
  _isMounted = false;
  constructor(props){
    super(props)

    this.state = {
      scriptLoaded: false,
      tracksLoaded: false,
      player: {},
      currentCorrect: 0,
      currentRounds: 0,
    }

    this.handleLoadSuccess = this.handleLoadSuccess.bind(this);
    this.tokenCallback = this.tokenCallback.bind(this);
    this.handleFetchTracks = this.handleFetchTracks.bind(this);
    this.handleEndGame = this.handleEndGame.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.getRandomIndexes = this.getRandomIndexes.bind(this);
    this.getRandomTracks = this.getRandomTracks.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.handleLoadSuccess();
    }
    this.handleFetchTracks()
    .then(() => {
      if (this._isMounted) {
        this.setState({ tracksLoaded: true })
        console.log('tracksloaded?', this.state.tracksLoaded)
      }
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
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

  async handleFetchTracks() {
    const { fetchTracks } = this.props;
    await fetchTracks('RecentlyPlayedTracks')
    await fetchTracks('TopTracks')
    await fetchTracks('SavedTracks')
    await fetchTracks('SavedAlbums')
  }

  handleEndGame(event) {
    event.preventDefault();
    const { removeTracks } = this.props;
    removeTracks();
    history.push('/home')
  }

  handlePlay(event, spotifyUri) {
    event.preventDefault();
    const { player } = this.state;
    const playParams = ({
      playerInstance: player,
      spotify_uri: spotifyUri
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

  getRandomIndexes(arrLength, max) {
    let randomIndexes = [];
    while (randomIndexes.length < max) {
      let randomIdx = Math.floor(Math.random()*arrLength)
      if (randomIndexes.indexOf(randomIdx) === -1) {
        randomIndexes.push(randomIdx);
      }
    }
    return randomIndexes;
  }

  getRandomTracks(indexes) {
    const { tracks } = this.props;
    let randomTracks = [];
    for (let i = 0; i < indexes.length; i++) {
      randomTracks.push(tracks[indexes[i]])
    }
    return randomTracks;
  }

  render() {
    const { user, tracks } = this.props;
    const { currentCorrect, currentRounds } = this.state;
    let randomIndexes = [];
    let randomTracks = [];
    let currentTrackIndex = [];
    let currentTrack;

    this.state.tracksLoaded === true ?
    randomIndexes = this.getRandomIndexes(tracks.length, 5)
    : console.log('Waiting for all fetched tracks to dispatch to store before generating random indexes');
    console.log('RANDOM INDEXES', randomIndexes);

    randomIndexes.length ?
    randomTracks = this.getRandomTracks(randomIndexes)
    : console.log('Error pulling random tracks')
    console.log('RANDOM TRACKS', randomTracks);

    randomTracks.length ?
    currentTrackIndex = this.getRandomIndexes(randomTracks.length, 1)
    : console.log('Error selecting random track index');
    console.log('CURRENT TRACK INDEX', currentTrackIndex);

    currentTrackIndex.length ?
    currentTrack = randomTracks[currentTrackIndex]
    : console.log('Error setting current random track')
    console.log('CURRENT TRACK', currentTrack)

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
          randomTracks={randomTracks}
        />

        <Buttons
          currentTrack={currentTrack}
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

const mapDispatch = ({ fetchTracks, removeTracks })

export default connect(mapState, mapDispatch)(Instance);
