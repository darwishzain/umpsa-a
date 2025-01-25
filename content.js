const urlarray = [
    {name:"ecomm",url:"https://ecomm.ump.edu.my"},
    {name:"kalam",url:"https://kalam.ump.edu.my"},
    {name:"or",url:"https://or.ump.edu.my"},
    {name:"gading",url:"https://gading.ump.edu.my/ump/f?p=116:99999:115578486505334"}
];
const urldiv = document.getElementById('umpurl');
urlarray.forEach(item => {
    const anchor = document.createElement('a');
    anchor.href = item.url;
    anchor.className = 'btn btn-primary';
    anchor.target = '_blank';
    anchor.textContent = item.name.charAt(0).toUpperCase() + item.name.slice(1);
    urldiv.appendChild(anchor);
});
function clearstorage() {
    chrome.storage.sync.clear(() => {
        console.log('Chrome storage cleared');
    });
}
//?from user:https://github.com/oscarchuaweiwen-fsd
function saveoptions() {
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
        // Update status to let user know options were saved.
        var status = document.getElementById("status");
        status.textContent = "Your account has been saved successfully!.";
        setTimeout(function () {
        status.textContent = "";
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("status").value = "";
        }, 750);
    }
    );
}

function show() {
    document.getElementById("userInfo").classList.add("myStyle");
    chrome.storage.sync.get(["username", "password", "role"], (result) => {
        document.getElementById("usernameInfo").innerText = result.username;
        document.getElementById("passwordInfo").innerText = result.password;
        document.getElementById("roleInfo").innerText = result.role;
        setTimeout(function () {
            document.getElementById("userInfo").classList.remove("myStyle");
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
            console.log("Please Put in a proper phone number");
        } else {
            passwordCanSubmit = true;
            console.log("Thank you");
        }
    }
    checkPassword();

    function checkRole() {
        if (role == "") {
            rolecanSubmit = false;
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

// document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById("save").addEventListener("click", saveoptions);

document.getElementById("show").addEventListener("click", show);
document.getElementById("clear").addEventListener("click", clearstorage);

document.getElementById("username").addEventListener("blur", checkForm);
document.getElementById("password").addEventListener("blur", checkForm);
document.getElementById("student").addEventListener("blur", checkForm);
document.getElementById("staff").addEventListener("blur", checkForm);
