const content = document.querySelector("#content");
const submit = document.querySelector("#add");
window.addEventListener("load", () => {
  getUsers();
});

// Format date to MM/DD/YYYY format
function formatDate(dateString) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

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
      if (data.length === 0) {
        html = '<p class="no-students">No students enrolled yet.</p>';
      } else {
        data.forEach((element) => {
          html += `
            <div class="student-card">
              <div class="card-header">
                <span class="student-id">#${element.id}</span>
              </div>
              <div class="card-content">
                <div class="field-item">
                  <span class="field-label">Name</span>
                  <span class="field-value">${element.fullName}</span>
                </div>
                <div class="field-item">
                  <span class="field-label">Course</span>
                  <span class="field-value">${element.course}</span>
                </div>
                <div class="field-item">
                  <span class="field-label">Year Level</span>
                  <span class="field-value">${element.yearLevel}</span>
                </div>
                <div class="field-item">
                  <span class="field-label">Email</span>
                  <span class="field-value email">${element.email}</span>
                </div>
                <div class="field-item">
                  <span class="field-label">Date Enrolled</span>
                  <span class="field-value">${formatDate(element.dateEnrolled)}</span>
                </div>
              </div>
            </div>
          `;
        });
      }
      content.innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
      content.innerHTML = '<p class="error">Failed to load students. Please try again.</p>';
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
