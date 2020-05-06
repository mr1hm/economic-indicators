import React, { Component } from 'react';

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <footer className="footer-container container-fluid">
        <section className="row">
          <div className="col d-flex">
            <h1 className="footer-title">Footer</h1>
          </div>
        </section>
        <section className="row">
          <div className="col d-flex">
            <i className="far fa-copyright copyright-icon"></i>
          </div>
        </section>
      </footer>
    );
  }
}
