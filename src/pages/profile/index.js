import React, { useContext, useState, useEffect, useCallback } from "react";
import PageLayout from "../../components/page-layout";
import styled from "styled-components";
import UserContext from "../../UserContext";
import { useParams, useHistory } from "react-router-dom";

const ProfilePage = () => {
  const [username, setUsername] = useState(null);
  const [posts, setPosts] = useState(null);
  const context = useContext(UserContext);
  const params = useParams();
  const history = useHistory();

  const logOut = () => {
    context.logOut();

    history.push('/');
  }

  const getUser = useCallback(async () => {
    const response = await fetch(`http://localhost:9999/api/user?id=${params.userId}`);

    if (!response.ok) {
      history.push("/error");
    } else {
      const user = await response.json();

      setUsername(user.username);
      setPosts(user.posts && user.posts.length);
    }
  }, [params.userId, history]);

  useEffect(() => {
    getUser()
  }, [getUser])

  if (!username) {
    return <PageLayout>Loading...</PageLayout>;
  }
  return (
    <PageLayout>
      <ProfileDiv>
        <ProfileImage
          src="https://devshift.biz/wp-content/uploads/2017/04/profile-icon-png-898.png"
          alt="profile-icon"
        />
        <div>
        <p>User: {username}</p>
        <p>Posts: {posts}</p>
        <button onClick={logOut}>Logout</button>
      </div>
      {/* <Origami length={3} /> */}
      </ProfileDiv>
    </PageLayout>
  );
}

const ProfileDiv = styled.div`
  width: 83%;
  display: inline-block;
  vertical-align: top;
  padding: 0.5%;
`;

const ProfileImage = styled.img`
  width: 250px;
  margin: 0 auto;
  display: block;
`;
export default ProfilePage;
