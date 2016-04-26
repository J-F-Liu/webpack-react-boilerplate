import React, {Component} from 'react';
import {Router, Route, browserHistory} from 'react-router';
import Layout from './Layout';
import Logo from './Logo';

export default class App extends Component {
  static pieces = [
    {name: 'Webpack', link: 'http://webpack.github.io/', logo: 'Webpack.gif'},
    {name: 'React', link: 'http://facebook.github.io/react/', logo: 'React.svg'},
    {name: 'Babel', link: 'http://babeljs.io/', logo: 'Babel.png'},
    {name: 'Sass', link: 'http://sass-lang.com/', logo: 'Sass.svg'},
  ];

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Layout}>
          <Route path="/:name" component={Logo} />
        </Route>
      </Router>
    );
  }
}
