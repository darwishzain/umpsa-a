// content.js

// Get the current URL
const currentUrl = window.location.href;

// Check if the URL matches either of the target URLs
if (currentUrl.includes("ecomm.ump.edu.my") || currentUrl.includes("kalam.umpsa.edu.my/login/") || currentUrl.includes("or.ump.edu.my/or/")) {
  // Retrieve the stored username, password, and role from Chrome storage
  chrome.storage.sync.get(["username", "password", "role"], (result) => {

    // Check if the current URL is ecomm.ump.edu.my
    if (currentUrl.includes("ecomm.ump.edu.my")) {
      // Get the login form elements for ecomm.ump.edu.my
      var ecomUsername = document.getElementById("form-username");
      var ecomPassword = document.getElementById("form-password");
      var ecomRole = document.getElementById("lvl");
      var ecommbutton = document.getElementById("js-btn");

      // Set the role based on the stored value
      if (result.role === "Pelajar") {
        ecomRole.selectedIndex = "1";
      }

      if (result.role === "Staf") {
        ecomRole.selectedIndex = "0";
      }

      // Set the username and password
      ecomUsername.value = result.username;
      ecomPassword.value = result.password;

      // Click the login button at intervals
      setInterval(() => {
        ecommbutton.click();
      }, 500);
    }

    // Check if the current URL is kalam.umpsa.edu.my
    if (currentUrl.includes("kalam.umpsa.edu.my/login/")) {
      // Get the login form elements for kalam.umpsa.edu.my
      var kalamUsername = document.getElementById("username");
      var kalamPassword = document.getElementById("password");
      var kalambutton = document.getElementById("loginbtn");

      // Set the username and password
      kalamUsername.value = result.username;
      kalamPassword.value = result.password;

      // Click the login button after a delay
      setTimeout(() => {
        kalambutton.click();
      }, 2000);
    }

    if (currentUrl.includes("or.ump.edu.my/or/")) {
      // Get the login form elements for or.ump.edu.my
      var orUsername = document.getElementById("login");
      var orPassword = document.getElementById("password");
      var orbutton = document.getElementById("btn_signin");

      // Set the username and password
      orUsername.value = result.username;
      orPassword.value = result.password;

      // Click the login button after a delay
      setTimeout(() => {
        orbutton.click();
      }, 2000);
    }
  });
}
