document.addEventListener("DOMContentLoaded", () => {
  const outputMessage = document.getElementById("user-page-message-output");
  const userPageContent = document.getElementById("user-page-content");
  const exitLogin = document.getElementById("exit-login-btn");
  const token = localStorage.getItem("token");
  if (!token) {
    outputMessage.classList.replace("hidden", "login-message-output");
    userPageContent.classList.replace("user-page-content", "hidden");
  }
  exitLogin.addEventListener("click", async () => {
    await localStorage.removeItem("token");
    await location.reload();
  });
});
