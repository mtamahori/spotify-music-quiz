import React, { Component } from 'react';
import { connect } from 'react-redux';
import Script from 'react-load-script';
import { addPlayer } from '../../store';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {
      scriptLoaded: false,
    }

    this.handleLoadSuccess = this.handleLoadSuccess.bind(this);
    this.tokenCallback = this.tokenCallback.bind(this);
  }

  componentDidMount() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.handleLoadSuccess();
    }
  }

  handleLoadSuccess() {
    const { user, addPlayer } = this.props;
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

    addPlayer(player);

    console.log('PLAYER INSTANCE', player)

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

  render() {
    return (
      <div className="home">

        <h2>It's the iPod Music Quiz, but for your Spotify Library</h2>

        <div className="player">
          <Script
            url="https://sdk.scdn.co/spotify-player.js"
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}
          />
        </div>

        <Button as={Link} to='/instance'>Play!</Button>

      </div>
    )
  }
}

const mapState = ({ user }) => ({ user })

const mapDispatch = ({ addPlayer })

export default connect(mapState, mapDispatch)(Home);
