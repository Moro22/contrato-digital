document.getElementById("contractForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let formData = new FormData(this);  // Captura los datos del formulario

    try {
        const response = await fetch("https://contrato-backend.onrender.com/generar-contrato", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);

            // Si deseas enviar el contrato por correo después de generarlo
            await fetch("https://contrato-backend.onrender.com/enviar-contrato", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    correo: formData.get("correo_autorizado"),
                    pdfPath: result.pdfPath,
                    nombre: formData.get("nombre")
                })
            });
        } else {
            alert("❌ Error al generar contrato.");
        }
    } catch (error) {
        console.error("❌ Error:", error);
        alert("❌ Ocurrió un error al enviar el formulario.");
    }
});
