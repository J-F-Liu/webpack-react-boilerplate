import React, {Component, PropTypes} from 'react';

export default class Piece extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    clicked: PropTypes.func,
  };

  state = {active: false};

  handleMouseOver = () => {
    this.setState({active: true});
  };

  handleMouseOut = () => {
    this.setState({active: false});
  };

  handleClick = () => {
    this.props.clicked(this.props.link, this.props.logo);
    return false;
  };

  render() {
    if (this.state.active) {
      return <a href="javascript:void(0)" onMouseOut={this.handleMouseOut} onClick={this.handleClick}>{this.props.name}</a>;
    } else {
      return <span onMouseOver={this.handleMouseOver}>{this.props.name}</span>;
    }
  }
}
