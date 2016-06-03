import React from 'react';
import {Route} from 'react-router';
import './lib';

import Layout from './components/Layout';
import Logo from './components/Logo';

export default (
  <Route path="/" component={Layout}>
    <Route path="/:name" component={Logo} />
  </Route>
);
