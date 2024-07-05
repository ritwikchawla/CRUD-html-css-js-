// Add employee button functunalities

var addBtn = document.querySelector("#add-btn");
var model = document.querySelector(".model");

addBtn.onclick = function () {
  model.classList.add("active");
};

var closeBtn = document.querySelector(".close-btn");

closeBtn.addEventListener("click", () => {
  model.classList.remove("active");
});

//Initialize all global variable
var userData = [];
var idEle = document.querySelector("#id");
var firstEle = document.querySelector("#first-name");
var lastEle = document.querySelector("#last-name");
var emailEle = document.querySelector("#email");
var officeEle = document.querySelector("#office-code");
var jobEle = document.querySelector("#job-title");
var registerBtn = document.querySelector(".register");
var updateBtn = document.querySelector("#update-btn");
var registraionForm = document.querySelector("#registerForm");
var imgUrl;

registerBtn.onclick = function (e) {
  e.preventDefault();
  registrationData();
  getDataFromLocal();
  registraionForm.reset("");
  closeBtn.click();
};

if (localStorage.getItem("userData") != null) {
  userData = JSON.parse(localStorage.getItem("userData"));
}

function registrationData() {
  userData.push({
    id: idEle.value,
    first_name: firstEle.value,
    last_name: lastEle.value,
    email: emailEle.value,
    office: officeEle.value,
    job: jobEle.value,
    profilePic: imgUrl == undefined ? "./images/user-solid.svg" : imgUrl,
  });
  var userString = JSON.stringify(userData);
  localStorage.setItem("userData", userString);
  swal("Good job!", "Registration Successfull!", "success");
}

//Start returning data on page from localStorage
var tableData = document.querySelector("#table-data");
const getDataFromLocal = () => {
  tableData.innerHTML = "";
  userData.forEach((data, index) => {
    tableData.innerHTML += `
    <tr index='${index}'>
          <td>${index + 1}</td>
          <td><img src ="${data.profilePic}" height="20" width="20"></td>
          <td>${data.id}</td>
          <td>${data.first_name}</td>
          <td>${data.last_name}</td>
          <td>${data.email}</td>
          <td>${data.office}</td>
          <td>${data.job}</td>
          <td>
            <button class="edit-btn">view</button>
            <button class="del-btn">delete</button>
          </td>
        </tr>
        
    `;
  });

  //Delete
  var i;
  var allDelBtn = document.querySelectorAll(".del-btn");
  for (i = 0; i < allDelBtn.length; i++) {
    allDelBtn[i].onclick = function () {
      var tr = this.parentElement.parentElement;
      var id = tr.getAttribute("index");
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          userData.splice(id, 1);
          localStorage.setItem("userData", JSON.stringify(userData));
          tr.remove();
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    };
  }

  //Update
  var allEdit = document.querySelectorAll(".edit-btn");
  for (i = 0; i < allEdit.length; i++) {
    allEdit[i].onclick = function () {
      var tr = this.parentElement.parentElement;
      var td = tr.getElementsByTagName("TD");
      var index = tr.getAttribute("index");
      var imgTag = td[1].getElementsByTagName("IMG");
      var profilePic = imgTag[0].src;
      var id = td[2].innerHTML;
      var first_name = td[3].innerHTML;
      var last_name = td[4].innerHTML;
      var email = td[5].innerHTML;
      var office = td[6].innerHTML;
      var job = td[7].innerHTML;
      addBtn.click();
      registerBtn.disabled = true;
      updateBtn.disabled = false;
      idEle.value = id;
      firstEle.value = first_name;
      lastEle.value = last_name;
      emailEle.value = email;
      officeEle.value = office;
      jobEle.value = job;
      profile_pic.src = profilePic;
      updateBtn.onclick = function (e) {
        userData[index] = {
          id: idEle.value,
          first_name: firstEle.value,
          last_name: lastEle.value,
          email: emailEle.value,
          office: officeEle.value,
          job: jobEle.value,
          profilePic: uploadPic.value == "" ? profile_pic.src : imgUrl,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
      };
    };
  }
};
getDataFromLocal();

//image Processing
var profile_pic = document.querySelector("#profile-pic");
var uploadPic = document.querySelector("#upload-field");
uploadPic.onchange = function () {
  if (uploadPic.files[0].size < 1000000) {
    var fReader = new FileReader();
    fReader.onload = function (e) {
      var imgUrl = e.target.result;
      profile_pic.src = imgUrl;
    };
    fReader.readAsDataURL(uploadPic.files[0]);
  } else {
    alert("File size should be less than 2mb");
  }
};
