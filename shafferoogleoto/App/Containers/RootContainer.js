// @flow

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';

var axios = require('axios');

import { addAlbum } from "../store/albums";

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

  parseAlbumsFeedResponse(feed) {

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

      this.props.addAlbum(album);
    }
  }


  handleListAlbums() {

    console.log("handleListAlbums invoked");
    let promise = this.fetchAlbums();
    promise.then( (response) => {
      this.parseAlbumsFeedResponse(response.data.feed);
    }, (reason) => {
      console.log("promise.then failed", reason);
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

  parseAlbumPhoto(photo) {
    console.log("")

    console.log("photo: ", photo.title[0]._);

    // photoInfo will include:
    //    height
    //    medium
    //    type
    //    url
    //    width
    const photoInfo = photo["media:group"][0]["media:content"][0].$;

    // thumbnails for photo in the array
    //    photo["media:group"][0]["media:thumbnail"]
    console.log(photoInfo);

  }
  parseAlbumFeedResponse(feed) {
    console.log("Parse album: ", feed.title[0]._);
    console.log("Last updated: ", feed.updated[0]);
    console.log("Number of photos in the album is: ", Number(feed["gphoto:numphotos"][0]));
    feed.entry.forEach( (photo) => {
      this.parseAlbumPhoto(photo);
    })
  }

  handleFetchAlbum() {
    console.log("handleFetchAlbum invoked");
    let promise = this.fetchAlbum("6157781148956998593");
    promise.then( (response) => {
      this.parseAlbumFeedResponse(response.data.feed);
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

// const mapStateToProps = (state) => ({
//   app: state.app,
//   recentFiles: state.app.recentFiles
// });

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addAlbum,
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(RootContainer);
