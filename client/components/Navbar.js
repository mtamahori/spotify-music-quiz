import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';
import { Menu } from 'semantic-ui-react';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className="navbar">
  {
    isLoggedIn ? (
    <Menu className="navbar-buttons" fluid widths={2}>
      <Menu.Item as={Link} to="/home">Home</Menu.Item>
      <Menu.Item onClick={handleClick}>Logout</Menu.Item>
    </Menu>
  ) : (

    <Menu className="navbar-buttons" fluid widths={2}>
      <Menu.Item as={Link} to="/">Landing</Menu.Item>
      <Menu.Item as={Link} to="/login">Login</Menu.Item>
    </Menu>
    )
  }
  </div>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
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
