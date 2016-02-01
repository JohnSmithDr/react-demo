'use strict';

import 'bootstrap/dist/css/bootstrap.css'
import './component.css';
import React from 'react';
import { Button } from 'react-bootstrap';

export default class Hello extends React.Component {
  render() {
    return (
      <div>
        <h1 className="red">Hello World 101</h1>
        <Button bsStyle="primary">Click ME !!!</Button>
      </div>
    );
  }
}