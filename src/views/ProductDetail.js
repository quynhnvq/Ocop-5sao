import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/detail.scss";
import ImageGallery from 'react-image-gallery';

import AOS from 'aos';
import 'aos/dist/aos.css';

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: true,
      error: null,
      isLoaded: false,
      product_detail: {},
      manufacturer: {},
      ratings: [],
      comment_name:'',
      comment_phone:'',
      comment_text:'',
      image_product: '',
    };
  }

  render_star(num) {
    let stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(<img src="/images/star-icon.png" alt="icon" />);
    }
    return stars;
  }

  changeTab = (tab) => {
    this.setState(
      {
        tab: tab,
      },
      () => console.log(this.state)
    );
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  componentDidMount() {
    fetch(
      `https://api.ocopvietnam.gov.vn/v1/public/product-info/${this.props.match.params.id}/?ocop_star=5`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            product_detail: result,
            manufacturer: result.manufacturer,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );

    fetch(
      `https://api.ocopvietnam.gov.vn/v1/public/product-info/${this.props.match.params.id}/rating`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            ratings: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
    console.log(JSON.stringify(this.state));
    AOS.init({
      delay: 200,
      duration: 800
    });
  }

  onChangeName(e) {
    const name = e.target.value;
    this.setState(() => ({
      comment_name: name,
    }))
  }

  onChangePhone(e) {
    const phone = e.target.value;
    this.setState(() => ({
      comment_phone: phone,
    }))
  }

  onChangeText(e) {
    const text = e.target.value;
    this.setState(() => ({
      comment_text: text,
    }))
  }

  Form() {
    return (
      <form className="form">
        <div className="form__row">
          <input onChange={e => this.onChangeName(e)} type="text" placeholder="Họ và Tên..."  />
          <input onChange={e => this.onChangePhone(e)} type="phone" placeholder="Số điện thoại" />
        </div>
        <div className="form__row">
          <textarea onChange={e => this.onChangeText(e)} placeholder="Nhận xét" />
        </div>
        <div className="form__row">
          <button onClick={() => this.postComment()} type="submit">Nhận xét</button>
        </div>
      </form>
    );
  }

  

  postComment() {
    fetch(
      `https://api.ocopvietnam.gov.vn/v1/public/product-rating/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_rate: this.state.product_detail.id,
          fullname: this.state.comment_name,
          phone_number: this.state.comment_phone,
          rate_description: this.state.comment_text,
        })
      }
    );
  }

  Comment() {
    const listItems = this.state.ratings.map((rating, index) => (
      <li>
        <p className="name">{rating.fullname}</p>
        <p className="detail">{rating.rate_description}</p>
      </li>
    ));
    return (
      <div className="comment-list">
        <ul>{listItems}</ul>
      </div>
    );
  }

  render() {
    const production_image = [
      {
        original: `${this.state.product_detail.production_image1}`,
        thumbnail: `${this.state.product_detail.production_image1}`,
      },
      {
        original: `${this.state.product_detail.production_image2}`,
        thumbnail: `${this.state.product_detail.production_image2}`,
      },
      {
        original: `${this.state.product_detail.production_image3}`,
        thumbnail: `${this.state.product_detail.production_image3}`,
      },
      {
        original: `${this.state.product_detail.production_image4}`,
        thumbnail: `${this.state.product_detail.production_image4}`,
      },
    ];
    const images = [
      {
        original: `${this.state.product_detail.image}`,
        thumbnail: `${this.state.product_detail.image}`,
      },
      {
        original: `${this.state.product_detail.image1}`,
        thumbnail: `${this.state.product_detail.image1}`,
      },
      {
        original: `${this.state.product_detail.image2}`,
        thumbnail: `${this.state.product_detail.image2}`,
      },
      {
        original: `${this.state.product_detail.image3}`,
        thumbnail: `${this.state.product_detail.image3}`,
      },
      {
        original: `${this.state.product_detail.image4}`,
        thumbnail: `${this.state.product_detail.image4}`,
      },

    ];
    return (
      <div className="detail">
        <Header />
        <div className="banner">
          <a href="http://ocop.gov.vn/">
            <img className="banner" src="/images/banner.png" alt="banner" />
          </a>
        </div>
        <div className="main">
          <Container>
            <Row>
              <Col xs={12} md={9}>
                <div className="product" data-aos="fade-up">
                  <Container fluid>
                    <Row xs={1} md={2}>
                      <Col className="product__image">
                        <div className="image">
                          <div className="image__big">
                            <ImageGallery items={images} showNav={false} showPlayButton={false} autoPlay={true} slideInterval={4000} showFullscreenButton={false} />
                          </div>
                        </div>
                      </Col>
                      <Col className="product__about">
                        <div className="about">
                          <h1>{this.state.product_detail.name}</h1>
                          <div className="box__rating">
                            {this.render_star(this.state.product_detail.ocop_star)}
                          </div>
                          <p style={{ textAlign: "justify", marginTop: 20, }}>
                            {this.state.product_detail.description}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <div className="story">
                  <div className="section" data-aos="fade-up">
                    <h2 className="section__title">CƠ SỞ SẢN XUẤT</h2>
                    <div className="section__content">
                      <div className="about__detail">
                        <p className="about__row">
                          <span className="about__name">Cơ sở sản xuất: </span>
                          <span className="about__value">
                            {this.state.manufacturer.name}
                          </span>
                        </p>
                        <p className="about__row">
                          <span className="about__name">Người đại diện: </span>
                          <span className="about__value">
                            {this.state.manufacturer.representative}
                          </span>
                        </p>
                        <p className="about__row">
                          <span className="about__name">Địa chỉ: </span>
                          <span className="about__value">
                            {this.state.manufacturer.address}
                          </span>
                        </p>
                        <p className="about__row">
                          <span className="about__name">Số điện thoại: </span>
                          <span className="about__value">
                            {this.state.manufacturer.phone_number}
                          </span>
                        </p>
                        <p className="about__row">
                          <span className="about__name">Email: </span>
                          <span className="about__value">
                            {this.state.manufacturer.email}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="section" data-aos="fade-up">
                    <h2 className="section__title">CÂU CHUYỆN SẢN PHẨM</h2>
                    <div className="section__content">
                      <p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: this.state.product_detail.story,
                        }}
                      />
                      </p>
                    </div>
                  
                  </div>
                  <div className="section" data-aos="fade-up">
                    <h2 className="section__title">THÔNG TIN SẢN PHẨM</h2>
                    <div className="section__content">
                      <p>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: this.state.product_detail.information,
                        }}
                      />
                      </p>
                    </div>
                  </div>
                  <div className="section" data-aos="fade-up">
                    <h2 className="section__title">VĂN BẰNG/CHỨNG NHẬN</h2>
                    <div className="section__content">
                      <p>
                        Giấy chứng nhận số : {" "}
                        <span className="about__value">{this.state.product_detail.ocop_certificate_number}</span>
                      </p>
                      <p>
                        Ngày cấp: {" "}
                        <span className="about__value">{this.state.product_detail.issued_on}</span> 
                        </p>
                      <p>
                        Ngày hết hạn chứng nhận: {" "}
                        <span className="about__value">{this.state.product_detail.expiry_date}</span>
                      </p>
                      <p>
                        <img
                          src={this.state.product_detail.certificate_img}
                          alt="hinhanh"
                        />
                      </p>
                    </div>
                  </div>
                  <div className="section carousel" data-aos="fade-up">
                    <h2 className="section__title">HÌNH ẢNH SẢN XUẤT</h2>
                    <div className="section__content">
                      <div className="carousel__main">
                        <div className="carousel__big">
                          <ImageGallery items={production_image} autoPlay={true} showPlayButton={false} showNav={false} slideInterval={2500} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="section comment" data-aos="fade-up">
                    <h2 className="section__title">ĐÁNH GIÁ</h2>
                    <div className="section__content">
                      <ul className="tab">
                        <li
                          className={this.state.tab == true ? "active" : ""}
                          onClick={() => this.changeTab(true)}
                        >
                          Viết đánh giá
                        </li>
                        <li
                          className={this.state.tab == false ? "active" : ""}
                          onClick={() => this.changeTab(false)}
                        >
                          Nhận xét
                        </li>
                      </ul>
                      <div className="tab-content">
                        {this.state.tab == true ? this.Form() : this.Comment()}
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={20} md={3} className="right">
                <div data-aos="fade-up">
                <a href="http://ocop.gov.vn/">
                  <img className="right-banner" src="/images/hinhanh-7.png" alt="right banner" />
                </a>
                </div>
                <div data-aos="fade-up">
                <a href="https://drive.google.com/file/d/1Fts8eyhqgTVKbAmXFAR0Kh-eiC3Rk6Gr/view?usp=sharing">
                  <img style={{ marginTop: 20,}} className="right-banner" src="/images/so_tay_hoi_dap.png" alt="right banner" />
                </a>
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
