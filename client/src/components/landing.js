import React, { Component } from 'react';

import RaisedButton from 'material-ui/RaisedButton';

class Landing extends Component {

  render() {

    const style = {
      margin: 12,
    };

    return (
      <div>
        <RaisedButton
          label="Pizza"
          style={style}
        />
      </div>
    );
  }
}

export default Landing;
