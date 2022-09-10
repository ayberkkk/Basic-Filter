import React, { Component } from "react";
import Navigation from "./Navigation"; //navigation component
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";
import alertify from "alertifyjs";
import NotFound from "./NotFound";
import CartList from "./CartList"; 
import FormDemo1 from "./FormDemo1";
import FormDemo2 from "./FormDemo2";
import { Route, Switch } from "react-router-dom";

export default class App extends Component {
  state = { currentCategory: "", products: [], cart: [] };
  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName }); // kategoriyi gösterdiğimiz yer (seçilen)
    this.getProducts(category.id); //ürün listeleme (seçilen)
  };

  addToCard = (product) => {
    let newCart = this.state.cart;
    var addedItems = newCart.find((c) => c.product.id === product.id);
    if (addedItems) {
      addedItems.quantity += 1;
    } else newCart.push({ product: product, quantity: 1 });

    this.setState({ cart: newCart });
    alertify.success(product.productName + " " + "Added to Cart",2);
  };

  removeFromCard = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.error(product.productName +  "Remove",2);
  };

  componentDidMount() {
    this.getProducts();
  }
  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };
  render() {
    // let titleCategory = "Category List";
    let categoryInfo = { title: "Category List" };
    let productInfo = { title: "Product List" };
    return (
      <div className="App">
        <Container>
          <Container>
            <Navigation
              removeFromCard={this.removeFromCard}
              cart={this.state.cart}
            ></Navigation>
          </Container>
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <Switch>
                <Route exact path="/" render={props => (
                    <ProductList
                      {...props} //propların kopyasını al gönder
                      products={this.state.products}
                      addToCard={this.addToCard}
                      currentCategory={this.state.currentCategory}
                      info={productInfo}
                    />
                  )}/>
                <Route exact path="/cart" render={props => (
                    <CartList
                      {...props} //propların kopyasını al gönder
                      cart={this.state.cart}
                      removeFromCard={this.removeFromCard}
                    />
                  )}/>
                  <Route exact path="/form1" component={FormDemo1}></Route>
                  <Route exact path="/form2" component={FormDemo2}></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
