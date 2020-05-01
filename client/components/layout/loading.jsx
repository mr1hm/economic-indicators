import React, { Component } from 'react';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <main className="loading-container container">
        <section className="row loading-spinner justify-content-center align-items-center">
          <div id="spinner" className="col d-flex justify-content-center">
            Pulling Data...
          </div>
        </section>
      </main>
    );
  }
}
