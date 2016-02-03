import React, {Component} from 'react';

export default class Logo extends Component {

  state = {link: "", image: ""};

  render() {
    return <a href={this.state.link}><img src={this.state.image} /></a>;
  }
}
