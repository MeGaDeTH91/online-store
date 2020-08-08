import React, { Component } from "react";
import PageLayout from "../../../components/page-layout";
import Title from "../../../components/title";
import CardDeckComponent from "../../../components/card-deck";
import CardCategory from "../../../components/card-category";

class CategoriesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  getCategories = async () => {
    const promise = await fetch(`http://localhost:8000/api/categories/all`);

    const categories = await promise.json();

    this.setState({
      categories,
    });
  };

  componentDidMount() {
    this.getCategories();
  }

  render() {
    return (
      <PageLayout>
        <div>
          <Title title="Categories"></Title>
          <hr />
          <CardDeckComponent>
            {this.state.categories.map((x) => {
              return (
                <CardCategory
                  key={x._id}
                  categoryId={x._id}
                  imageURL={x.imageURL}
                  title={x.title}
                ></CardCategory>
              );
            })}
          </CardDeckComponent>
        </div>
      </PageLayout>
    );
  }
}

export default CategoriesPage;
