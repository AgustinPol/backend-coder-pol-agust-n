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