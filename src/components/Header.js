import React, { Component } from "react";
import { Container } from "reactstrap";

export default class Header extends Component {
  render() {
    return (
      <>
      <div className="header">
        <Container >
          <div className="nav">
            <a href="/" className="logo">
              <img src="/images/logo-ntm.png" alt="logo" />
            </a>
            <div className="menu">
              <ul>
                <li>
                  <a href="/products">SẢN PHẨM</a>
                </li>
                <li>
                  <a href="http://ocop.gov.vn/">CHƯƠNG TRÌNH OCOP</a>
                </li>
              </ul>
              <button>
                <img src="/images/vietnamese.png" alt="vietnamese" />
              </button>
            </div>
          </div>
        </Container>
      </div>
      <div className="header navbarOnTop">
        <Container >
          <div className="nav">
            <a href="/" className="logo">
              <img src="/images/logo-ntm.png" alt="logo" />
            </a>
            <div className="menu">
              <ul>
                <li>
                  <a href="/products">SẢN PHẨM</a>
                </li>
                <li>
                  <a href="http://ocop.gov.vn/">CHƯƠNG TRÌNH OCOP</a>
                </li>
              </ul>
              <button>
                <img src="/images/vietnamese.png" alt="vietnamese" />
              </button>
            </div>
          </div>
        </Container>
      </div>
      </>
    );
  }
}
