'use strict';

import 'bootstrap/dist/css/bootstrap.css'
import './component.css';
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class Hello extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showModal: false };
  }

  open() {
    this.setState({ showModal: true });
  }

  close() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div>
        <h1 className="red">Hello World 101</h1>
        <Button bsStyle="primary" onClick={this.open.bind(this)}>Click ME !!!</Button>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Hello Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>It works !!!</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}