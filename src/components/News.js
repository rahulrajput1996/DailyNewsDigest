import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    pageSize: "6",
    category: "sports",
    country: "us",
  };
  static propTypes = {
    pageSize: PropTypes.string,
    category: PropTypes.string,
    country: PropTypes.string,
  };
  mycapitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      pageno: 1,
      totalpage: null,
    };
    document.title = `News Digest-${this.mycapitalize(this.props.category)}`;
  }

  fetchMoreData = async () => {
    this.props.setProgress(10);

    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?language=en&country=${
        this.props.country
      }&category=${this.props.category}&apiKey=${this.props.apikey}&page=${
        this.state.pageno + 1
      }&pageSize=${this.props.pageSize}`
    );
    this.props.setProgress(30);

    let myjson = await response.json();
    this.props.setProgress(70);
    this.setState({
      articles: this.state.articles.concat(myjson.articles),
      pageno: this.state.pageno + 1,
    });
    this.props.setProgress(100);
  };

  async componentDidMount() {
    this.props.setProgress(10);
    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?language=en&country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.pageno}&pageSize=${this.props.pageSize}`
    );

    this.props.setProgress(30);
    let myjson = await response.json();
    this.props.setProgress(70);
    this.setState({
      articles: myjson.articles,
      totalpage: Math.ceil(myjson.totalResults / this.props.pageSize),
    });
    this.props.setProgress(100);
  }

  // prevbtn = async () => {
  //     if (!(this.state.pageno <= 1)) {
  //         this.props.setProgress(10);

  //         let response = await fetch(
  //             `https://newsapi.org/v2/top-headlines?language=en&country=${this.props.country
  //             }&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.pageno - 1
  //             }&pageSize=${this.props.pageSize}`
  //         );
  //         this.props.setProgress(30);
  //         this.setState({ loading: true });
  //         let myjson = await response.json();
  //         this.props.setProgress(70);
  //         this.setState({
  //             articles: myjson.articles,
  //             pageno: this.state.pageno - 1,
  //             loading: false,
  //         });
  //         this.props.setProgress(100);
  //     }
  // };

  // nextbtn = async () => {
  //     this.props.setProgress(10);

  //     let response = await fetch(
  //         `https://newsapi.org/v2/top-headlines?language=en&country=${this.props.country
  //         }&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.pageno + 1
  //         }&pageSize=${this.props.pageSize}`
  //     );
  //     this.props.setProgress(30);
  //     this.setState({ loading: true });
  //     let myjson = await response.json();
  //     this.props.setProgress(70);
  //     this.setState({
  //         articles: myjson.articles,
  //         pageno: this.state.pageno + 1,
  //         loading: false,
  //     });
  //     this.props.setProgress(100);
  // };

  render() {
    return (
      <>
        <div className="container my-3">
          <h1 className="d-flex justify-content-center">
            Daily Digest - Top {this.mycapitalize(this.props.category)}{" "}
            Headlines
          </h1>
          {/* {this.state.loading && <Spinner />} */}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.pageno !== this.state.totalpage}
            loader={this.state.loading && <Spinner />}
          >
            <div className=" container row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-sm-4" key={element.url}>
                    <Newsitem
                      title={
                        element.title == null ? "" : element.title.slice(0, 60)
                      }
                      description={
                        element.description == null
                          ? ""
                          : element.description.slice(0, 100)
                      }
                      imageurl={
                        element.urlToImage == null
                          ? "https://media.istockphoto.com/id/1181778359/vector/breaking-news-vector-background.webp?s=612x612&w=is&k=20&c=Y8u4WzJvl9zcpRmhkuLAlaT1H7Pxqhth2ISQiOQ-ros="
                          : element.urlToImage
                      }
                      newsurl={
                        element.url == null
                          ? "https://media.istockphoto.com/id/1181778359/vector/breaking-news-vector-background.webp?s=612x612&w=is&k=20&c=Y8u4WzJvl9zcpRmhkuLAlaT1H7Pxqhth2ISQiOQ-ros="
                          : element.url
                      }
                      author={
                        element.author == null ? "unknown" : element.author
                      }
                      time={element.publishedAt}
                      sources={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
        {/* <div className='container d-flex justify-content-between my-3 '>

                    <button type="button" className="btn btn-success" onClick={this.prevbtn} disabled={this.state.pageno === 1 ? true : false}>&laquo; Previous</button>

                    <button type="button" className="btn btn-success" onClick={this.nextbtn} disabled={this.state.totalpage === this.state.pageno ? true : false}>Next &raquo;</button>
                </div> */}
      </>
    );
  }
}

export default News;
