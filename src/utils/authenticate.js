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

    const response = await promise.json();

    if (!promise.ok) {
      onFailure(`Error occured: ${response}`);
    } else if (response.email && response.isActive && authToken) {
      document.cookie = `x-auth-token=${authToken}`;
      onSuccess({
        email: response.email,
        isAdministrator: response.isAdministrator,
        isActive: response.isActive,
        id: response._id,
      });
    } else {
      onFailure("Account is suspended!");
    }

    
  } catch (error) {
    onFailure(error);
  }
};

export default authenticate;
