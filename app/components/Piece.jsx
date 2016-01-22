import React, {Component, PropTypes} from 'react';

export default class Piece extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  };

  state = {active: false};

  handleMouseOver = () => {
    this.setState({active: true});
  };

  handleMouseOut = () => {
    this.setState({active: false});
  };

  render() {
    if (this.state.active){
      return <a href={this.props.link} onMouseOut={this.handleMouseOut}>{this.props.name}</a>;
    }else{
      return <span onMouseOver={this.handleMouseOver}>{this.props.name}</span>;
    }
  }
}
