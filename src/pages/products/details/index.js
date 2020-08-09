import React, { Component } from "react";
import PageLayout from "../../../components/page-layout";
import UserContext from "../../../UserContext";
import AddToCartButton from "../../../components/buttons/add-to-cart";
import AdminButtonGroup from "../../../components/buttons/button-group";

class ProductDetailsPage extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      product: null,
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
    });
  };

  addProductToCart = async (productId) => {
      const response = await fetch(`http://localhost:8000/api/orders/addToCart?productId=${productId};userId=${this.context.user.id}`);
      
      console.log(response);
      if (!response.ok) {
        this.props.history.push("/error");
      }
  
      const result = await response.json();
  
      console.log('Product details component: ', result);
  }


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

              {userIsLogged ? <AddToCartButton onClick={e => this.addProductToCart(product._id)} /> : null}
              {userIsAdministrator ? <AdminButtonGroup title="Product"></AdminButtonGroup> : null}
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
