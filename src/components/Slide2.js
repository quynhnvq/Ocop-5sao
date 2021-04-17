import React from 'react';
import { Row, Col, Container } from "reactstrap";

function Slide2(props) {
    return (
        <div className="slide2">
            <Container className="container">
                <Row className="h-100">
                    <Col className='content'>
                        <Row className='mobile'>
                            <Col xs={12} md={12}>
                                <div className="title-mobile">
                                    SẢN PHẨM
                                </div>
                                <div className="img-top-mobile">
                                    <img src="./images/img-top.png" alt="san pham" />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} md={4} xl={4} className="col-1" >
                                <div className="title">
                                    SẢN PHẨM
                                </div>
                                <div className="img-1">
                                    <img src="./images/slide2-1.png" alt="san pham" />
                                </div>
                                <div className="img-2">
                                    <img src="./images/slide2-2.png" alt="san pham" />
                                </div>
                                <div className="img-3">
                                    <img src="./images/mobile-slide2-1.png" alt="san pham" />
                                </div>
                                <div className="img-4">
                                    <img src="./images/mobile-slide2-2.png" alt="san pham" />
                                </div>
                            </Col>
                            <Col xs={4} md={4} xl={4} className="col-2">
                                <div className="img-1">
                                    <img src="./images/slide2-3.png" alt="san pham" />
                                </div>
                                <div className="img-2">
                                    <img src="./images/slide2-4.png" alt="san pham" />
                                </div>
                                <div className="img-3">
                                    <img src="./images/mobile-slide2-3.png" alt="san pham" />
                                </div>
                                <div className="img-4">
                                    <img src="./images/mobile-slide2-4.png" alt="san pham" />
                                </div>
                            </Col>
                            <Col xs={4} md={4} xl={4} className="col-3">
                                <div className="img-1">
                                    <img src="./images/slide2-5.png" alt="san pham" />
                                </div>
                                <div className="img-2">
                                    <img src="./images/slide2-6.png" alt="san pham" />
                                </div>
                                <div className="img-3">
                                    <img src="./images/mobile-slide2-5.png" alt="san pham" />
                                </div>
                                <div className="img-4">
                                    <img src="./images/mobile-slide2-6.png" alt="san pham" />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Slide2;