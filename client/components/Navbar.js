import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { Menu } from 'semantic-ui-react';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="navbar">
  {isLoggedIn ? (
    <Menu className="navbar-buttons" fluid widths={2}>
      <Menu.Item as={Link} to="/game">Game</Menu.Item>
      <Menu.Item onClick={handleClick} position="right">Logout While Logged In</Menu.Item>
    </Menu>
  ) : (

    <Menu className="navbar-buttons" fluid widths={2}>
    <Menu.Item onClick={handleClick} position="right">Logout Regardless</Menu.Item>
    <Menu.Item as={Link} to="/landing">Landing</Menu.Item>
    </Menu>
  )}
  </div>
)

const mapState = state => {
  // return {
  //   isLoggedIn: !!state.user.id
  // }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
