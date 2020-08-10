import React, { Component } from "react";
import PageLayout from "../../../components/page-layout";
import UserContext from "../../../UserContext";
import AddToCartButton from "../../../components/buttons/add-to-cart";
import EditButton from "../../../components/buttons/edit";
import DeleteButton from "../../../components/buttons/delete";

class ProductDetailsPage extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      product: null,
      reviews: []
    };
  }

  getProduct = async (productId) => {
    const response = await fetch(
      `http://localhost:8000/api/products/product?id=${productId}`
    );

    if (!response.ok) {
      this.props.history.push("/error");
    }

    const result = await response.json();

    this.setState({
      product: result,
      reviews: result.reviews
    });
  };

  editProduct = () => {
    this.props.history.push(`/products/product-edit/${this.state.product._id}`);
  };

  deleteProduct = () => {
    this.props.history.push(
      `/products/product-delete/${this.state.product._id}`
    );
  };

  addProductToCart = async (productId) => {
    const response = await fetch(
      `http://localhost:8000/api/orders/addToCart?productId=${productId}`
    );

    const userId = this.context.user.id;
    console.log('Productdetails page: ', userId);

    if (!response.ok) {
      this.props.history.push("/");
    }

    const result = await response.json();

    console.log("Product details component: ", result);
  };

  componentDidMount() {
    this.getProduct(this.props.match.params.id);
  }

  render() {
    const { product } = this.state;

    if (!product) {
      return <PageLayout>Loading...</PageLayout>;
    }

    const { user } = this.context;
    const userIsAdministrator = user && user.isAdministrator;
    const userIsLogged = user && user.loggedIn;

    return (
      <PageLayout>
        <div className="container">
          <h1 className="my-4">{product.title}</h1>

          <div className="row">
            <div className="col-md-8">
              <img className="img-fluid" src={product.imageURL} alt="Express" />
            </div>

            <div className="col-md-4 text-center">
              <h3 className="my-3">Product Description</h3>
              <p>{product.description}</p>

              {userIsLogged ? (
                <AddToCartButton
                  onClick={(e) => this.addProductToCart(product._id)}
                />
              ) : null}
              {userIsAdministrator ? (<EditButton title="Edit Product" onClick={this.editProduct}></EditButton>) : null}
              {userIsAdministrator ? (<DeleteButton title="Delete Product" onClick={this.deleteProduct}></DeleteButton>) : null}
            </div>
          </div>
          <hr />
          <h4 className="text-center">Product reviews</h4>
        </div>
      </PageLayout>
    );
  }
}

export default ProductDetailsPage;
