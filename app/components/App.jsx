import React, {Component} from 'react';
import Piece from './Piece';

export default class App extends Component {
  static pieces = [
    {name: "Webpack", link: "http://webpack.github.io/"},
    {name: "React", link: "http://facebook.github.io/react/"},
    {name: "Babel", link: "http://babeljs.io/"},
    {name: "Sass", link: "http://sass-lang.com/"},
  ];

  render() {
    return (
      <h1>
        {App.pieces.map((piece,i) => <Piece key={i} {...piece} />).insertSeparator("+")}
      </h1>
    );
  }
}
