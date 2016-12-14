// @flow

import React, { Component } from 'react'
import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';

var axios = require('axios');

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

class RootContainer extends Component {

  fetchAlbums() {
    let serverURL = "http://localhost:8080/fetchAlbums";

    return new Promise((resolve, reject) => {
      axios.get(serverURL).then((response) => {
        resolve(response);
      });
    });
  }

  fetchAlbum(albumId) {
    let serverURL = "http://localhost:8080/fetchAlbum";

    return new Promise( (resolve, reject) => {
      axios.get(serverURL, {
        params: { albumId }
      }).then( (response) => {
        resolve(response);
      });
    })

  }
  handleListAlbums() {

    console.log("handleListAlbums invoked");
    let promise = this.fetchAlbums();
    promise.then( (response) => {
      this.parseAlbumFeedsResponse(response.data.feed);
    }, (reason) => {
      console.log("promise.then failed", reason);
    });
  }

  parseAlbumFeedsResponse(feed) {

    for (let album of feed.entry) {
      console.log("Album: ", album.title[0]._);

      const title = album.title[0]._;
      const id = album["gphoto:id"][0];
      const numPhotos = album["gphoto:numphotos"][0];
      const timestamp = album["gphoto:timestamp"][0];
      const mediaGroup = album["media:group"][0];
      const published = album["published"][0];
      const dateTimeUpdated = album["updated"][0];

      console.log(title);
      console.log(id);
      console.log(numPhotos);
      console.log(timestamp);
      console.log(mediaGroup);
      console.log(published);
      console.log(dateTimeUpdated);
    }
  }

  handleFetchAlbum() {
    console.log("handleFetchAlbum invoked");
    let promise = this.fetchAlbum("6157781148956998593");
    promise.then( (response) => {
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

export default RootContainer;