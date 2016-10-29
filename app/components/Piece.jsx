import React, {Component, PropTypes} from 'react';

export default class Piece extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  };

  state = {active: false};

  handleMouseOver = () => {
    this.setState({active: true});
  };

  handleMouseOut = () => {
    this.setState({active: false});
  };

  handleClick = () => {
    this.props.onClick(this.props.name, this.props.link, this.props.logo);
  };

  render() {
    if (this.state.active) {
      return <a onMouseOut={this.handleMouseOut} onClick={this.handleClick}>{this.props.name}</a>;
    } else {
      return <span onMouseOver={this.handleMouseOver}>{this.props.name}</span>;
    }
  }
}
