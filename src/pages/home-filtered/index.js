import React, { Component } from "react";
import PageLayout from "../../components/page-layout";
import Title from "../../components/title";
import CardDeckComponent from "../../components/card-deck";
import CardProduct from "../../components/card-product";
import formatPrice from "../../utils/priceFormatter";

class HomeFilteredPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  getProducts = async (searchParam) => {
    const promise = await fetch(`http://localhost:8000/api/products/all`);

    const productsResult = await promise.json();

    try {
      const products = productsResult.filter(x => x.title.toLowerCase().includes(searchParam.toLowerCase()));

      this.setState({
        products,
      });
    } catch (error) {
      
    }
  };

  componentDidMount() {
    this.getProducts(this.props.match.params.search);
  }

  render() {
    return (
      <PageLayout>
        <div>
          <Title title="Products"></Title>
          <hr />
          {this.state.products && this.state.products.length ? (
            <CardDeckComponent>
              {this.state.products.map((x) => {
                return (
                  <CardProduct
                    key={x._id}
                    productId={x._id}
                    imageURL={x.imageURL}
                    title={x.title}
                    price={formatPrice(x.price)}
                    quantity={x.quantity}
                    category={x.category}
                  ></CardProduct>
                );
              })}
            </CardDeckComponent>
          ) : (
            <p>No products or database is down.</p>
          )}
        </div>
      </PageLayout>
    );
  }
}

export default HomeFilteredPage;
