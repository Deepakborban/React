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

# Installing RestClient extension in VS Code

- This rest client extension allows us to make requests to some server either on our computer or hosted somewhere online
- To make use of it.
  We're going to create a file inside of our root project directory _api.http_.

- Inside that we write little configuration like
  GET http://localhost:3001/books HTTP/1.1
  Content-Type:application/json
- It tells the rest client that we just installed that we want to make a request.
- In particular, we want to make a GET request to this address and we want to apply some options to the request as well,
  such as the HTTP version and a header of content type.

- As soon as we write out this configuration inside this file, the rest client that we just installed is going to read this contents and it's going to understand that we're trying to make a request.

- So the rest client that we just installed is going to display a little button right above that configuration that says send request.
- This button is going to appear inside of our code editor.

- When we click on that button, the rest client is going to take this configuration and make a request of a GET to look at 3001/books.

- It's then going to get a response and show the response on the right hand side of our code editor.

- Now the reason that we are using this rest client, this extension inside of our code editor is simply because we can create a file like the one right here that lists out all these different requests we might want to make.
- And that means that inside of our project, we can have this one file that can have documents for ourselves and other engineers, how they can work with our API.

# ECONNREFUSED 127.0.0.1:3001 Errors in VSCode

Some students are reporting the following error when making a request using VSCode:

"The connection was rejected. Either the requested service isn’t running on the requested server/port, the proxy settings in vscode are misconfigured, or a firewall is blocking requests. Details: RequestError: connect ECONNREFUSED 127.0.0.1:3001"

If so, students have found the following solution, to add a watch and host variable to the server command in the package.json:

"server" : "json-server --port 3001 --watch db.json --host 127.0.0.1"

- we do not make requests using React directly.
- React is only concerned with showing content on the screen.
- So to make a network request, we're going to install this third party library called **Axios**.
- This library is going to be responsible for actually making requests over to JSON server and then handling the responses.

- We're going to make our request off to JSON server.
- We're going to get the response.
- The response is going to contain the newly created book along with the ID that it was assigned.
- We're then going to take that response and add it into our books piece of state so we no longer are going to have to be generating our own random ID because it's going to be generated by JSON server for us.
