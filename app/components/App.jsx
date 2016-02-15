import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Piece from './Piece';
import Logo from './Logo';

class Layout extends Component {
  render() {
    return <div>
      <h1>
        {App.pieces.map((piece,i) => <Piece key={i} {...piece} />).insertSeparator("+")}
      </h1>
      <p>
        {this.props.children}
      </p>
    </div>;
  }
}

export default class App extends Component {
  static pieces = [
    {name: "Webpack", link: "http://webpack.github.io/", logo: "Webpack.gif"},
    {name: "React", link: "http://facebook.github.io/react/", logo: "React.svg"},
    {name: "Babel", link: "http://babeljs.io/", logo: "Babel.png"},
    {name: "Sass", link: "http://sass-lang.com/", logo: "Sass.svg"},
  ];

  render() {
    return (
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <Route path="/:name" component={Logo} />
      </Route>
    </Router>);
  }
}
