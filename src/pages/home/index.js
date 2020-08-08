import React, { Component } from "react";
import PageLayout from "../../components/page-layout";
import Title from "../../components/title";
import CardDeckComponent from "../../components/card-deck";
import CardProduct from "../../components/card-product";

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  getProducts = async () => {
    const promise = await fetch(`http://localhost:8000/api/products/all`);

    const products = await promise.json();

    this.setState({
      products,
    });
  };

  componentDidMount() {
    this.getProducts();
  }

  render() {
    return (
      <PageLayout>
        <div>
          <Title title="Products"></Title>
          <hr />
          <CardDeckComponent>
            {this.state.products.map((x) => {
              return (
                <CardProduct
                  key={x._id}
                  productId={x._id}
                  imageURL={x.imageURL}
                  title={x.title}
                  price={(Math.round(x.price * 100) / 100).toFixed(2)}
                  category={x.category}
                ></CardProduct>
              );
            })}
          </CardDeckComponent>
        </div>
      </PageLayout>
    );
  }
}

export default HomePage;
