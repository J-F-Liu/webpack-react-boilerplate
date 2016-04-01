import React, {Component, PropTypes} from 'react';
import Piece from './Piece';
import App from './App';

export default class Layout extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
    <div>
      <h1>
        {App.pieces.map((piece, i) => <Piece key={i} {...piece} />).insertSeparator('+')}
      </h1>
      <p>
        {this.props.children}
      </p>
    </div>);
  }
}
