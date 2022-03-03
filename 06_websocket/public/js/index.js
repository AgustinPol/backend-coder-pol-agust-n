let userName = sessionStorage.getItem("username");
if (!userName) {
  userName = prompt("Ingrese email");
}
$("#username").html(userName);

const socket = io.connect();

const render = (data) => {
  data.forEach((msg) => {
    $("#messages").prepend(`
      <div>
          <em class="text-primary fw-bold">${msg.author}</em>
          [<em style={"color: brown;"}>${msg.time}</em>]: <em class="text-success fst-italic">${msg.text}</em>
      </div>
    `);
  });
}

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

socket.on("messages", (data) => {
  console.log(data);
  render(data);
});

$('#myChat').on('submit', e => {
  e.preventDefault();

  const message = {
    author: userName,
    text: $("#text").val()
  };

  socket.emit("new-message", message);
});