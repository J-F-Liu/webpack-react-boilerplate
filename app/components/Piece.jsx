import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class Piece extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
  };

  state = {active: false};

  handleMouseOver = () => {
    this.setState({active: true});
  };

  handleMouseOut = () => {
    this.setState({active: false});
  };

  render() {
    if (this.state.active) {
      return <Link to={this.props.name} onMouseOut={this.handleMouseOut} activeStyle={{color: 'red'}}>{this.props.name}</Link>;
    } else {
      return <span onMouseOver={this.handleMouseOver}>{this.props.name}</span>;
    }
  }
}
