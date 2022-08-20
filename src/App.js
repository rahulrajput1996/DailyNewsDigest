import "./App.css";

import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export class App extends Component {
  pageSize = "12";
  apikey = process.env.REACT_APP_NEWS_APP_API_KEY;
  state = {
    progress: 0,
  };
  setProgress = (progress) => {
    this.setState({ progress: progress });
  };
  render() {
    return (
      <div>
        <BrowserRouter>
          <LoadingBar
            color="#b30808"
            progress={this.state.progress}
            height={5}
          />
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  key="general"
                  pageSize={this.pageSize}
                  apikey={this.apikey}
                  category="general"
                  country="in"
                />
              }
            />
            <Route
              path="/entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  key="entertainment"
                  pageSize={this.pageSize}
                  apikey={this.apikey}
                  category="entertainment"
                  country="in"
                />
              }
            />
            <Route
              path="/sports"
              element={
                <News
                  setProgress={this.setProgress}
                  key="sports"
                  pageSize={this.pageSize}
                  apikey={this.apikey}
                  category="sports"
                  country="in"
                />
              }
            />
            <Route
              path="/technology"
              element={
                <News
                  setProgress={this.setProgress}
                  key="technology"
                  pageSize={this.pageSize}
                  apikey={this.apikey}
                  category="technology"
                  country="in"
                />
              }
            />
            <Route
              path="/business"
              element={
                <News
                  setProgress={this.setProgress}
                  key="business"
                  pageSize={this.pageSize}
                  apikey={this.apikey}
                  category="business"
                  country="in"
                />
              }
            />
            <Route
              path="/science"
              element={
                <News
                  setProgress={this.setProgress}
                  key="science"
                  pageSize={this.pageSize}
                  apikey={this.apikey}
                  category="science"
                  country="in"
                />
              }
            />
            <Route
              path="/health"
              element={
                <News
                  setProgress={this.setProgress}
                  key="health"
                  pageSize={this.pageSize}
                  apikey={this.apikey}
                  category="health"
                  country="in"
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
