class Usuario {
    constructor (userName, lastname, books, pets) {
        this.userName = userName;
        this.lastname = lastname;
        this.books = books; 
        this.pets = pets; 
    }
}

let userName = "Agustín";
let lastname = "Pol";
let books = [
      {
      bookName: "El lobo estepario", bookAutor: "Herman Hesse"
      },
      {
      bookName: "El alquimista", bookAutor: "Paulo Coehlo"    
      }
    ] 
let pets = ["Lalita", "Ragnar" ];

let newUser = {
userName: userName,
lastname: lastname,
books: books,
pets: pets,
}

const user1 = new Usuario(newUser)

const petsArray = []; 

const getFullName = () => {
    console.log(`User Name: ${user1.userName} ${user1.lastname}`)
}

const addPet = (petName) => {
petsArray.push()
}

const countPets = () => {
    return petsArray.length;
}

const addBook = (bookName, bookAutor) => {
let newBook = {bookName, bookAutor}
}

const getBookNames = () => {
    
} 

getFullName();