import React, {Component} from 'react';
import Piece from './Piece';
import Logo from './Logo';

export default class App extends Component {
  static pieces = [
    {name: 'Webpack', link: 'http://webpack.github.io/', logo: 'Webpack.gif'},
    {name: 'React', link: 'http://facebook.github.io/react/', logo: 'React.svg'},
    {name: 'Babel', link: 'http://babeljs.io/', logo: 'Babel.png'},
    {name: 'Sass', link: 'http://sass-lang.com/', logo: 'Sass.svg'},
  ];

  loadLogo = (link, imageName) => {
    const image = require(`../images/${imageName}`);
    this.refs.logo.setState({link, image});
  };

  render() {
    return (
      <div>
        <h1>
          {App.pieces.map((piece, i) => <Piece key={i} {...piece} clicked={this.loadLogo} />).insertSeparator('+')}
        </h1>
        <p>
          <Logo ref="logo" />
        </p>
      </div>
    );
  }
}
