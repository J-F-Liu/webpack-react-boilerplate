import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default function Logo(props) {
  const {name, link, image} = props;
  return <a href={link}><img src={image} alt={name} /></a>;
}

Logo.propTypes = {
  name: PropTypes.string,
  link: PropTypes.string,
  image: PropTypes.string,
};
