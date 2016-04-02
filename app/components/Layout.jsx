import React, {PropTypes} from 'react';
import Piece from './Piece';
import App from './App';

export default function Layout(props) {
  return (
    <div>
      <h1>
        {App.pieces.map((piece, i) => <Piece key={i} {...piece} />).insertSeparator('+')}
      </h1>
      <p>
        {props.children}
      </p>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node
};
