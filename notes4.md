Topics

1. HTTP Request and Response
2. Unsplash API documentation and understand how to use it
3. Making an Http request - To make request, we commonly either use **Axios** or **Fetch**
4. async and await
5. Data fetching Cleanup
6. How Does data flow through a react app
7. Child to parent communication ? (Parent to child we can do using props)

# HTTP Request and Response

- _From Our App_ Whenever user presses the enter key we are going to make a network request over a public server _Unsplash API_

- That API going to send back response to us that is going to have an array of objects
- Each of these objects represents some kind of image, so it will have maybe an ID for an image, a description,and perhaps a couple of links to the image in different quality.
- So we're going to take those links and display them on the screen to the user.

- **Unsplash** - is a company that does image hosting online, they make a free API though we can search for some images related to some search term

- **Request** - Can you give me some images related to the term 'car'?
  You could think of a request and a response as being like a little text message with a very special format.

  _Both requests and responses are divided into three separate parts._

1. _Request Line_ - GET https://api.unsplash.com/images/search HTTP/1.1
   The request line is going to contain the URL that we want to make a request to.

2. _Headers_ - Accept-Version:v1 Authorization: Client-ID ABC123

- We can add on a bunch of different headers that are going to customize the request in some way or provide
- some additional information over to the server that's going to receive the request.
- In many cases, we're going to use headers to provide authentication or to tell the server who we are

3. Body

- **Response** - Here is an array of objects, each object has info about the image

1. _Status Line_ - HTTP/1.1 200 OK
2. _Headers_ - Content-Length: 1000 Content-Type: application/json
3. _Body_ - [{id:'123'}]

- In many cases, the body is going to contain the information that we were looking for when we originally made the request.

- React itself has no tools, no objects, no functions, nothing whatsoever for making HTTP requests.
- React only cares about showing content and handling user events
- This is kind of GOOD! We can write a lot of business logic + data fetching without worrying about react

# Request Methods - Indicates the general goal of the request

**GET** - Get some information from the server
**POST**- Tell the server to create some new records
**PUT** - Completely update an existing record
**PATCH** - Partially update an existing record
**DEL** - Delete a record

# HTTP Status Code - indicated weather or not the request was successful

**200** - Request was successful here is the data you are looking for
**201** - Record was created
**204** - Record was Deleted
**301** - URL you made request has changed
**400** - Something about your request is bad (incorrect request or similar)
**401** - Unauthorized you must provide authentication details
**403** - Forbidden. you aren't allowed to access this
**404** - Not Found. The thing you are looking for was'nt found
**500** - Internal server error. something on the server went wrong

- Whenever we make a HTTP request, we are reaching out to some other server across the Internet and that is always going to take some amount of time.
- It might take a couple of milliseconds and might take several seconds or potentially even several minutes.
- Although that is rather rare.

# Time Diagram

1. User enters a search term and press enter
2. Make a request to API
   ------Time Passes............
3. Get a response.
4. Use the response in some way.

`const fetchData = ()=>{
    const response = makeRequest(); <!--JS Starts the request...-->
    console.log(response);  <!--...then instantly run this line-->
};`

- So if you write out code that looks like this JavaScript is going to start the request and then it's going to instantly as fast as possible, run the console log.
- If we run the console.log right away, we're not going to have a response yet because we have not given the request time to actually finish and get a response back.
- So we might see a console log of undefined or something like that, something not quite what we expected,

_Probably not good!_
JS dosen't automatically pause when you make a request Response hasn't ben received yet!

- So what we're going to eventually do is add in a little bit of additional syntax.
- It's not going to look like what you see right here, but this is the general idea.

