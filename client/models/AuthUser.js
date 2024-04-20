document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = {
      userEmail: document.getElementById("userEmail").value,
      userPassword: document.getElementById("userPassword").value,
    };
    const messageOutput = document.getElementById("login-message-output");

    const url = "http://localhost:3000/login";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao fazer login");
      }

      const user = await response.json();
      localStorage.setItem(`${user.token}`, user.token);
      localStorage.setItem("isAdmin", user.isAdmin);
      window.location.href = "/client/src/users.html";
    } catch (error) {
      console.error("Erro ao fazer login:", error);

      messageOutput.innerText = error;
      messageOutput.classList.replace("hidden", "login-message-output");
    }
  });