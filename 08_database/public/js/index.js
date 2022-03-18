const socket = io.connect();

const addProduct = document.getElementById('addProduct');
addProduct.addEventListener('submit', e => {
    e.preventDefault();
    const producto = {
        title: addProduct[0].value,
        price: addProduct[1].value,
        thumbnail: addProduct[2].value
    }
    socket.emit('update', producto);
    addProduct.reset();
});

socket.on('productos', products => {
  addTable(products).then(html => {
      document.getElementById('productos').innerHTML = html;
  })
});

function addTable(products) {
  return fetch('../handlebars/products.hbs')
      .then(res => res.text())
      .then(plantilla => {
          const template = Handlebars.compile(plantilla);
          const html = template({ products });
          return html;
      })
}

//MY CHAT

let userName = sessionStorage.getItem("username");
if (!userName) {
  userName = prompt("Ingrese email");
}
$("#username").html(userName);

socket.on("messages", (data) => {
  console.log(data);
  if (data.lenght >0) {
    render(data);
  }
  else {
    document.getElementById("messages").innerHTML = "No hay mensajes"
  }
});

const render = (data) => {
  data.forEach((msg) => {
    $("#messages").prepend(`
      <div>
          <em class="text-primary fw-bold">${msg.email}</em>
          [<em style={"color: brown;"}>${msg.time}</em>]: <em class="text-success fst-italic">${msg.mensaje}</em>
      </div>
    `);
  });
}

$('#myChat').on('submit', e => {
  e.preventDefault();

  const message = {
    email: userName,
    mensaje: $("#text").val(),
    time: new Date().toLocaleString()
  };

  socket.emit("new-message", message);
});
