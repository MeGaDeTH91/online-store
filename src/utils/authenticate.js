const authenticate = async (url, body, onSuccess, onFailure) => {
  try {
    const promise = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const authToken = promise.headers.get("Authorization");
    document.cookie = `x-auth-token=${authToken}; Secure`;

    const response = await promise.json();

    if (response.email && authToken) {
      onSuccess({
        email: response.email,
        isAdministrator: response.isAdministrator,
        id: response._id,
      });
    } else {
      onFailure();
    }
  } catch (error) {
    onFailure(error);
  }
};

export default authenticate;
