import React, {Component} from 'react';
import App from './App';

export default class Logo extends Component {

  state = {link: "", image: ""};

  loadLogo(name) {
    let piece = App.pieces.find(p => p.name == name);
    let imageUrl = require('../images/'+piece.logo);
    this.setState({link: piece.link, image: imageUrl});
  }

  componentWillReceiveProps(nextProps) {
    let name = nextProps.params.name;
    if (name !== this.props.params.name) {
      this.loadLogo(name);
    }
  }

  componentDidMount() {
    this.loadLogo(this.props.params.name);
  }

  render() {
    return <a href={this.state.link}><img src={this.state.image} /></a>;
  }
}
