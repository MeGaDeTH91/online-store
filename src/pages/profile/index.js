import React, { useEffect, useState, useContext } from "react";
import PageLayout from "../../components/page-layout";
import userImage from "../../images/user.jpg";
import { useHistory } from "react-router-dom";
import executeAuthGetRequest from "../../utils/executeAuthGETRequest";
import NotificationContext from "../../NotificationContext";
import ListUserReviews from "../../components/user-reviews/user-list";
import EditButton from "../../components/buttons/edit";
import UserContext from "../../UserContext";

const ProfilePage = () => {
  const notifications = useContext(NotificationContext);
  const userContext = useContext(UserContext);
  const history = useHistory();

  const [user, setUser] = useState("");
  const [reviews, setReviews] = useState([]);

  const getUserInfo = async () => {
    await executeAuthGetRequest(
      `http://localhost:8000/api/users/user?id=${userContext.user.id}`,
      (usersResponse) => {
        setUser(usersResponse);

        if (usersResponse.reviews && usersResponse.reviews.length) {
          setReviews(
            usersResponse.reviews.sort((a, b) =>
              ("" + b.created_at).localeCompare("" + a.created_at)
            )
          );
        }
      },
      (error) => {
        notifications.showMessage(error, "danger");
        history.push("/");
      }
    );
  };

  const editUser = () => {
    history.push(`/profile-edit`);
  };

  const myOrders = () => {
    history.push('/my-orders');
  }

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!reviews) {
    return <PageLayout>Loading...</PageLayout>;
  }

  return (
    <PageLayout>
      <div className="container">
        <h1 className="my-4">{user.fullName}</h1>

        <div className="row">
          <div className="col-md-8">
            <img className="img-fluid" src={userImage} alt="Express" />
          </div>

          <div className="col-md-4 text-center">
            <h3 className="my-3">Email: {user.email}</h3>
            <h3 className="my-3">
              Phone: {user.phone ? user.phone : "Not provided"}
            </h3>
            <EditButton title="Update info" onClick={editUser}></EditButton>
            <EditButton title="My orders" onClick={myOrders}></EditButton>
          </div>
        </div>
        <hr />
        <div>
          <h4 className="text-center">Recent product reviews</h4>

          {reviews && reviews.length ? (
            <ListUserReviews reviews={reviews} />
          ) : (
            <p> There are no reviews from you yet.</p>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;
