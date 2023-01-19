let reposInput = document.querySelector(".get-repos input"),
  getReposBtn = document.querySelector(".get-repos .get-btn"),
  reposDataContainer = document.querySelector(".show-repos");
reposInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getReposBtn.click();
});
window.onload = () => reposInput.focus();

getReposBtn.onclick = () => {
  if (reposInput.value == "") {
    fireSweetAlert(
      "Please Enter A Valid Github Username !",
      "Warning",
      "warning"
    );
  } else {
    reposDataContainer.innerHTML = "";
    getReposData(reposInput.value);
  }
};
function getReposData(githubUserName) {
  fetch(`https://api.github.com/users/${githubUserName}/repos`)
    .then((response) => {
      if (response.ok) return response.json();
      return Promise.reject("GitHub Username Not Found");
    })
    .then((reposData) => {
      if (reposData.length === 0) {
        return Promise.reject("No Repos Found in this account");
      }
      reposData.forEach(({ name, id, private }) => {
        let repoMainElement = document.createElement("div"),
          repoIdSpan = document.createElement("span"),
          repoNameSpan = document.createElement("span"),
          repoStateSpan = document.createElement("span");
        let repoLink = document.createElement("a");
        let repoLinkText = document.createTextNode("Visit");
        repoLink.appendChild(repoLinkText);
        repoLink.href = `https://github.com/${githubUserName}/${name}`;
        repoLink.className = "repo-link";
        repoLink.setAttribute("target", "_blank");
        repoMainElement.className = "repo-box";

        let repoName = document.createTextNode(name);
        repoNameSpan.appendChild(repoName);

        let repoId = document.createTextNode(id);
        repoIdSpan.appendChild(repoId);

        let repoState = document.createTextNode(`Repo Status : ${private}`);
        repoStateSpan.appendChild(repoState);
        repoMainElement.append(
          repoIdSpan,
          repoNameSpan,
          repoStateSpan,
          repoLink
        );
        reposDataContainer.appendChild(repoMainElement);
      });
    })
    .catch((errorMsg) => {
      reposDataContainer.innerHTML = `<div class="no-data-msg">No Data To Show</div>`;
      fireSweetAlert(errorMsg, "Error", "error");
    });
}

function fireSweetAlert(
  text,
  title,
  icon,
  timer = 0,
  showConfirmButton = true
) {
  Swal.fire({
    icon,
    text,
    title,
    timer,
    showConfirmButton,
  });
}
