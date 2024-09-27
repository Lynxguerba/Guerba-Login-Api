function statusChangeCallback(response) {
  if (response.status === "connected") {
    // Get the access token
    const accessToken = response.authResponse.accessToken;

    // Use the token to fetch the user's data
    FB.api(
      "/me",
      {
        fields: "name", // Fetch the user's name
        access_token: accessToken,
      },
      function (userInfo) {
        console.log("User Info:", userInfo);

        // Redirect to wel.html with the user's name as a query parameter
        window.location.href = `wel.html?name=${encodeURIComponent(
          userInfo.name
        )}`;
      }
    );
  } else {
    console.log("Not logged in");
  }
}

function checkLoginState() {
  // Called when a person is finished with the Login Button.
  FB.getLoginStatus(function (response) {
    // See the onlogin handler
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function () {
  FB.init({
    appId: "536039209006579",
    cookie: true, // Enable cookies to allow the server to access the session.
    xfbml: true, // Parse social plugins on this webpage.
    version: "v13.0", // Use this Graph API version for this call.
  });

  FB.getLoginStatus(function (response) {
    // Called after the JS SDK has been initialized.
    statusChangeCallback(response); // Returns the login status.
  });
};

// function testAPI() {
//   // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
//   console.log("Welcome!  Fetching your information.... ");
//   FB.api("/me", function (response) {
//     console.log("Successful login for: " + response.name);
//     document.getElementById("status").innerHTML =
//       "Thanks for logging in, " + response.name + "!";
//   });
// }
