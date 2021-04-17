import React from 'react';
import { Row, Col, Container } from "reactstrap";

function Slide1(props) {
    return (
        <div className="slide1" >
            <Container className="container">
                <Row className="h-100">
                    <Col className='content'>
                        <div className="ocop-img-mobile">
                            <Row>
                                <Col xs={3} md={4} xl={4}></Col>
                                <Col xs={6} md={4} xl={4}>
                                    <img src="./images/ocop.png" alt="ocop" />
                                </Col>
                                <Col xs={3} md={4} xl={4}></Col>
                            </Row>
                        </div>
                        <div>
                            <Col xs={12} md={6} xl={6}>
                                <div className='title1'> HỆ THỐNG QUẢN LÝ VÀ GIÁM SÁT </div>
                                <div className='title1-mobile'> HỆ THỐNG QUẢN LÝ - GIÁM SÁT</div>
                            </Col>
                        </div>
                        <div>
                            <Col xs={12} md={10} xl={9}>
                                <div className="title2"> SẢN PHẨM OCOP QUỐC GIA</div>
                                <div className="title2-mobile"> SẢN PHẨM OCOP QUỐC GIA</div>
                            </Col>
                        </div>
                        <div>
                            <div className="ocop-img">
                                <Col xs={5} md={6} xl={6}>
                                    <img src="./images/ocop.png" alt="ocop" />
                                </Col>
                            </div>
                        </div>
                        <div>
                            <Col xs={5} md={5} xl={5}>
                                <p>Phát triển kinh tế khu vực nông thôn theo hương phát triển nội lực, tăng gia giá trị, nâng cao thu nhập của cư dân nông thôn.</p>
                            </Col>
                        </div>
                        <div className="position-action">
                            <Col>
                                <div className="action" >
                                    <a href="http://ocop.gov.vn/">
                                        Tìm hiểu thêm
                                        <img src="/images/arrow.png" alt="arrow" />
                                    </a>
                                </div>
                            </Col>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default Slide1;
