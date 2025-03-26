document.getElementById("contractForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let formData = new FormData(this);  // Captura los datos del formulario

    const response = await fetch("http://localhost:3000/generar-contrato", {
        method: "POST",
        body: formData
    });

    const result = await response.json();
    alert(result.message);
});