# Topics

1. State Update

# State Update?

- Render the component it is defined in all the components children

1. Find all the components that need to use this state.
2. Define the state in the lowest common parent.

# updating state of an array

`const [books, setBooks] = useState([]);`

- whenever we make an update to an array or an object.
- And that array or object is managed by our state system, we're going to make these updates in a very special fashion.
- So in order to update our books piece of state, we're going to apply the update with some special syntax.

  `const createBook = (title) =>{
    const updateBooks = [       <!--First, JavaScript is going to see the outer set of square brackets. That is a sign to JavaScript that we want to create a brand new array in memory.-->
        ...books,               <!--Second.The dot dot books that you see right there is a fancy little bit of syntax that means go and find the existing books piece of state.Go and find this existing array right here.Take all the elements from that old array and copy copy paste into this new array..-->
        {id:123, title:title}  <!--we create a new object and add it into the end of that array.-->
    ]
    setBooks(updateBooks); <!--We then take that brand new updated array, which is a completely new and separate array in memory,and we pass it off to the setBooks function.-->
};`

- Here we are doing 3 separate things

1. Create a new array
2. Copy all the element from the new array
3. Add new element to the end

`const [books, setBooks] = useState([]);`

- Is books an array or object ?

1. No - Great
2. Yes - you have to be very careful in how you update this piece of state

- Do not directly mutate/change/modify array or objects
  _Bad!!! Push modifies an array_

# [state update cheat sheet](https://state-updates.vercel.app/#Adding%20Elements)

# Adding data persistence with API Request

1. Create the API and understand how it works.
2. When app starts up, make a request to API to get the current list of books
3. When user create/edit/deletes a book, update the API, then update local data

# JSON server setup

1. Install JSON-server with NPM at the terminal. _npm install json-server_
2. Create a 'db.json' file. This is where data will be stored.
   after creating this file we have added
   `{
    "books": []
}`
   _books_ tells json-server that we want to store a list of 'books'
   _[]_ Book objects will eventually show up here
3. Create a command to run JSON server. _"server": "json-server -p 3001 --watch db.json",_ this we have written in package.json file
   _-p 3001_ - changes the port the server listens to
   _--watch db.json_ Tells the server to store data in db.json file
4. Run the command _npm run server_

# It now take two commands to start this project up

**npm run start** - start the react dev server
**npm run server** - start JSON-Server

# To create a Book

1.  We'll send the post request to _http://localhost:3001/books_
    slash books slash books because we added in the key of books inside DB JSON file.
    If this key was anything else, if it was something like photos or messages or something like that,
    we would update that route right there accordingly.
    inside the body of that request we'll include an object _{"title": "Harry Potter"}_
2.  We send this to JSON Server
3.  inside db.json it stores as below and it also give a id property as well automatically which starts at 1
    {
    "books":[
    {
    "id" : 1,
    "title": "Harry Potter"
    }

    ]

}

4. Once this object has been added into the JSON file, JSON server is going to send back a response of the entire object with the ID included.

# Fetching All Books

Request - Get http://localhost:3001/books
Response - [{},{},{},..........]

# Editing a Book

Request - Put http://localhost:3001/books/1
{"title":"Dark Tower"}
Response - {
"id":1,
"title":"Dark Tower"
}

# Delete a Book

Request - Delete http://localhost:3001/books/1
Response - {
"id":1,
"title":"Harry Potter"
}

- it would be great if we can make some requests just to test out the API and make sure that we understand how it works without having to write a whole bunch of React code.

- we can actually do that by using a piece of software called a **standalone API client**.
- A standalone API client is a program that you can install on your computer that you'll use to make requests to an API server either hosted on your computer or on some other machine on the internet.
- We use standalone API clients specifically for development and test purposes.
- Just so you and I as developers can understand how an API works and make sure it works the way we expect.

**standalone API client**

- Program used to make request to an API server , specially for development/test.
- There are many free API Clients.
- I am going to use one built into VSCode.

## Installing RestClient extention in VS Code
