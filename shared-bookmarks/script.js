// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, setData, getData } from "./storage.js";
document.getElementById("form-input").style.display = "none"; // set input form as hide in default

function selectUser(){
  const users = getUserIds();
  let dropdown = document.getElementById("dropdown-users");
  for(let i =0; i < users.length; i++){ // adding users to dropdown list
    let option = document.createElement("option");
    option.value = users[i];
    option.id = users[i];
    option.innerHTML = `User ${users[i]}`
    dropdown.appendChild(option);
  }
  dropdown.addEventListener("change", (e)=>{
    e.preventDefault();
    document.getElementById("form-input").style.display = "block"; // when you select a user form will show up
    const userId = dropdown.options[dropdown.selectedIndex].id; // getting user id from selected option or user
    displayData(userId);
    addData(userId);
  })
}

function addData(userId){
  document.getElementById("form-input").addEventListener("submit", (event)=>{
    event.preventDefault();
    const newData = {  // getting data from form input
      topic: document.getElementById("topic").value, 
      link: document.getElementById("link").value,
      desc: document.getElementById("desc").value,
      createdAt: new Date().toISOString() // "2025-04-07T18:32:15.123Z"
    }
    const rawData = getData(userId); // get users data from local storage
    let localData = Array.isArray(rawData) ? rawData : rawData != null ? [rawData] : []; // check if data is an array
    localData.push(newData) //push the new data into users data which we got from local storage
    localData.sort((a, b)=> new Date(a.createdAt) - new Date(b.createdAt)); // sorting data from oldest to newest
    setData(userId, localData); // add users data back to local storage
    document.getElementById("topic").value = ""; 
    document.getElementById("link").value = "";
    document.getElementById("desc").value = "";
    displayData(userId);
  })
}

function displayData(userId){
  let ulList = document.getElementById("ul-list");
  ulList.innerHTML = "";
  const userData = getData(userId); // gets data from local storage
  if(!userData){
    let li1 = document.createElement("li");
    li1.innerHTML = "There is no data for this User";
    ulList.appendChild(li1);
  }
  else{
    for(let i = 0; i < userData.length; i++){ // loop over to create elements and display bookmarks
      let li = document.createElement("li");
      let hTitle = document.createElement("a");
      hTitle.href = userData[i].link;
      hTitle.innerHTML = userData[i].topic;
      hTitle.target = "_blank"; //open in new tab
  
      let pDesc = document.createElement("p");
      pDesc.innerHTML = userData[i].desc;
  
      let pTime = document.createElement("p");
      pTime.innerHTML = new Date(userData[i].createdAt).toLocaleString(); // 7/4/2025, 7:32 PM
  
      li.append(hTitle, pDesc, pTime);
      ulList.appendChild(li);
    }
  }
  
}


window.onload = function () {

  selectUser();

};
