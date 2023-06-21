Topics

1. HTTP Request and Response
2. Unsplash API documentation and understand how to use it
3. Making an Http request - To make request, we commonly either use **Axios** or **Fetch**
4. async and await
5. Data fetching Cleanup
6. How Does data flow through a react app
7. Child to parent communication ? (Parent to child we can do using props)
8. Handling Form submission
9. Handling input event
10. To Apply update - we use _Key prop_

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

- using **onSubmit={}** we listen for the submit event
- but
  `<form>
  <label>Email</label>
  <input name="email">

  <label>Password</label>
  <input name="password">

  <button>Submit</button>

  </form>`

- Whenever user presses the submit button or select the text in input and press enter key, some automatic behavior inside the browser would kick in so the browser will not only triggers a submit event on the form, it also does something else

- it collect all the info from the input inside this form and then make a network request with them
  `myapp.com?email=dborban0002@gmail.com&password=deepak8959`

- If we were making a normal static HTML website, so if we were not using React at all, we could set up our server to watch for requests like this and never we receive a request like this.
- That would be a sign that some user just filled out a form and clicked on the submit button.
- And this would work even if our user was not making use of JavaScript at all.
- So again, this is normal form submission inside the browser.

# We don't really want that behavior.

- So we want to prevent this normal behavior.
- We want to tell the browser, don't go through that extra process.

- So to prevent that.
- Back over here at our handle form submit.
- I'm going to receive the event object.
- Remember, any time we wire up a event handler on a plane element, we're always going to have our event handler receive that event object.
- It always gets passed in.
- We don't always have to actually receive it.
- It's not a requirement, but it's always there if we want to use it.
- When we are handling a form submission event, we can disable all this automatic stuff going on by calling **event.preventDefault();**

- So that's going to disable all the form input collection.
- You're not going to try to make a request to that URL.
- And this is going to prevent your browser from trying to effectively.
- What happens is the browser tries to reload the current page and that's why the console log is disappearing.
- The console log appears for half a second and then the form submission occurs and the console log goes away because the page is reloading.
- So event prevent default is going to entirely stop that process.

`function SearchBar() {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('I need to tell the parent about some data.')
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input />
      </form>
    </div>
  );
}
export default SearchBar;
`

- So given this kind of difficulty or the fact that we have to add in this prevent default line, is it worth using a form element at all to detect this Enter Key Press.
- The answer is yes, because if we were not using a form and we wanted to allow user to submit this thing or trigger some behavior whenever they press, either enter or click on the button, we would have to wire up to different event handlers by using a form element.
- We only have to wire up a single one, and that single event handler will detect the enter or a button click.
- So having to add in that extra line of code is absolutely worth it.
- It just makes life easier, even though we have to put the extra line in there.

# Handling input event

- We can get the value out of the input by doing something like this.
  `
  import { useState } from "react";
  function SearchBar({ onSubmit }) {
  const[term, setTerm] = useState('');

  const handleFormSubmit = (event) => {
  event.preventDefault();
  onSubmit(
  document.querySelector('input').value; **Never EVER EVER DO THIS**
  );
  };
  return (
  <div>
  <form onSubmit={handleFormSubmit}>
  <input />
  </form>
  </div>
  );
  }
  export default SearchBar;
  `

- So at first glance, it appears that this code is working A-OK.
- No problem whatsoever.
- And to be fair, that is correct.
- This absolutely does work.
- # Regardless, here's the gotcha.
- # Never, ever write code like this in particular.
- # We're never, ever going to try to reach directly into an input element and read its current value out.

- If you have taken any course or done any work around playing JavaScript and playing HTML, you will see code like this all over the place for working with an input.
  You'll see code where you try to reach directly into an HTML element and read some value out of it.

- This is not how we do things in the world of React.

- # So if you ever write out some code like this on a job interview, I can guarantee you you will be rejected.

So now the question becomes, well, then what do we do ?

- The way in which React handles form controls like a text input, checkboxes, radio buttons, selects and so on are a little bit strange, a little bit weird.

# Why is it this way? Why can't we just write out this very simple code like this right here?

- And the answer is, Well, when we're trying to simply read a value out of an input and just make use of it in a very basic way.
- Yes, the code we have to write is a little bit overboard.
- There's a lot of stuff going on.
- But as soon as we start to add in more advanced features into our components, as soon as we want to
- work with that input in a more advanced way, like add in text validation format, the text inside the input, anything like that.
- Then the way in which React handles these elements starts to become very convenient.

# Handling text input

1. Create a new piece of state.
2. Create a event handler to watch for the 'onChange' Event.
3. When 'onChange' event fires, get the value from the input.
4. Take the value from the input and use it to update your state.
5. Pass your state to the input as the value prop.

`import { useState } from "react";
function SearchBar({ onSubmit }) {
const[term, setTerm] = useState('');

const handleFormSubmit = (event) => {
event.preventDefault();
};
const handleOnChange = (event) => { **event object is automatically pass to every event handler that we assign to a plain HTML element**
// console.log(event);
console.log(event.target.value); **From _event.target.value_ gives us whatever is currently there in input**
}
return (

<div>
<form onSubmit={handleFormSubmit}>
<input  onChange={handleOnChange}/>
</form>
</div>
);
}
export default SearchBar;
`

