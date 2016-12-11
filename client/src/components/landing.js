import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

import axios from 'axios';

class Landing extends Component {

  handlePizza() {
    var getAlbumsUrl = "http://picasaweb.google.com/data/feed/api/user/shaffer.family";

    axios.get(getAlbumsUrl)
      .then(function (albumsResponse) {
        console.log(albumsResponse);
        console.log("success");
      })
      .catch(function (albumsError) {
        console.log(albumsError);
      });
  }

  render() {

    const style = {
      margin: 12,
    };

    return (
      <div>
        <RaisedButton
          label="Pizza"
          onClick={this.handlePizza.bind(this)}
          style={style}
        />
      </div>
    );
  }
}

export default Landing;
