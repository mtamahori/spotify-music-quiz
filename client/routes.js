import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { me } from './store'
import { Landing, Login, Main } from './components'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/game" component={Main} />
        {isLoggedIn && (
          <Switch>
            <Route exact path="/game" component={Main} />
          </Switch>
        )}
        <Route exact path="/landing" component={Landing} />
      </Switch>
    )
  }
}

const mapState = state => {
  // return {
  //   isLoggedIn: !!state.user.id
  // }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}


export default withRouter(connect(mapState, mapDispatch)(Routes));

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
