import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <Container>
          <Row xs={1} md={3}>
            <Col className="logo">
              <a href="#">
                <img className="footer__logo" src="/images/logo-ocop.png" alt="logo" />
              </a>
              <p className="footer__name">VĂN PHÒNG ĐIỀU PHỐI </p>
              <p className="footer__name">NÔNG THÔN MỚI TRUNG ƯƠNG </p>

            </Col>
            <Col>
              <h4>Thông tin liên hệ</h4>
              <ul>
                <li>
                  <i class="fas fa-map-marker-alt"></i>
                  <a href="#">Số 2, Ngọc Hà, Ba Đình, Hà Nội</a>
                </li>
                <li>
                  <i class="far fa-envelope"></i>
                  <a href="#">(84-24) 38438617</a>
                </li>
                <li>
                  <i class="fas fa-phone-alt"></i>
                  <a href="#">(84-24) 38438617</a>
                </li>
                <li>
                  <i class="fas fa-globe"></i>
                  <a href="#">http://ocop.gov.vn</a>
                </li>
              </ul>
            </Col>
            <Col>
              <h4>Liên kết nhanh</h4>
              <ul>
                <li>
                  <a href="https://www.mard.gov.vn/" style={{ textDecoration: "underline" }}>
                    Bộ Nông nghiệp và PTNN
                  </a>
                </li>
                <li>
                  <a href="http://ocop.gov.vn/" style={{ textDecoration: "underline" }}>
                    Chương trình OCOP
                  </a>
                </li>
                <li>
                  <a href="http://nongthonmoi.gov.vn/" style={{ textDecoration: "underline" }}>
                    Nông thôn mới
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
          <div className="footer__author">
            <p>© Bản quyền thuộc về Bộ nông nghiệp và Phát triển nông thôn</p>
            <p>Designed by Marveltek</p>
          </div>
        </Container>
      </div>
    );
  }
}
