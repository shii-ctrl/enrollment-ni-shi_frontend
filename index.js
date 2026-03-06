const content = document.querySelector("#content");
const submit = document.querySelector("#add");
window.addEventListener("load", () => {
  getUsers();
});

function getUsers() {
  let html = "";
  //FETCH API
  fetch("https://enrollment-ni-shi.onrender.com/api/users", { mode: "cors" })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      data.forEach((element) => {
        html += `<li>${element.id}. ${element.fullName} - ${element.course} - ${element.yearLevel} - ${element.email} - ${element.dateEnrolled}</li>`;
      });
      content.innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}

//POST API
submit.addEventListener("click", () => {
  const user = {
    fullName: document.querySelector("#fullName").value,
    course: document.querySelector("#course").value,
    yearLevel: document.querySelector("#yearLevel").value,
    email: document.querySelector("#email").value,
    dateEnrolled: document.querySelector("#dateEnrolled").value,
  };
  fetch("https://enrollment-ni-shi.onrender.com/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  }).catch((error) => {
    console.log(error);
  });
  alert("User added successfully");
  location.reload();
});