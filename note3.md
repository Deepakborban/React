Topics

1. Event System - Detect a user clicking the button, dragging an element, typing and soon
2. What is the Difference between doGreeting and doGreeting()
3. State system - Update content on the Screen
4. Rerendering Process
5. Array Destructuring
6. Rest and Spread Operator
7. Map
8. map()

   **App Hierarchy**
   _Parent Component_ => App.js
   _Child Component_ => AnimalShow.js

**Event System - Detect a user clicking the button, dragging an element, typing and soon**
[React Events](https://reactjs.org/docs/events.html)

`function App(){

1. Decide what kind of event you want to watch for

- Event name = onclick called when = user clicked on something
-               onChange             user types in a text input

2. Create a function Usually called an event handler or callback function
3. Name the function using pattern of handle + EventName (Not a requirement! community convention)

   const handleClick = () => {
   console.log('Button was clicked!!');
   };

4. Pass the function as a prop to a plain element
5. Make sure you pass the function using a valid event name ('onClick', 'onMouseOver' etc)
6. Make sure you pass a reference to the function (don't call it)

return (<div>
<button onClick={handleClick}>Add Animal</button>

  </div>);
}`

**What is the Difference between doGreeting and doGreeting()**
`const doGreeting = () =>{
   return 'hi there';
}
console.log(doGreeting );  <!--Logs the 'doGreeting' function Does not call it-->
console.log(doGreeting()); <!--Immediately calls 'doGreeting' function and logs the return value-->
`

`function App(){
   const handleClick = () =>{
      console.log('button clicked');
   };
   return(
      <div>
      <button onClick={handleClick}>Add Animal</button> <!--Good - Gives the button the whole function so the button can call the function in the future when button is clicked-->
      </div>
   );
}`

_what if we write_ <button onClick={handleClick()}>Add Animal</button> <!--Probably Bad - Immediately calls 'handleClick' and give the button the return value-->

_We can also write like this_
`function App(){
   return(
      <div>
      <button onClick={function () {
         console.log('Button was clicked');
      }}>Add Animal</button> 
      </div>
   );
}`

_also using arrow function_
`function App(){
   return(
      <div>
      <button onClick={ () =>{
         console.log('Button was clicked');
      }}>Add Animal</button> 
      </div>
   );
}`

_we can remove {} from arrow function as well_
`function App(){
   return(
      <div>
      <button onClick={ () =>console.log('Button was clicked')}>Add Animal</button> 
      </div>
   );
}`

_Why we pass just an arrow function_

- we'll see this very often when we pass an event handler which is very very small

**State system - Update content on the Screen**

- _State_ is data inside our component that changes over time as user interacts with our application by typing clicking and soon
- When this data changes, React will update content on the screen automatically
- This is the one and only way through which we can change what content react shows

- _TODO_ =>count = 0 => user clicks =>count = 1 => user clicks =>count = 2 ................Soon
- _TODO this we need_

1. Some kind of count variable
2. Should start with value of 0
3. Add 1 when user clicks
4. Whenever the value is changed **Rerender** - updated the value on the screen

`import {useState} from 'react'; <!--The useState function is given to us by react so we need to import it from react lib when ever we want to se it-->
function App(){
const[count, setCount] = useState(0); <!--1. Define a piece of state with the useState function-->

   <!--2. Give a value to useState function. this is the default, starting value of our piece of state-->

const handleClick = () =>{
setCount(count + 1); <!--4. when user does something, update the piece of state, causes react to rerender the component-->
};
return(

<div>
<button onClick={handleClick}>Add Animal</button>
<div>Number of animals: {count}</div> <!--3. Use the state in some way in our component (often in the returned jsx)-->
</div>
);
}`

- A single component can have 0 calls to useState
- it can have 1, 2, 3, 4, ......... as many as we want usually we'll see only 4 but that is not a hard limit
  `function App(){
   const[count, setCount] = useState(0); 
   const[value, setValue] = useState(0); 
   const[animal, SetAnimal] = useState(0); 
   const[counter, setCounter] = useState(0); 
   const handleClick = () =>{
      setCount(count + 1); 
   };
   return(
      <div>
      <button onClick={handleClick}>Add Animal</button>
      <div>Number of animals: {count}</div> 
      </div>
   );
}`

- `const[count, setCount] = useState(0);`
- _[count, setCount]_ is **Array Destructuring**. Fancy way to get access to the piece of state + setter
- _count_ The piece of state! Starts as 0, changes over time.
- _setCount_ Setter function. **_used to update our piece of state, We'll never going to change the piece of state directly by writing something like *count = 20* instead of this will do *setCount(123)*_**
  If we ever want to update a piece of state, we have to use the setter function.
  The reason is extremely simple.
  React is not magic and it doesn't understand when you update some variable like say animals for react.
  To understand that you are changing a piece of state, you have to use the setter function because otherwise it just doesn't know that an update is occurring.
- _(0)_ Default value for the piece of state, if we change it to (99) then our counter will start from 99

**Re-rendering Process**

- count = 0 by default => First time component is Rerendered
- button click call handleClick => which call setCount => which update the count value to 1=> oh you updated a piece of state! Rerender time!
- button click call handleClick => which call setCount => which update the count value to 2=> oh you updated a piece of state! Rerender time!

**Array Destructuring**
`const[count, setCount] = useState(0);`

- These square brackets here are making a use of javascript feature called array destructuring, it is not something specific with react

_what is it? Why do we care about it?_
`function App() {
function makeArray() {
return (1, 10, 32, 40);
}

   <!-- Next, I want to try to get access to this array, and I want to declare two variables. -->

const myArray = makeArray(); <!--So that's just going to get us access to the array.-->

   <!-- These two variables are going to point at the first element in the array and the second element in the array -->

const firstElement = myArray[0];
const secondElement = myArray[1];
console.log(firstElement, secondElement); <!--o/p - 1 10-->
}`

- So this is one possible way that we can get access to the first two elements inside of an array.
  But I just want to point out, it's really tedious.
  There's a lot of code here.

- So a array destructuring allows us to write out exactly what you see right there, but in a far more compact way.

`function App() {
   function makeArray() {
      return (1, 10, 32, 40);
}
const[firstElement, secondElement] = makeArray() 
console.log(firstElement, secondElement); <!--o/p - 1 10-->
}`

- Firstly, I want to clarify here is that the square brackets on the left hand side do not create an array.
- No array is being made here.
- Instead, the square brackets are assigned to JavaScript.
- They say assume that whatever is on the right hand side of the equal sign is an array.
- So assume that this is an array.
- If it is an array, then take the first element out of there and assign it to a brand new variable called first element.
- Then take the second element out of that array and assign it to a brand new variable called second element.

_So Array Destructuring is a little shortcut._
_why is it used with used state?_
_Why does useState return an array at all?_

`const[count, setCount] = useState(0)`
`console.log(useState(50))`

o/p = _[50, f()]_

- So we get back an array with two elements inside of it.
- The first element is our default value.
- So 50, that's the starting value of our piece of state.
- And then the second element is a function that is our setter function.

**Rest Operator - is to combine**

- Rest operator takes variable number of parameter/arguments and combine it into a single array
  syntax ...nameofarray

`let displayColors = function(...colors){
   console.log(colors);
}
displayColors('red');   <!--o/p: [red]-->
displayColors('red', 'blue'); <!--o/p: [red, blue]-->
displayColors('red', 'blue', 'green'); <!--o/p: [red, blue, green]-->
`

- Rest operator is specified in the function declaration

**Spread operator - is to split**

- takes an array and splits them into a single elements

`let displayColors = function(...colors){ <!--Here it is expecting single elements-->
   console.log(colors);
}
let colorArray = ['red', 'blue', 'green']; <!--but here we have array-->
displayColors(...colorArray); <!--so now here our array got spread into single elements-->
`

- Spread operator is specified during the function call and 3 dots remains the same

**map**

- In ES2015 map is the ordered list of key and value pairs and in maps both the key and value of any type unlike objects where the type of the property is always string

_To create new map_
`let myMap = new Map();`

_To add an item we use **set method** and within parenthesis we pass key and value_
`myMap.set("fname", "Deepak");`

_We can also have numeric value_
`myMap.set("age", 30);`

_To retrieve the value we use **get method** by passing key_
`console.log(myMap.get("fname")); `<!--o/p: Deepak-->

_We can also use objects as keys within the maps_
`let ob1 = {};
let ob2 = {};
myMap.set(ob1, 10);
myMap.set(ob2, 20);
console.log(myMap.get(ob1)) <!--o/p: 10-->`

_We can use the **size property** to know how many key value pairs present in the particular map_
`console.log(myMap.size);` <!--So right now we have 4 key and value pairs therefore o/p: 4-->

_we can use **has method** to check if the key exist in a map_
`console.log(myMap.has("fname"))` <!--o/p: true-->

- if it didn't exist it will return false

_We can also have delete method to remove a key value pair_
`myMap.delete("fname");`
`console.log(myMap.size);`<!--o/p: 3-->
`console.log(myMap.has("fname"))` <!--o/p: false-->

_We clear method that removes all the key value pairs from a map_
`myMap.clear();`
`console.log(myMap.size);`<!--o/p: 0-->
`console.log(myMap.has("fname"))` <!--o/p: false-->

_There is another way to add key value pairs to a map_

- that is by using arrays during map initialization
  let myMap = new Map([
  ["fname", "Deepak"],
  ["Lname", "Borban"]
  ]);

_How to iterate through this new array_

- if we need to iterate only keys of the map,then we use of map.keys method in for of statement
  `for(let key in map.keys()){
   console.log(key); <!--o/p fname   lname-->
}`
- if we need to iterate only values of the map,then we use of map.values method in for of statement
  `for(let value in map.values()){
   console.log(value); <!--o/p Deepak   Borban-->
}`

- if we want to iterate through both keys and values of the map,then we use of map.entries() method in for of statement
  `for(let entry in map.entries()){
   console.log(`${entry[0] -> ${entry[1]}}`); <!--o/p fname -> Deepak   lname ->  Borban-->
}`

_We can also use Destructuring for the same cause_
`for(let [key, value] in map.entries()){
   console.log(`${key} -> ${value}`); <!--o/p fname -> Deepak   lname ->  Borban-->
}`

- In ES5 we have the foreach loop to iterate over array element
`var numbers = [2, 4, 6, 8];
numbers.forEach(arrayFunction);
function arrayFunction(element,index,array){
   console.log("arr["+index+"]= "+element)
}`
<!--o/p
 arr[2]=2
 arr[1]=4
 arr[2]=6
 arr[3]=8-->

- Now foreach loop worked pretty well in ES5 with arrays
- So in ES2015 they decided to have the foreach loop with maps and sets as well

**Maps in ES2015**

`let myMap = new Map([["fname", "Deepak"],   <!--myMap contains 2 key, value pairs-->
                      ["lname", "Borban"]]);
myMap.forEach(mapFunction);  <!--similar to array we called foreach loop on the map and we have the function passed into the parenthesis-->
function mapFunction(value,key,callingMap){  <!--this mapFunction again except 3 parameters value = Deepak and Borban, key = fname and lname,  callingMap - the map on which map function is called -->
   console.log(key+" "+value);
   console.log(myMap === callingMap);
}`

<!--O/P
fname Deepak
true
lname Borban
true  -->
