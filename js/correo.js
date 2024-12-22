const formulario = document.getElementById("formCorreo");
formulario.addEventListener("submit", event => {

    event.preventDefault();

    // Obtener datos de entrada
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    // Variables para los mensajes de error
    const errorNombre = document.getElementById("errorNombre"); 
    const errorCorreo = document.getElementById("errorCorreo");
    const errorMensaje = document.getElementById("errorMensaje");
    const errorTelefono = document.getElementById("errorTelefono");

    // Inicializar validación
    let formularioValido = true;

    // Validar nombre
    if (nombre === "") {
        errorNombre.classList.remove("no-mostrar");
        formularioValido = false;
    } else {
        errorNombre.classList.add("no-mostrar");
    }

    // Validar correo
    const correoRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegExp.test(correo)) {
        errorCorreo.classList.remove("no-mostrar");
        formularioValido = false;
    } else {
        errorCorreo.classList.add("no-mostrar");
    }

    // Validar mensaje
    if (mensaje.length < 10) {
        errorMensaje.classList.remove("no-mostrar");
        formularioValido = false;
    } else {
        errorMensaje.classList.add("no-mostrar");
    }
    // Validar telefono, permitiendo vacío porque no es obligatorio, pero si 
    // tiene contenido se verifica el formato.
    const telefonoRegExp = /^\+?[0-9]{1,4}?[-.\s]?(\(?\d{1,4}\)?[-.\s]?){1,6}\d{1,4}$/;
    if (!telefonoRegExp.test(telefono) && telefono!="") {
        errorTelefono.classList.remove("no-mostrar");
        formularioValido = false;
    } else {
        errorTelefono.classList.add("no-mostrar");
    }

    // Si el formulario es válido, se puede enviar
    if (formularioValido) {
        alert("Formulario enviado correctamente. Gracias por contactarnos.");


        const formularioContacto = {
            nombre: nombre,
            correo: correo,
            telefono: telefono,
            mensaje: mensaje
        };
        //Una vez enviado se reenvía al index
        window.location.href = "../index.html";
    }
});