`const fetchData = ()=>{
const response = makeRequest(); <!--JS Starts the request...-->
Dear JS, please wait until we get a response before continuing on to the next line of code <!--Tells JS to wait for a response -->
console.log(response); <!--...then instantly run this line-->
};``

_Probably need something like this_
Don't try to work with the response until it has actually been received.

# [Unsplash API documentation and understand how to use it](https://unsplash.com/developers)

1.  Sign up for an account
2.  [create an 'app' to get an Access key](https://unsplash.com/oauth/applications/456695)
    _Access key_ allows us to make request to their api and get back some data
3.  [Take a look at docs to understand the request we'll make](https://unsplash.com/documentation)
    schema -> Location
    authorization -> public authentication
    search -> search photos

# Making an Http request

- React itself has no tools, no objects, no functions, nothing whatsoever for making HTTP requests.
- To make request, we commonly either use **Axios** or **Fetch** libraries of Javascript
- In this course we are going to use Axios its easier to get start with

1. Install Axios _npm install axios_
2. import axios library _import axios from 'axios'_
   axios library is a object that has couple of function associated to it, this different functions allows us to make an http request with different methods

   `axios.get(url, { headers:{...}, params:{...}, });`

- _get_: request method can be 'get', 'post', 'del', etc
- _url_: where we want to make the request to
  _headers_: contains headers that we want to add into the request
  _params_: contains key and value pairs that will be turned into a query string and added to the url

_So our request looks like_
`axios.get('https://api.unsplash.com/search/photos', { 
    headers:{
        Authorization: 'Client-ID P-iSv3Pf_EUgtnlWjPnJ3f6jLfl5Abkhwv1Wn7Zn590'
    }, 
    params:{
        query: 'cars'
    },
});`

# async and await : _we use this to tell JS to wait for the request to finish before moving on_

- await tells JS to wait for a response
- async key word is a little requirement to use await keyword
- So if you want to use the await keyword inside the function you must mark the inclosing function with the async keyword
  `import axios from "axios";

const searchImage = **async** () =>{
const response =**await** axios.get('https://api.unsplash.com/search/photos', {
headers:{
Authorization: 'Client-ID P-iSv3Pf_EUgtnlWjPnJ3f6jLfl5Abkhwv1Wn7Zn590'
},
params:{
query: 'cars'
},
});
console.log(response);
return response;
}
export default searchImage;`

# Data fetching CleanUp

`import axios from "axios";

const searchImage = async (term) =>{
const response =await axios.get('https://api.unsplash.com/search/photos', {
headers:{
Authorization: 'Client-ID P-iSv3Pf_EUgtnlWjPnJ3f6jLfl5Abkhwv1Wn7Zn590'
},
params:{
query: term,
},
});
console.log(response.data.results);
return **response.data.results**;
}
export default searchImage;`

# How Does data flow through a react app

1. Where do we do data fetching ?
2. Where do we define state?
3. How do we share info between components?

_parent_ => App
_childs_ => SearchBar, ImageList
_siblings_ => ImageShow, ImageShow, ImageShow....

**Facts of this app**

- **term** The search bar components contains the text input a user will type into.
  _term_ generate from _SearchBar_
- The user pressing enter key in that text input, means we need to do a search.
- **searchImages()**We have a function that will turn a search term into an array of image objects.
- **images**The array of image objects need to get into the ImageList component.
  _images_ should end up in ImageList component

Where do we call the _searchImage() ?_
there are 2 Options

1. SearchBar [term] =>searchImages() => images => ImageList => ImageShow

# Bad! Sibling Components cannot directly communicate , because they don't know that other one exists

- So only option is

# Good! To share info between sibling components, we have to involve the parent

2. SearchBar [term] => App [searchImages()] => ImageList [images] => ImageShow

So We need to pass the term back to parent from child

From parent to Child We can use _Props system_ so App can send the list of images down ImageList using props

But When the user presses 'enter' key we need to get this search term up to the App

# Child to Parent
1. To communicate from child up to parent
2. Treat it like a normal event !
3. Pass an event handler down 
4. Call handler when something interesting happens.

_App.js_
`import SearchBar from "./components/SearchBar";
function App() {
  const handleSubmit = (term) =>{
    console.log('Do a search with', term);
  };
  return (
    <div>
     <SearchBar onSubmit={handleSubmit}/>
    </div>
  );
}
export default App;
`

_SearchBar Component_
`function SearchBar({onSubmit}){
    const handleClick = () =>{
        onSubmit('cars')
    }
    return <div>
    <input/>
    <button onClick={handleClick}>Click me</button></div>
}
export default SearchBar;`


# How to check that user entering something in put and pressing the enter
# Handling Form submission
`<form>
    <input />
</form>`
- By creating this HTML structure right here
- By placing a form with an input element inside of it, we are tapping into some power directly coded inside your browser.
- So this has nothing to do with React, has nothing to do with JavaScript.
- This is entirely a standard thing inside of HTML.
- If you ever place an input element inside of a form element and then select that input element and press the enter key, some automatic behavior inside your browser is going to kick in.
- In particular, your browser is going to cause this form element to automatically trigger a very special event called a submit event.
- So we can listen for this submit event.
- And if we ever receive the submit event, that is a sign to you and I that the user just press the enter key.
- And that's how we're going to detect the user pressing the enter key.
