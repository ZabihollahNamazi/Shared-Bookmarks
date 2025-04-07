// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./storage.js";
document.getElementById("form-input").style.display = "none";

function selectUser(){
  const users = getUserIds();
  let dropdown = document.getElementById("dropdown-users");
  for(let i =0; i < users.length; i++){
    let option = document.createElement("option");
    option.value = users[i];
    option.id = users[i];
    option.innerHTML = `User ${users[i]}`
    dropdown.appendChild(option);
  }
  dropdown.addEventListener("change", (e)=>{
    e.preventDefault();
    document.getElementById("form-input").style.display = "block";
  })
}

window.onload = function () {
  console.log(getUserIds())
  selectUser();
  // document.querySelector("body").innerText = `There are ${users.length} users`;
};
