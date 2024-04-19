document
  .getElementById("register-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    // buscar infos do body
    const formData = {
      userName: document.getElementById("userName").value,
      userEmail: document.getElementById("userEmail").value,
      userPassword: document.getElementById("userPassword").value,
      confirmUserPassword: document.getElementById("confirmUserPassword").value,
    };
    const messageOutput = document.getElementById("register-message-output");
    const url = "http://localhost:3000/register";

    // fazer requisição na api
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar usuário");
      }

      messageOutput.innerText = "Cadastro Efetivado!";
      messageOutput.classList.replace("hidden", "register-message-output");
      console.log("Conta criada com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);

      messageOutput.innerText = error.message;
      messageOutput.classList.replace("hidden", "register-message-output");
    }
  });
