import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/product.scss";

import AOS from 'aos';
import 'aos/dist/aos.css';

import ReactPaginate from 'react-paginate';


export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_info: [],
      fivestar: [],
      fivestar_count: 0,
      product_count: 13,
      filter_count: 0,
      default_product: [],
      default_count: 0,
      filter_product: [],
      filter_type: '',
      filter_star: '',
      search_param: '',
      checkboxesType: new Array(6).fill().map((_, i) => 0),
      checkboxesStar: new Array(3).fill().map((_, i) => 0),
      pageNumber: new Array(5).fill().map((_, i) => i + 1),
      product_pagi_page: 1,
      product_pagi_active: 0,
      count: 0,
      next_page: null,
    };
  }

  componentDidMount() {
    this.getNewFilterProduct();
    AOS.init({
      delay: 200,
      duration: 800
    })
  }

  changePagiProducts(i) {
    this.setState({
      product_pagi_active: i,
    });
    setTimeout(() => this.getNewFilterProduct(), 50);
  }

  backPagiProducts() {
    if (this.state.product_pagi_active > 0) {
      this.setState({
        product_pagi_active: this.state.product_pagi_active - 1,
      });
      setTimeout(() => this.getNewFilterProduct(), 50);
    }
  }
  nextPagiProducts() {
    if (this.state.product_pagi_active < Math.round(this.state.product_count / 12)) {
      this.setState({
        product_pagi_active: this.state.product_pagi_active + 1,
      });
      setTimeout(() => this.getNewFilterProduct(), 50);
    }
  }

  getParamTypeFilter(i, checked) {
    if (i == 0 && checked) return 'food';
    if (i == 1 && checked) return 'drink';
    if (i == 2 && checked) return 'herbs';
    if (i == 3 && checked) return 'cloth';
    if (i == 4 && checked) return 'keepsake';
    if (i == 5 && checked) return 'travel';
    return '';
  }

  getParamStarFilter(i, checked) {
    if (i == 0 && checked) return '5';
    if (i == 1 && checked) return '4';
    if (i == 2 && checked) return '3';
    return '';
  }

  onChangeType(e, changedIndex) {
    const { checked } = e.target;
    this.setState(state => ({
      checkboxesType: state.checkboxesType.map((_, i) => i === changedIndex ? checked : false),
    }));
    this.setState(() => ({
      filter_type: this.getParamTypeFilter(changedIndex, checked),
    }))
    setTimeout(() => this.getNewFilterProduct(), 50);
  }

  onChangeStar(e, changedIndex) {
    const { checked } = e.target;
    this.setState(state => ({
      checkboxesStar: state.checkboxesStar.map((_, i) => i === changedIndex ? checked : false),
    }));
    this.setState(() => ({
      filter_star: this.getParamStarFilter(changedIndex, checked),
    }))
    setTimeout(() => this.getNewFilterProduct(), 50);
  }

  onChangeSearchBox(e) {
    const searchText = e.target.value;
    this.setState(() => ({
      search_param: searchText,
    }))
    setTimeout(() => this.getNewFilterProduct(), 50);
  }

  getNewFilterProduct() {
    fetch(`https://api.ocopvietnam.gov.vn/v1/public/product-info/?type=${this.state.filter_type}&&ocop_star=${this.state.filter_star}&&search=${this.state.search_param}&&page_size=12&&page=${this.state.product_pagi_active + 1}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            filter_product: result.results,
            filter_count: result.count,
            product_pagi_page: Math.ceil(result.count / 12),
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  listProductFilter() {
    let listItems = [];
    this.state.filter_product.map((product, i) => (
      listItems.push(
        <div
          className="box"
          key={product.id}
          onClick={() => {
            if (product.ocop_star == 5)
              this.props.history.push(`/detail/${product.id}`);
          }}
        >
          <img
            className="box__picture"
            src={product.image}
            alt="picture"
          />
          <p className="box__name">{product.name}</p>
          <div className="box__rating">
            {this.render_star(product.ocop_star)}
          </div>
        </div>)))
    return (
      <div className="grid">{listItems}</div>
    );

  }

  getTypeFilter(i) {
    if (i == 0) return <span>Thực phẩm</span>;
    if (i == 1) return <span>Đồ uống</span>;
    if (i == 2) return <span>Thảo dược</span>;
    if (i == 3) return <span>Vải & May mặc</span>;
    if (i == 4) return <span>Lưu niệm - Nội thất</span>;
    if (i == 5) return <span>Dịch vụ du lịch</span>;
  }

  getStarFilter(i) {
    if (i == 0) return <span>5 sao</span>;
    if (i == 1) return <span>4 sao</span>;
    if (i == 2) return <span>3 sao</span>;
  }

  render_type_checkbox() {
    let listItems = [];
    this.state.checkboxesType.map((item, i) => (
      listItems.push(
        <li >
          <input
            key={i}
            type="checkbox"
            checked={item}
            onChange={e => this.onChangeType(e, i) /* notice passing an index. we will use it */}
          />
          {this.getTypeFilter(i)}
        </li>)))
    return (
      <ul>{listItems}</ul>
    );
  }

  render_star_checkbox() {
    let listItems = [];
    this.state.checkboxesStar.map((item, i) => (
      listItems.push(
        <li >
          <input
            key={i}
            type="checkbox"
            checked={item}
            onChange={e => this.onChangeStar(e, i) /* notice passing an index. we will use it */}
          />
          {this.getStarFilter(i)}
        </li>)))
    return (
      <ul>{listItems}</ul>
    );
  }

  render_star(num) {
    let stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(<img src="/images/star-icon.png" alt="icon" />);
    }
    return stars;
  }

  render_page_number() {
    let listItems = [];
    this.state.pageNumber.map((item, i) => (
      listItems.push(
        < >
          <button
            key={i}
            onClick={() => this.changePagiProducts(i)}
            className={`box ${i == this.state.product_pagi_active ? "active" : null}`}
          >{i + 1}</button>

        </>)))
    return (
      <>{listItems}</>
    );
  }

  handlePageClick = (data) => {
    this.setState({
      product_pagi_active: data.selected
    }, () => {
      this.getNewFilterProduct();
    });
  };

  render() {
    return (
      <div className="product">
        <Header />
        <div className="main">
          <Container>
            <Row>
              <Col xs={12} md={3} className="main__left" data-aos="fade-down" >
                <div className="category">
                  <p>Loại sản phẩm</p>
                  {this.render_type_checkbox()}
                </div>
                <div className="category">
                  <p>Tiêu chuẩn</p>
                  {this.render_star_checkbox()}
                </div>
              </Col>
              <Col xs={12} md={9} data-aos="fade-down">
                <div className="product-grid">
                  <div className="product-grid__header">
                    <h3>Sản phẩm </h3>
                    <div className="search">
                      <input onChange={e => this.onChangeSearchBox(e)} type="text" placeholder="Tìm kiếm" />
                      <button>
                        <img src="/images/search.png" alt="search" />
                      </button>
                    </div>
                  </div>
                  {this.listProductFilter()}

                  <div className="commentBox">
                    <ReactPaginate
                      previousLabel={'<'}
                      nextLabel={'>'}
                      breakLabel={'...'}
                      breakClassName={'break-me'}
                      pageCount={this.state.product_pagi_page}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={3}
                      onPageChange={this.handlePageClick}
                      containerClassName={'pagination'}
                      subContainerClassName={'pagespagination'}
                      nextClassName={'next'}
                      activeClassName={'active'}
                      previousClassName={'previous'}
                      disabledClassName={'disabled'}
                      pageClassName={'page'}
                      breakClassName={'break'}
                    />
                  </div>
                  {/* <div className="pagination">
                    <img onClick={() => this.backPagiProducts()} src="/images/Left Arrow.png" alt="back" />
                    <div className="pagination__grid">
                      {this.render_page_number()}
                    </div>
                    <img onClick={() => this.nextPagiProducts()} src="/images/Right Arrow.png" alt="next" />
                  </div> */}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}
