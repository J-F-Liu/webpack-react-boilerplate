import React, {Component} from 'react';
import PropTypes from 'prop-types';
import App from './App';

export default class Logo extends Component {
  static propTypes = {
    params: PropTypes.shape({
      name: PropTypes.string
    })
  };

  state = {link: '', image: ''};

  componentDidMount() {
    this.loadLogo(this.props.params.name);
  }

  componentWillReceiveProps(nextProps) {
    const name = nextProps.params.name;
    if (name !== this.props.params.name) {
      this.loadLogo(name);
    }
  }

  loadLogo(name) {
    const piece = App.pieces.find(p => p.name === name);
    const imageUrl = require(`../images/${piece.logo}`);
    this.setState({link: piece.link, image: imageUrl});
  }

  render() {
    return <a href={this.state.link}><img src={this.state.image} /></a>;
  }
}
