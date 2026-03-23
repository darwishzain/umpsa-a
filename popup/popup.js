fetch(chrome.runtime.getURL("data/config.json"))
  .then(res => res.json())
  .then(config => {
    document.title = config.title;
    document.getElementById('title').textContent = config.title;
    const linkscontainer = document.getElementById('links');
    Object.values(config.links).forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.target = "_blank";
      a.classList.add("btn", "btn-outline-primary", "rounded-pill", "mx-1")
      if (link.icon && link.icon.trim() !== "") {
        const icon = document.createElement("i");
        icon.className = link.icon;
        a.textContent = " " + link.name;
        
        a.prepend(icon);
      }
      else
      {
        a.textContent = link.name;
      }
      linkscontainer.appendChild(a);
    });
  });

// Saves options to chrome.storage
function savecreds() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var role = document.forms["loginform"]["role"].value;

  chrome.storage.sync.set(
    {
      username: username,
      password: password,
      role: role,
    },
    function () {
      if (chrome.runtime.lastError) {
        const err = chrome.runtime.lastError.message || "Unknown error";
        updatestatus("error", err, 2000);
        return;
      }
      updatestatus("success", "Credentials saved!", 2000);//success
      setTimeout(function () {
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
      }, 750);
    }
  );
}

function showcreds() {
  chrome.storage.sync.get(["username", "password", "role"], (result) => {
    document.getElementById("usernameInfo").innerText = result.username;
    document.getElementById("passwordInfo").innerText = result.password;
    document.getElementById("roleInfo").innerText = result.role;
    updatestatus("info","Showing Credentials!",2000);
    setTimeout(function () {
      document.getElementById("usernameInfo").innerText = "";
      document.getElementById("passwordInfo").innerText = "";
      document.getElementById("roleInfo").innerText = "";
    }, 2000);
  });
}

function checkForm() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var role = document.forms["loginform"]["role"].value;

  var usernameCanSubmit,
    passwordCanSubmit,
    roleCanSubmit = false;

  function checkUsername() {
    if (username == "") {
      usernameCanSubmit = false;
      console.log("Put a first Name and Last Name");
    } else {
      usernameCanSubmit = true;
      console.log("Thank You");
    }
  }

  checkUsername();

  function checkPassword() {
    if (password == "") {
      passwordCanSubmit = false;
      console.log("Please Put in a proper password");
    } else {
      passwordCanSubmit = true;
      console.log("Thank you");
    }
  }
  checkPassword();

  function checkRole() {
    if (role == "") {
      roleCanSubmit = false;
      console.log("Please Put in a proper phone number");
    } else {
      roleCanSubmit = true;
      console.log("Thank you");
    }
  }

  checkRole();
  if (usernameCanSubmit && passwordCanSubmit && roleCanSubmit) {
    document.getElementById("save").disabled = false;
  } else {
    document.getElementById("save").disabled = true;
  }
}

function updatestatus(type,text,delay=0){
  let status = document.getElementById("status");
  let style="text-center";
  switch (type) {
    case "success":style += " text-success";break;
    case "error":style += " text-danger";break;
    case "info":style += " text-info";break;
    default:break;
  }
  status.className=style;
  status.textContent=text;
  if(delay>0){
    setTimeout(function () {
      //status.className="";
      status.textContent="";
    }, delay);
  }
}
function clearstorage() {
    chrome.storage.sync.clear(() => {
        console.log('Chrome storage cleared');
    });
}
// document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById("save").addEventListener("click", savecreds);

document.getElementById("show").addEventListener("click", showcreds);

document.getElementById("username").addEventListener("blur", checkForm);
document.getElementById("password").addEventListener("blur", checkForm);
document.getElementById("student").addEventListener("blur", checkForm);
document.getElementById("staff").addEventListener("blur", checkForm);

