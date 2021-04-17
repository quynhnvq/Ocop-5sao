import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./views/Landing";
import Product from "./views/Product";
import ProductDetail from "./views/ProductDetail";

import ScrollToTop from "./components/ScrollToTop"

function App() {
  return (
    <Router>
      <ScrollToTop>
      <Switch>
        <Route path="/products/" component={Product} />
        <Route path="/detail/:id" component={ProductDetail} />
        <Route path="/" component={Landing} />
      </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
