import React, { Component } from "react";

export class Spinner extends Component {
  render() {
    return (
      <div>
        <div className="text-center my-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Spinner;
