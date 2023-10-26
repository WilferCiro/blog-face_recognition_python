const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const capturedImage = document.getElementById("capturedImage");
const captureBtn = document.getElementById("captureBtn");
const loginMsg = document.getElementById("login-message");
const loginData = document.getElementById("login-data");

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then(function (stream) {
    video.srcObject = stream;
  })
  .catch(function (error) {
    console.error("Error al acceder a la cámara: ", error);
  });

captureBtn.addEventListener("click", function () {
  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

  canvas.toBlob(function (blob) {
    // Crear una nueva instancia de FormData
    const formData = new FormData();
    // Agregar el Blob al FormData con un nombre específico
    formData.append("image", blob, "photo.png");

    // Realizar la petición Fetch al servidor
    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Manejar la respuesta del servidor si es necesario
        console.log(data);
        if (data.message) {
          loginMsg.innerText = data.message;
          loginData.innerHTML = `<b>User: </b> ${data.user}<br /><b>ID: </b>${data.id}`;
        } else {
          loginMsg.innerText = data.error;
        }
      })
      .catch((error) => {
        console.error("Error en la petición Fetch: ", error);
      });

    // Mostrar la imagen capturada en la página
    const url = URL.createObjectURL(blob);
    capturedImage.src = url;
    capturedImage.style.display = "block";
  });
});
