import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Landing from '../components/landing';

import {  } from '../actions/index';

class App extends Component {

  componentWillMount() {
  }

  render() {
    return (
      <MuiThemeProvider>
        <Landing/>
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(
    { },
    dispatch)
);

export default connect(null, mapDispatchToProps)(App);
