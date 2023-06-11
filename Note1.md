Topics

- File structure
- JSX
- Props - Use to Customizes an element
- Converting html => JSX
- Extracting Components
- Creating a Component
- Export and Import Statements

**File structure**

1. Index.js - file that gets executed when our app runs
2. Index.html - Skeleton of the React app
3. Package.json - list dependencies our app needs
4. package-lock.json - list dependencies our app needs
5. node-modules - contains dependencies our app needs

> > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > **index.js**

1. import the React and ReactDOM libraries
   `import React from 'react';`

   > Library that defines what a component is and how multiple components work together

   `import ReactDOM from 'react-dom/client';`

   > Library that knows how to get a component to show up in the browser

2. get a reference of div with id root
   `const el = document.getElementById('root');`

3. tell react to take control of the element
   `const root = ReactDOM.createRoot(el);`

4. create a component - Component is a function that returns some **JSX**
   `function App (){ <!--function declaration at the top** -->
   <!-- Here we write the code to compute values we want to show in our app -->

   return <h1>Hi there !</h1> <!-- content we want this component to show -->
   };`

5. show the component on the screen
   `root.render(<App/>);`

> > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > >

> **JSX - JavaScript XML** is not truly Javascript and browser don't have any idea what JSX is, So it pass through a tool **Babel** and translate it into the equivalent javascript

> _`Math.random()`_ to generate random number

> we can only print number and string to the JSX, but if we try to print boolean, null, undefined, object we'll get error
> if we try to print an array, we'll get unexpected result

# We most often use curly braces to show string or number

`function App(){
    const message = 'Hi there';
    return <h1>{message}</h1>;
}`

`function App(){
    const sum = 1+1;
    return <h1>{sum}</h1>;
}`

# Common Error : React cannot show an object as a text content

`function App(){
    const config = {color : 'red'};
    return(
        <div>{config}</div> <!--will give error in console-->
    )
};`

# to get current time

`function App(){
    const date = new Date();
    const time = date.toLocaleTimeString();
    return <h1>{time}</h1>;
}`

# JS Expression Shortcut

`function App(){
    return <h1>{new Date().toLocaleTimeString()}</h1>;
}`

> > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > **Props - Use to Customizes an element**

> props is a short form of properties

> > Difference b/w props and an html attributes

1. props can refer to a variable using the same curly braces syntax
2. We can do this for any kind of javascript value - string, number, array and soon and provide them as a props to different elements
3. We can pass multiple different props inside a single element

`function App(){
    const inputType = "number";
    const minValue = 5; 
    return <input 
    type={inputType}
    min={minValue}
    />;
}`

4. Props don't have to be defined as variables
   _Just wrap Strings with double quotes_
   _number, arrays, objects, variables with curly braces_
   **_We Cannot display an object but we can provide an object as a prop_**

`function App(){ 
    const message = 'Enter age';
    return <input 
    type="number"  
    min={5}
    max={10}
    list = {[1,2,3]}
    style={{color:'red'}}
    alt={message} 
    />;
}`

> > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > **Converting html => JSX**

1.  All prop name follow **camelCase**

- <input maxlength="5"/> => <input maxLength={5}/>
- <form autocapitalize/> => <form autoCapitalize/>
- <form novalidate/> => <form noValidate/>

2.  Number attributes use **curly braces**

- <input maxlength="5"/> => <input maxLength={5}/>
- <meter optimum="50"/> => <meter optimum={50}/>

3.  Boolean 'true'can be written with just the property name, False should be written with curly braces

- <input spellcheck="true" /> => <input spellCheck />
- <input spellcheck="false"> => <input spellCheck={false}>

4.  The class attribute is written as **className**

- <div class="divider"/> => <div className="divider"/>
- <li class="item"/> => <li className="items"/>

5.  In-line styles are provided as objects

- <a style="text-decoration: 'none'; padding: '5px';"/> =>
- <div style={{textDecoration: 'none', padding: '5px'}}/>

[JSX Cheat sheet](https://jsx-notes.vercel.app/)

> > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > >

**Extracting Components**

> Lot of stuff going on in index.js - hard to read

_index.js_

1. Import React and ReactDom
2. Import the App component
3. Create Root
4. Show the App Component

_App.js_

- Code to create a component

> > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > > >

**Creating a Component**

1. Create a new file.

- (By convention file name should start with Capital Letter)
- _App.js_

2. Make your component. Should be a function that return JSX
   `function App(){
    return <h1>Hi there</h1>;
}`

3. Export the component at the bottom of the Line
   `export default App;`

4. Import the component into another file
   `import App from './App';`

5. Use the component
   `<App/>`

> > > > > > > > > > > > > > > > > > > > > > > > > > > > > >

**Module System Overview**

- Variables aren't shared between files by default
- Variables shared between files by using _import_ and _export_ statements

- _index.js_ => `import App from './App'`
- _App.js_ => `export default App`

**Export Statements**

1. Two Kinds - 'default' and 'named'

_Default Export_

1. A file can only have a single default export
2. Two ways to write a default export

`function App(){
   return <h1>HI there</h1>
}
export default App`

`export default function App(){
   return <h1>HI there</h1>
}`

3. Default exports can be renamed in the importing file

_Named Export_

1. Use when exporting multiple variables
2. Can have as many named exports as we want
3. Two ways to write a named export

`function App(){
   return <h1>HI there</h1>
}
export default App
const message = 'hi'
export{ message}`

`export default function App(){
   return <h1>HI there</h1>
}
export const message = 'hi'` 
4. Named Export cannot be renamed

**import statements**
_index.js_
`import App,{message} from './App'`

1. Curly braces indicates we want a _named_ export
2. Single import statement can get both default + named exports


