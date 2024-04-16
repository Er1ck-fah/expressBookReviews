const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.param.username;
  const password = req.param.password;
 
 if(username && password){
    if(!isValid(username)){
        users.push({"username":username,"password":password});
        return res.status(200).json({message:"User successfully registred."});
    }else{
        return res.status(404).json({message:"User already exists!"});

    }
 }
  return res.status(404).json({message: "Unable to register user"});
});

// Get the book list available in the shop
public_users.get('/',async function (req, res) {

    try {
        const allBook = await JSON.stringify(books);
            res.json(allBook).status(200);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async function (req, res) {
    //Write your code here
    try {
        const bookByIsbny = await JSON.stringify(Object.entries(books).find(([isbn]) => isbn === req.params.isbn));
        return res.status(200).json(bookByIsbny);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
    try {
        const allBooks = await JSON.stringify(Object.entries(books).filter(([key,book]) => book.author === req.params.author));
        return res.status(200).json(allBooks);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
  }
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
    try {
        const bookByTitle = await JSON.stringify(Object.entries(books).filter(([key,book]) => book.title === req.params.title));
        return res.status(200).json(bookByTitle);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
  }
});

//  Get book review
public_users.get('/review/:isbn',async function (req, res) {
    try {
        const bookByIsbny = await Object.entries(books).find(([isbn]) => isbn === req.params.isbn);
        console.log(bookByIsbny.values);
        const data = bookByIsbny.title;
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
  }
});

module.exports.general = public_users;
