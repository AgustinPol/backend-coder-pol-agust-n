// chat

const btn = document.getElementById('btnEnviarChat')
btn.addEventListener('click', e => {


    // prevengo que el formulario recargue la pagina al hacer submit
    // e.preventDefault()
console.log('envia msj')
    // armo la persona extrayendo los datos de los campos del formulario

    const email = document.getElementById('email').value
    const texto = document.getElementById('txtMensaje').value

    if(email==''){
        alert('Ingrese email');
        document.getElementById('email').focus();
        return
    }

    const cuerpo = {
        email: email, // document.getElementById('txtNombre').value
        fecha: new Date().toLocaleString(),
        mensaje :  texto,// document.getElementById('txtApellido').value
    }

    // envio la persona al servidor via socket
    socket.emit('chat', cuerpo);

    // limpio el contenido de los campos del formulario
    document.getElementById('txtMensaje').value = '';
})



socket.on('chat', mensajes =>{
    console.log(mensajes)
    if(mensajes.length>0){
        const mensajesHTML = mensajes
        .map(msj => `<span class='email'> ${msj.email} </span> <span class='fyh'> [${msj.fecha}] </span>  <span class='msj'>${msj.mensaje}</span>`)
        .join('<br>')
        document.getElementById('mensajes').innerHTML = mensajesHTML;
    }else{
        document.getElementById('mensajes').innerHTML = 'No hay msj';
    }
});