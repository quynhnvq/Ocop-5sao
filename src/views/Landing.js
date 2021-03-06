import React, { Component, useState } from "react";
import Slider from "react-slick";
import { Row, Col, Container } from "reactstrap";
import Footer from "../components/Footer";
// import GoogleTranslate from '../components/TranslateBar';
import "../styles/landing.scss";
import ReactPlayer from "react-player";

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

import CountUp from "react-countup";

import AliceCarousel from 'react-alice-carousel';
import Slide1 from "../components/Slide1";
import Slide2 from '../components/Slide2';

import MapChart from "../components/MapChart";
import ReactTooltip from "react-tooltip";

import _ from 'lodash';


const itemSlideCarousel = [
  <Slide1 />,
  <Slide2 />
];


export default class Landingpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: true,
      error: null,
      isLoaded: false,
      statistic: {},
      news: [],
      news_count: 0,
      news_pagi_active: 0,
      image: [],
      image_count: 0,
      image_pagi_active: 0,
      hot_product: [],
      best_product: {},
      photoIndex: 0,
      isOpen: false,
      listslide: [],
      product_type: 'true',
      test_count: 0,
      content: "",
    };
    this.state.statistic.city = 0;
    this.state.statistic.product = 0;
    this.state.statistic.product_five_star = 0;
    this.state.statistic.manufacturer = 0;
    this.state.content = "";
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
      window.scrollTo(0, 0);
    }
  }

  changeProductTypeNational() {
    this.setState(() => ({
      product_type: 'true',
      hot_product: []
    }));
    setTimeout(() => this.getNewSlideProduct(), 50);
  }

  changeProductTypeLocal() {
    this.setState(() => ({
      product_type: 'false',
      hot_product: []
    }));
    setTimeout(() => this.getNewSlideProduct(), 50);
  }

  getNewSlideProduct() {
    fetch(`https://api.ocopvietnam.gov.vn/v1/public/product-info/?is_national=${this.state.product_type}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          let first = result.results[1];
          this.setState({
            isLoaded: true,
            test_count: result.count,
            hot_product: result.results,
            best_product: first,
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

  listSlideProduct() {
    return (
      <>
        <Container>
          <Row >
            <Col>
              <div className="bg" data-aos="fade-up">
                {this.render_hot_product_detail(this.state.best_product)}
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="slideProduct" >
            <AliceCarousel
              mouseTracking
              items={this.state.listslide}
              autoPlay={true}
              disableDotsControls={true}
              disableButtonsControls={true}
              infinite={true}
              autoPlayInterval={5000}
              responsive={{
                0: { items: 1 },
                568: { items: 2 },
                768: { items: 3 },
                1024: { items: 4 },
              }}
            />
          </Row>
        </Container>
      </>);
  }

  render_hot_product_detail(product) {
    return (
      <div className="product">
        <Row>
          <Col xs={12} md={6} xl={6}>
            <img
              onClick={() => {
                if (_.get(product,'ocop_star', 0) == 5)
                  this.props.history.push(`/detail/${_.get(product, 'id', )}`);
              }}
              src={_.get(product, 'image', )}
              alt="best product"
            />
          </Col>
          <Col xs={12} md={6} xl={6}>
            <p
              onClick={() => {
                if (_.get(product,'ocop_star', 0) == 5)
                  this.props.history.push(`/detail/${_.get(product, 'id', )}`);
              }}
              className="product-name">
              {_.get(product, 'name',)}
            </p>
            <div className="product-star">{this.render_star(_.get(product, 'ocop_star', ))}</div>
            <p className="product-detail">{_.get(product, 'story', )}</p>
            <Row className="button-detail">
              <button
                onClick={() => {
                  if (_.get(product,'ocop_star', 0) == 5)
                    this.props.history.push(`/detail/${_.get(product, 'id', )}`);
                }}
              >
                Chi ti???t {'>>'}
              </button>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }

  componentDidMount() {
    fetch("https://api.ocopvietnam.gov.vn/v1/public/statistic/", {
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
            statistic: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
    fetch("https://api.ocopvietnam.gov.vn/v1/public/news/", {
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
            news: result.results,
            news_count: result.count,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
    fetch("https://api.ocopvietnam.gov.vn/v1/public/media-path/", {
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
            image: result.results,
            image_count: result.count,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );

    fetch(`https://api.ocopvietnam.gov.vn/v1/public/product-info/?is_national=${this.state.product_type}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          let first = result.results[1];
          this.setState({
            isLoaded: true,
            test_count: result.count,
            hot_product: result.results,
            best_product: first,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );

    AOS.init({
      delay: 200,
      duration: 800
    });

    window.addEventListener("scroll", this.handleScroll);

  }

  componentWillUnmount() {
    // window.removeEventListener('scroll');
  }

  handleScroll = () => {
    if (window.pageYOffset > 80) {
      if (!this.state.nav) {
        this.setState({ nav: true });
      }
    } else {
      if (this.state.nav) {
        this.setState({ nav: false });
      }
    }

  }

  changePagiNews(i) {
    this.setState({
      news_pagi_active: i,
    });
  }

  backPagiNews() {
    if (this.state.news_pagi_active > 0)
      this.setState({
        news_pagi_active: this.state.news_pagi_active - 1,
      });
  }

  nextPagiNews() {
    if (this.state.news_pagi_active < Math.round(this.state.news_count / 3) - 1)
      this.setState({
        news_pagi_active: this.state.news_pagi_active + 1,
      });
  }

  changePagiImage(i) {
    this.setState({
      image_pagi_active: i,
    });
  }

  backPagiImage() {
    if (this.state.image_pagi_active > 0)
      this.setState({
        image_pagi_active: this.state.image_pagi_active - 1,
      });
  }

  nextPagiImage() {
    if (this.state.image_pagi_active < Math.round(this.state.image_count / 4) - 1)
      this.setState({
        image_pagi_active: this.state.image_pagi_active + 1,
      });
  }

  changeBestProduct(i) {
    this.setState({
      best_product: i,
    });
  }

  render_star(num) {
    let stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(<img src="/images/yellow-star.png" alt="icon" />);
    }
    return stars;
  }



  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
    };
    const { photoIndex, isOpen } = this.state;
    console.log(this.state.image);
    this.state.listslide = [];
    this.state.hot_product.map((product, index) => (
      this.state.listslide[index] =
      <Col xs={12} md={12} xl={12} className="list-product">
        <div className="box" key={index} onClick={() => this.changeBestProduct(product)}>
          <img src={product ? product.image : ""} alt="product" className="product-img" />
          <div className="detail">
            <p>{product ? product.name : ""}</p>
            <div className="rating">{this.render_star(product ? product.ocop_star : 0)}</div>
            <div> </div>
          </div>
        </div>
      </Col>
    ))

    return (
      <>
        {/* <GoogleTranslate /> */}
        <div className="landing">
          <div className={`nav ${this.state.nav && 'scrolled'}`}>
            <Container>
              <a href="#" className="logo">
                <img src="/images/logo-ntm.png" alt="logo" />
              </a>
              <div className="menu">
                <ul>
                  <li>
                    <a href="/products">S???N PH???M</a>
                  </li>
                  <li>
                    <a href="http://ocop.gov.vn/">CH????NG TR??NH OCOP</a>
                  </li>
                </ul>
                <button>
                  <img src="/images/vietnamese.png" alt="vietnamese" />
                </button>
              </div>
            </Container>
          </div>
          <div className='hero' data-aos="fade-down">
            <AliceCarousel
              mouseTracking
              items={itemSlideCarousel}
              autoPlay={true}
              disableDotsControls={true}
              disableButtonsControls={true}
              infinite={true}
              autoPlayInterval={5000}
            />
          </div>
          <div className="landing__about">
            <Container className="about">
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <div className="about__title" data-aos="fade-up">
                        <h1>
                          GI???I THI???U V??? CH????NG TR??NH OCOP
                        </h1>
                      </div>
                      <div className="line" data-aos="fade-up" />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} md={6} xl={6} >
                      <div className="big-img">
                        <img data-aos="fade-up" src="/images/introduce-1.png" alt="gioi thieu" />
                      </div>
                      <Row className="small-img">
                        <Col xs={6} md={6} xl={6}>
                          <img data-aos="fade-up" src="/images/introduce-2.png" alt="gioi thieu" />
                        </Col>
                        <Col xs={6} md={6} xl={6}>
                          <img data-aos="fade-up" src="/images/introduce-3.png" alt="gioi thieu" />
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={12} md={6} xl={6}>
                      <div className="about__para" data-aos="fade-up">
                        <h4>Kh??i ni???m</h4>
                        <p>
                          Ch????ng tr??nh ph??t tri???n kinh t??? khu v???c n??ng th??n theo h?????ng ph??t huy n???i l???c (tr?? tu??? s??ng t???o, lao ?????ng, nguy??n li???u, v??n h??a...) v?? gia t??ng gi?? tr???, n??ng cao thu nh???p c???a c?? d??n n??ng th??n, g??p ph???n x??y d???ng n??ng th??n m???i.
                        </p>
                      </div>
                      <div className="about__para" data-aos="fade-up">
                        <h4>Tr???ng t??m</h4>
                        <p>
                          Tr???ng t??m Ch????ng tr??nh OCOP t???i Vi???t Nam l?? ph??t tri???n s???n ph???m n??ng nghi???p, phi n??ng nghi???p v?? d???ch v??? c?? l???i th??? ??? m???i ?????a ph????ng theo chu???i gi?? tr???, g???n v???i c??c ch??? th??? tham gia Ch????ng tr??nh l?? c??c th??nh ph???n kinh t??? t???p th??? (H???p t??c x??, t??? h???p t??c) v?? kinh t??? t?? nh??n (doanh nghi???p, h??? s???n xu???t)
                      </p>
                      </div>
                      <div className="about__para" data-aos="fade-up">
                        <h4>Y??u c???u ch????ng tr??nh</h4>
                        <p>
                          Ph??t huy ti???m n??ng, l???i th??? v?? truy???n th???ng c???a ?????a ph????ng ????? ph??t tri???n c??c s???n ph???m ?????c s???n c?? gi?? tr??? cao v??? kinh t??? v?? v??n h??a.
                          <br />
                          <br />
                          Ph??t huy s??? s??ng t???o v?? s???c m???nh c???ng ?????ng ????? t??? ch???c s???n xu???t v?? h??nh th??nh c??c s???n ph???m g???n v???i gi?? tr??? c???ng ?????ng.
                          <br />
                          <br />
                          Ph??t tri???n li??n k???t theo chu???i gi?? tr??? ????? n??ng cao n??ng l???c s???n xu???t v?? ph??t tri???n b???n v???ng c??c s???n ph???m h??ng h??a.
                      </p>
                      </div>
                    </Col>
                  </Row>
                </Col>

              </Row>
            </Container>
          </div>
          <div className="landing__achievement">
            <Container className="achievement">
              <Row className="h-100" >
                <Col xs={12} md={6} xl={6} className="left">
                  <h1 data-aos="fade-up">TH??NH T???U ?????T ???????C</h1>
                  <div className="line" data-aos="fade-up" />
                  <div data-aos="fade-up" >
                    <MapChart setTooltipContent={data => this.setState({ content: data })} />
                    <ReactTooltip>{this.state.content}</ReactTooltip>
                  </div>
                </Col>
                <Col xs={12} md={1} xl={1} className="center">
                </Col>
                <Col xs={12} md={5} xl={5} className="right">
                  <h1 data-aos="fade-up">TH??NH T???U ?????T ???????C</h1>
                  {/* <img src="./images/achievement.png" alt="achievement" data-aos="fade-up" /> */}
                  <Row>
                    <Col className="city" xs={12} md={12} xl={12} data-aos="fade-left">
                      <div className="box">
                        <div className="box-content">
                          <p>
                            T??? ch???c tri???n khai tr??n ph???m vi to??n qu???c
                          </p>
                          <h2>
                            <CountUp end={this.state.statistic.city} />/63
                          </h2>
                          <h3>
                            T???NH, TH??NH PH???
                          </h3>
                        </div>
                      </div>
                    </Col>
                    <Col className="product" xs={12} md={12} xl={12} data-aos="fade-right">
                      <div className="box">
                        <div className="box-content">
                          <p>
                            Ho??n thi???n ????nh gi?? ph??n h???ng
                        </p>
                          <h2>
                            <CountUp end={this.state.statistic.product} />
                          </h2>
                          <h3>
                            S???N PH???M ?????T CHU???N
                        </h3>
                        </div>
                      </div>
                    </Col>
                    <Col className="manufacturer" xs={12} md={12} xl={12} data-aos="fade-left">
                      <div className="box">
                        <div className="box-content">
                          <p>
                            H??? tr??? v?? qu???n l?? gi??m s??t
                        </p>
                          <h2>
                            <CountUp end={this.state.statistic.manufacturer} />
                          </h2>
                          <h3>
                            C?? S??? S???N XU???T
                        </h3>
                        </div>
                      </div>
                    </Col>
                    <Col className="product_five_star" xs={12} md={12} xl={12} data-aos="fade-right">
                      <div className="box">
                        <div className="box-content">
                          <p>
                            C??ng b??? v?? t??n vinh
                        </p>
                          <h2>
                            <CountUp end={this.state.statistic.product_five_star} />
                          </h2>
                          <h3>
                            S???N PH???M ?????T 5 SAO
                        </h3>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>

            </Container>
          </div>
          <div className="landing__product">
            <Container>
              <h1 data-aos="fade-up">S???N PH???M</h1>
              <div className="line" data-aos="fade-up" />
              <Row data-aos="fade-up">
                <Col>
                  <button
                    className={this.state.tab == true ? "active" : ""}
                    onClick={() => {
                      this.changeProductTypeNational();
                      this.changeTab(true);
                    }}>
                    Qu???c gia
                </button>
                  <button
                    className={this.state.tab == false ? "active" : ""}
                    onClick={() => {
                      this.changeProductTypeLocal();
                      this.changeTab(false);
                    }}>
                    ?????a ph????ng
                </button>
                </Col>
              </Row>
            </Container>
            {this.listSlideProduct()}

          </div>
          <div className="landing__gallery">
            <Container className="gallery">
              <h1 data-aos="fade-up">H??NH ???NH - VIDEO</h1>
              <div className="line" data-aos="fade-up" />
              <div className="gallery__item" data-aos="fade-up">
                <Container fluid>
                  <Row xs={1} md={2}>
                    <Col className="gallery-list" style={{ paddingRight: "0", paddingLeft: "0" }}>
                      <ReactPlayer width="100%" height="100%" url={this.state.statistic.video_path} />
                    </Col>
                    <Col className="gallery-carousel" style={{ paddingRight: "0", paddingLeft: "0" }}>
                      <ReactPlayer width="100%" height="300px" url={this.state.statistic.video_path} />
                    </Col>
                    <Col className="gallery-list" style={{}}>
                      <div className="gallery__grid">
                        {this.state.image_count != 0 && (
                          <>
                            {this.state.image.slice(this.state.image_pagi_active * 4, this.state.image_pagi_active * 4 + 4).map((images, index) => (
                              <div className="gallery__box" key={images.id} style={{ margin: 5 }} >
                                <img src={images.image} alt="image1" style={{ width: "100%" }} onClick={() => this.setState({ isOpen: true, photoIndex: this.state.image_pagi_active * 4 + index })} />
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </Col>
                    <Slider {...{ ...settings }} className="gallery-carousel" style={{ marginTop: 20 }}>
                      {this.state.image.map((images, index) => (
                        <div className="gallery__list" key={images.id}>
                          <img src={images.image} alt="image1" style={{ width: "100%", height: "300px" }} onClick={() => this.setState({ isOpen: true, photoIndex: this.state.image_pagi_active * 4 + index })} />
                        </div>
                      ))}
                    </Slider>
                    <Col></Col>
                  </Row>
                  <Row xs={1} md={2}>
                    <Col></Col>
                    <Col className="gallery-list">
                      <div className="pagination" style={{ marginTop: 0, margin: " 5px auto" }}>
                        <img onClick={() => this.backPagiImage()} src="/images/Left Arrow.png" alt="left" style={{ width: "15%" }} />
                        <div className="pagination__grid">
                          {Array(Math.round(this.state.image_count / 4))
                            .fill(0)
                            .map((v, i) => (
                              <button
                                key={i}
                                onClick={() => this.changePagiImage(i)}
                                className={`dot ${i == this.state.image_pagi_active ? "active" : null}`}
                              ></button>
                            ))}
                        </div>
                        <img onClick={() => this.nextPagiImage()} src="/images/Right Arrow.png" alt="right" style={{ width: "15%" }} />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Container>
          </div>
          <div className="landing__news">
            <Container className="news" data-aos="fade-up" >
              <h1 data-aos="fade-up">TIN T???C</h1>
              <div className="line" data-aos="fade-up" />
              {this.state.news_count != 0 && (
                <>
                  <div className="news-list" data-aos="fade-up">
                    <div className="news__item">
                      {this.state.news.slice(this.state.news_pagi_active * 3, this.state.news_pagi_active * 3 + 3).map((newss, index) => (
                        <div className="box" key={newss.id}>
                          <img src={newss.image} alt="news 1" />
                          <p className="box__title">{newss.title}</p>
                          <p className="box__content">{newss.short_content}</p>
                          <a href={newss.link}>?????c th??m</a>
                        </div>
                      ))}
                    </div>

                    <div className="pagination" style={{ marginTop: 20, margin: " 20px auto" }}>
                      <img onClick={() => this.backPagiNews()} src="/images/Left Arrow.png" alt="left" />
                      <div className="pagination__grid">
                        {Array(Math.round(this.state.news_count / 3))
                          .fill(0)
                          .map((v, i) => (
                            <button
                              key={i}
                              onClick={() => this.changePagiNews(i)}
                              className={`dot ${i == this.state.news_pagi_active ? "active" : null}`}
                            ></button>
                          ))}
                      </div>
                      <img onClick={() => this.nextPagiNews()} src="/images/Right Arrow.png" alt="right" />
                    </div>
                  </div>
                  <Slider {...{ ...settings }} className="news-carousel">
                    {this.state.news.map((newss, index) => (
                      <div className="box" key={newss.id} data-aos="fade-up">
                        <img src={newss.image} alt="news 1" />
                        <p className="box__title">{newss.title}</p>
                        <p className="box__content">{newss.short_content}</p>
                        <a href={newss.link}>?????c th??m</a>
                      </div>
                    ))}
                  </Slider>
                </>
              )}
              {isOpen && (
                <Lightbox
                  mainSrc={this.state.image[photoIndex].image}
                  nextSrc={this.state.image[(photoIndex + 1) % this.state.image.length].image}
                  prevSrc={this.state.image[(photoIndex + this.state.image.length - 1) % this.state.image.length].image}
                  onCloseRequest={() => this.setState({ isOpen: false })}
                  onMovePrevRequest={() =>
                    this.setState({
                      photoIndex: (photoIndex + this.state.image.length - 1) % this.state.image.length,
                    })
                  }
                  onMoveNextRequest={() =>
                    this.setState({
                      photoIndex: (photoIndex + 1) % this.state.image.length,
                    })
                  }
                />
              )}
            </Container>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

