import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, description, imageurl, newsurl, author, time, sources } =
      this.props;
    return (
      <div className="my-3">
        <div className="card" style={{ border: "1px solid black" }}>
          <img src={imageurl} alt="" className="card-img-top my-0" />
          <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-danger text-bg-danger"
            style={{ left: "50%", zIndex: 1 }}
          >
            {sources}
          </span>
          <div className="card-body">
            <h5 className="card-title fw-bold">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-danger fw-bold">
                By {author} at {new Date(time).toLocaleString()}
              </small>
            </p>
            <a
              href={newsurl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm btn-primary d-flex justify-content-center"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
