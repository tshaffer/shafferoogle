// @flow

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  AppRegistry,
  Button,
  Picker,
  StyleSheet,
  Text,
  View
} from 'react-native';

var axios = require('axios');

import { addAlbum } from "../store/albums";

import AlbumPicker from '../Component/albumPicker';

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

  constructor(props) {
    super(props);
    this.selectedAlbum = null;

    // this.serverUrl = "http://localhost:8080/";
    this.serverUrl = "http://192.168.0.101:8080/";

  }
  componentWillMount() {

    let promise = this.fetchAlbums();
    promise.then( (response) => {
      this.parseAlbumsFeedResponse(response.data.feed);
    }, (reason) => {
      console.log("promise.then failed", reason);
    });
  }
  
  fetchAlbums() {

    return new Promise((resolve, reject) => {
      const url = this.serverUrl + "fetchAlbums";
      axios.get(url).then((response) => {
        resolve(response);
      });
    });
  }

  parseAlbumsFeedResponse(feed) {

    for (let googleAlbum of feed.entry) {
      console.log("Album: ", googleAlbum.title[0]._);

      let album = {};
      album.title = googleAlbum.title[0]._;
      album.id = googleAlbum["gphoto:id"][0];
      album.numPhotos = googleAlbum["gphoto:numphotos"][0];
      album.timestamp = googleAlbum["gphoto:timestamp"][0];
      album.mediaGroup = googleAlbum["media:group"][0];
      album.published = googleAlbum["published"][0];
      album.dateTimeUpdated = googleAlbum["updated"][0];

      this.props.addAlbum(album);
    }

    this.selectedAlbum = feed.entry[0]["gphoto:id"][0];

  }

  launchSlideShow(albumId) {

    return new Promise((resolve, reject) => {
      const url = this.serverUrl + "launchSlideShow";
      axios.get(url, {
        params: { albumId }})
      .then((response) => {
        resolve(response);
      });
    });
  }

  // handleListAlbums() {
  //
  //   console.log("handleListAlbums invoked");
  //   let promise = this.fetchAlbums();
  //   promise.then( (response) => {
  //     this.parseAlbumsFeedResponse(response.data.feed);
  //   }, (reason) => {
  //     console.log("promise.then failed", reason);
  //   });
  // }


  // fetchAlbum(albumId) {
  //   let serverURL = "http://localhost:8080/fetchAlbum";
  //
  //   return new Promise( (resolve, reject) => {
  //     axios.get(serverURL, {
  //       params: { albumId }
  //     }).then( (response) => {
  //       resolve(response);
  //     });
  //   })
  // }

  // parseAlbumPhoto(photo) {
  //
  //   console.log("photo: ", photo.title[0]._);
  //
  //   // photoInfo will include:
  //   //    height
  //   //    medium
  //   //    type
  //   //    url
  //   //    width
  //   const photoInfo = photo["media:group"][0]["media:content"][0].$;
  //
  //   // thumbnails for photo in the array
  //   //    photo["media:group"][0]["media:thumbnail"]
  //   console.log(photoInfo);
  // }

  // parseAlbumFeedResponse(feed) {
  //   console.log("Parse album: ", feed.title[0]._);
  //   console.log("Last updated: ", feed.updated[0]);
  //   console.log("Number of photos in the album is: ", Number(feed["gphoto:numphotos"][0]));
  //   feed.entry.forEach( (photo) => {
  //     this.parseAlbumPhoto(photo);
  //   })
  // }
  //
  // handleFetchAlbum() {
  //   console.log("handleFetchAlbum invoked");
  //   let promise = this.fetchAlbum("6157781148956998593");
  //   promise.then( (response) => {
  //     this.parseAlbumFeedResponse(response.data.feed);
  //   }, (reason) => {
  //     console.log("promise.then failed", reason);
  //   });
  // }

  handleStartSlideShow() {
    console.log("handleStartSlideShow invoked");
    if (this.selectedAlbum) {
      this.launchSlideShow(this.selectedAlbum);
    }
  }

  handleSelectAlbum(album) {
    console.log("handleSelectAlbum invoked for album: ", album);
    this.selectedAlbum = album;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Shafferoogleoto!
        </Text>
        <Text style={styles.instructions}>
          Albums
        </Text>
        <AlbumPicker
          albums={this.props.albums}
          onSelectAlbum={this.handleSelectAlbum.bind(this)}
        />
        <Button
          onPress={this.handleStartSlideShow.bind(this)}
          title="Start Slide Show"
          color="#841584"
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  albums: state.albums,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addAlbum,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