- So we'll remove the console.log and replace it with setTerm and pass the term to the input value

`
import { useState } from "react";
function SearchBar({ onSubmit }) {
const[term, setTerm] = useState('');

const handleFormSubmit = (event) => {
event.preventDefault();

};
const handleOnChange = (event) => {
// console.log(event);
setTerm(event.target.value);

}

return (

<div>
<form onSubmit={handleFormSubmit}>
<input value={term} onChange={handleOnChange}/>
</form>
</div>
);
}
export default SearchBar;
`

- So now imagine what that does.
- Now, every single time user changes the input in any way that function is going to run.
- We're going to update our states with whatever value is inside the inputs.
- And every single time, remember that we call a set function.
- It causes our component to re render.
- So in total, that means our component is now re rendering with every single key press.
- That seems a little bit overboard, doesn't it?

**Why we did all this stuff**
<input value="Hi there"/> <!--Force the input to always display Hi there and nothing else-->
<input value={term}/> <!--input will display what ever is there in current term piece of state value is -->

# What happens when user types input

1.  [User types in input] **_a_**
2.  (Normal Browser behavior [Browser update the text in the input] => [Browser Trigger an event to say the input was updated])
3.  [We read the value from the input, update state] **_setTerm('a')_**
4.  [state update! component rerenders]
5.  [We provide 'value' prop to input - react changes the input's value] **_term === 'a'_** **this is the weird part that react again reassigning the same value that user has passed**
6.  Back to 1

**Why??**

1.  Need to read the value of the input?
2.  Need to update the value of the input?
    **Component re-render with the every keypress - Makes Super easy to add in more advance feature now**

_For Example lets add some additional features to input_

1.  Whenever a user comes to this form, I want the input element to have a default value of cars.
    How would I change that?

- So when I say I want this input to have a default value, what I'm really saying is I want my term piece of state to have a default value.

`const[term, setTerm] = useState('cars');` <!--Done we have assigned default value cars to the term-->

2. I just want to print whatever value I user types inside of here, right above the inputs.
`<form onSubmit={handleFormSubmit}>
You have typed {term}
<input value={term} onChange={handleOnChange}/>
  </form>
</div>`

3. A user is going to be displayed with an error message or they're going to see an error message.
   If the search term that they enter is fewer than three characters

`<form onSubmit={handleFormSubmit}>
You have typed {term}
<input value={term} onChange={handleOnChange}/>
{term.length < 3 && 'Term must be longer'}

  </form>
</div>`

4. we now only want a user to be able to search for numbers for some crazy reason.
   And so they should not even be able to type letters inside of here.

- The only place where we update the term piece of state is right here in handleChange handler
  So I'm going to say whenever we go to update that piece of state, take the current value out of the inputs so whatever the user just typed and replace Anything that is a lowercase letter, Just make it easy with empty string.
  `
const handleOnChange = (event) => {
  setTerm(event.target.value.replace(/[a-z]/, ''));
}`

_That is why we go through all this extra trouble so that we don't even have to consider the input anymore._
_The input almost doesn't even exist._
_We completely manage the value of the inputs by using the state system._
_And by using the state system, it becomes super easy to update the value inside the input by calling set term._
_And we can always figure out what the current value of the input is by looking at the term piece of state._

# Warning: Each child in a list should have a unique "key" prop.

# To Apply update we use _Key prop_

- We do step 1 and react does 2,3

1. Apply a **key** to each element during the mapping step
2. After re-rendering , compare the keys on each ImageShow to the key from the previous render
3. Apply minimal set of changes to existing DOM elements

# Requirements for keys

1. Use whenever we have a list of elements _(so every time we do a map)_
2. Add the key to the **top most JSX element in the list**
3. Must be a string or number
4. Should be unique for this list (Almost all the lists we ever create will be build by mapping over an array of objects fetched from a database, this object will have a unique 'id' This is perfect key to use)
5. Should be consistent across renders

`import ImageShow from "./ImageShow";
function ImageList({ images }) {
const renderedImage = images.map((image) => {
return <ImageShow key={image.id} image={image} />; <!--Because we are building up a list of elements, we need to apply a key prop to the top most element inside of that list.-->
});

return <div>{renderedImage}</div>;
console.log(images);
}
export default ImageList;`

_if we add a html tag on top so remember **move the key** on top_
`import ImageShow from "./ImageShow";
function ImageList({ images }) {
const renderedImage = images.map((image) => {
return <div key={image.id}>
<ImageShow image={image} />

</div>
});

return <div>{renderedImage}</div>;
console.log(images);
}
export default ImageList;`

# why we added that code in.

- Beyond the fact that, hey, we want to make list updates efficient.

- First off, any time we build a list of elements.
- So any time we do a mapping function, any time that we do a for loop, any time that we build up an array of elements and then try to display them on the screen, we are going to add in a key property.
- So we're going to think about adding in Keys all the time for just about every application we ever work on.

# Don't have an id ?

1. Use the index of the record but this will lead to bug as you update the list
`function App(){
const value = [];
for(let i=0; i < 5; i++){
values.push(<div key={i}></div>)
}
return (
  <div>{values}
  </div>
);
}`

2. Generate a unique ID your self
