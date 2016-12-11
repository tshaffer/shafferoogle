/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';

var axios = require('axios');

export default class shafferoogleoto extends Component {

  constructor(props) {
    super(props);
    this.food = 'pizza';
  }

  fetchAlbums() {
    let serverURL = "http://localhost:8080/fetchAlbums";

    return new Promise((resolve, reject) => {
      axios.get(serverURL).then((data) => {
        resolve(data);
      });
    });
  }

  fetchAlbum(albumId) {
    let serverURL = "http://localhost:8080/fetchAlbum";

    return new Promise( (resolve, reject) => {
      axios.get(serverURL, {
        params: { albumId }
      }).then( (data) => {
        resolve(data);
      });
    })

  }
  handleListAlbums() {

    console.log("handleListAlbums invoked");
    let promise = this.fetchAlbums();
    promise.then( (data) => {
      console.log("promise.then invoked");
    }, (reason) => {
      console.log("promise.then failed", reason);
    });
  }

  handleFetchAlbum() {
    console.log("handleFetchAlbum invoked");
    let promise = this.fetchAlbum();
    promise.then( (data) => {
      console.log("promise.then invoked");
    }, (reason) => {
      console.log("promise.then failed", reason);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Button
          onPress={this.handleListAlbums.bind(this)}
          title="List Albums"
          color="#841584"
        />
        <Button
          onPress={this.handleFetchAlbum.bind(this)}
          title="Fetch Album"
          color="#841584"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('shafferoogleoto', () => shafferoogleoto);
