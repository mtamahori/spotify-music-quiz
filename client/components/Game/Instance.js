import React, { Component } from 'react';
import { connect } from 'react-redux';
import Script from 'react-load-script';
import axios from 'axios';
import { fetchTracks, removeTracks } from '../../store';
import { List, Button } from 'semantic-ui-react';

class Instance extends Component {
  constructor(props){
    super(props)

    this.state = {
      scriptLoaded: false,
      player: {}
    }

    this.handleLoadSuccess = this.handleLoadSuccess.bind(this);
    this.tokenCallback = this.tokenCallback.bind(this);
    this.handleFetchTracks = this.handleFetchTracks.bind(this);
    this.handleRemoveTracks = this.handleRemoveTracks.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
  }

  componentDidMount() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.handleLoadSuccess();
    }
  }

  handleLoadSuccess() {
    const { user } = this.props;
    this.setState({ scriptLoaded: true });
    console.log('SCRIPT LOAD SUCCESS');
    const token = user.access;
    const player = new window.Spotify.Player({
      name: 'Spotify Music Quiz Player',
      getOAuthToken: callback => { callback(token) }
    })
    console.log('PLAYER', player)

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

  handleFetchTracks(event, type) {
    event.preventDefault();
    const { fetchTracks } = this.props;
    fetchTracks(type);
  }

  handleRemoveTracks(event) {
    event.preventDefault();
    const { removeTracks } = this.props;
    removeTracks()
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

  render() {
    const { user } = this.props;
    return (
      <div className="instance">
        <h3>INSTANCE</h3>
        <Button onClick={(event) => this.handleFetchTracks(event, 'RecentlyPlayedTracks')}>RECENTLY PLAYED</Button>
        <Button onClick={(event) => this.handleFetchTracks(event, 'TopTracks')}>TOP TRACKS</Button>
        <Button onClick={(event) => this.handleFetchTracks(event, 'TopArtists')}>TOP ARTISTS</Button>
        <Button onClick={(event) => this.handleFetchTracks(event, 'SavedTracks')}>SAVED TRACKS</Button>
        <Button onClick={(event) => this.handleFetchTracks(event, 'SavedAlbums')}>SAVED ALBUMS</Button>
        <div className="player">
        <div className="player"></div>
          <Script
            url="https://sdk.scdn.co/spotify-player.js"
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}
          />
        </div>
        <Button onClick={(event) => this.handlePlay(event)}>PLAY</Button>
        <Button onClick={(event) => this.handlePause(event)}>PAUSE</Button>
        <Button onClick={(event) => this.handleRemoveTracks(event)}>RESET TRACKS</Button>
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
