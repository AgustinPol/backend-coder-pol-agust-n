class Usuario {
    constructor (userName, lastname, books, pets) {
        this.userName = userName;
        this.lastname = lastname;
        this.books = books; 
        this.pets = pets; 
    }
}

const user1 = new Usuario("Agustín", "Pol", [{bookName: "El lobo estepario", bookAutor: "Herman Hesse"}, {bookName: "El alquimista", bookAutor: "Paulo Coehlo" }], ["Lalita", "Ragnar"])

const getFullName = () => {
    console.log(`User Name: ${user1.userName} ${user1.lastname}`)
}

const addPet = (petName) => {
    petName = "Roberta"; 
user1.pets.push(petName)
}

const countPets = () => {
    console.log(user1.pets.length);
}

const addBook = (bookName, bookAutor) => {
let newBook = {bookName, bookAutor}
user1.books.push(newBook)
}

const getBookNames = () => {
    const bookNames = []
    user1.books.forEach(book => {
    bookNames.push(book.bookName)
});
console.log(bookNames)
} 

getFullName();
countPets();
addPet();
addBook("Demian", "Herman Hesse");
getBookNames();
console.log(user1);
