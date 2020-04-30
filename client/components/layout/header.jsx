import React, { Component } from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <main className="header-container container-fluid">
        <section className="row justify-content-center">
          <div className="col">
            <h1>Economic Indicators</h1>
          </div>
        </section>
      </main>
    );
  }
}
