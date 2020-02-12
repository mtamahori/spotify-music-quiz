import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTracks } from '../../store';
import { List, Button } from 'semantic-ui-react';
import Script from 'react-load-script';

class Instance extends Component {
  constructor(props){
    super(props)

    this.state = {
      scriptLoaded: false
    }

    this.handleLoadSuccess = this.handleLoadSuccess.bind(this);
    this.tokenCallback = this.tokenCallback.bind(this);
    this.handleFetchTracks = this.handleFetchTracks.bind(this);
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

    player.addListener('player_state_changed', state => { console.log(state); });

    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });

    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    player.connect();
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
    const { fetchTracks, user } = this.props;
    fetchTracks(type);
  }

  render() {
    const { user } = this.props;
    return (
      <div className="instance">
        <h3>INSTANCE</h3>
        <Button onClick={(event) => this.handleFetchTracks(event, 'recentlyPlayed')}>RECENTLY PLAYED TRACKS</Button>
        <div className="player">
          <Script
            url="https://sdk.scdn.co/spotify-player.js"
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}
          />
        </div>
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

const mapDispatch = ({ fetchTracks })

export default connect(mapState, mapDispatch)(Instance);
