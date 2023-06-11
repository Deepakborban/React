Topics

1. How to make reuseable components and build app, out of them
2. Communicating Information from _Parent Component_ to _Child Component_ we use **Props**
3. Destructuring from the argument
4. Adding images to the component
5. Adding Css using Bulma

**How to make reuseable components and build app out of them**

> Anytime inside react project if you see different elements that looks identical/similar that is a sign that you should create a reuseable component and reuse that component several times

_To make this we have 2 options_

1. All JSX written out in the App component **Probably not good**
   `function App(){
    return(
        <div>
        <h1>Digital Assistants</h1>
        <div>
            <img/>
            <h3>Alexa</h3>
        </div>
        <div>
            <img/>
            <h3>Cortana</h3>
        </div>
        <div>
            <img/>
            <h3>Siri</h3>
        </div>
        </div>
    );
}`

2. Make a reuseable component that show single card

_ProfileCard component_
`function ProfileCard(){
    return(
        <div>
            <img/>
            <h3>........</h3>
        </div>
    );
}`

_App Component_
`function App(){
    return(
        <div>
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
        </div>
    )
}`

**Challenge** : need to figure out how to get each ProfileCard to show different image and text
here
_Parent_ => App
_child_ => ProfileCard
and all 3 ProfileCards in between is _Siblings_

- So we need to pass the information from _App_ to _Child Components_

**Communicating Information from _Parent Component_ to _Child Component_**

1. For this we use Props

- Props System

  1. Pass data from parent to a child
  2. Allows a parent to configure each child differently (Show different text, different styles, etc)
  3. one way data follow. Child can't push props back up

* Communication with props

  1. Add attributes to a JSX element
     _Parent Component_
     `function App(){
  return <child color="red"/>
}`
  2. React collects the attributes/Props and puts them in an object
     Prop object => _{color:'red'}_

  3. Props object show up as the first argument to the child component function
     _Child Component_
     `function Child(props){
    return <div>{props.color}</div>
}`
  4. we use the props however we wish
  `return <div>
  {props.color}
  </div>`

**Destructuring from the argument**
**_there is a Advance feature of java script and is nothing to do with react_**

- right now in our _child component_ we need to write **props.** every time we use it which is extra efforts of key strokes

_solution to this_

1. create variable
   `const title = props.title;`
   `const handle = props.handle;`

- now use only title and handle instead of props.title and props.handle
- but this is also 2 extra lines of code

2. Replace this 2 lines of code with a single line
   `const {title, handle} = props`

- this is 100% equivalent to above 2 lines
- this create 2 new variables title and handle and their values is taken by props object
- but why to write this additional line as well

3. Use Destructuring feature
   `function ProfileCard({title, handle}){
    return (
        <div>{title}</div>
        <div>{handle}</div>
    );
}`

- So this is 100% equivalent to above 2

  - this means take that first argument that is coming into our argument
  - create new variables called title and handle
  - and assign them the values of props.title and props.handle

        - This is mostly used because there are many scenarios where we don't make use of entire props object
        - we still receiving the whole object but we don't care of all the properties inside of it
        - we might care of some particular properties

  **Adding Images to the component**

1. import the image
   `import AlexaImage from './images/alexa.png'`
   `import SiriImage from './images/siri.png'`

- Here What AlexaImage is ?
- What contains inside this ?
- is it an image or reference to image?
- what are we really getting ?

* to see this after this import write `console.log(AlexaImage)`
  **Below is the output what we are getting in console for Alexa**
  data:image/png;base64,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

* **o/p for Siri**
  /static/media/siri.e6a70a555204b3a1f6f0.png
  data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEUFoNH///7///8Am88AntAAndAAmc7Y8Pew3e1Qt9yb0ugAotIAmM6/4/D8//5cu94bp9Ty+/2AxuKUzean2Ow0r9jh8vhGstrq9/q54O/O6vR8xeLK6PP1+/yIy+Xf8fdqwOCo2uxaut3a7PVIr9gjq9ax2OuOyeRxvd7dvMkzAAANtklEQVR4nO1daXeiMBSl2RQQDbILqG112v//CycJSVhVRK2tJ/fDzCno412SvLwliRao4AWriLqu9RJwabQKPMnMEv+GlGCE0LM1uxsYF0xoqBn6CXy2Sg8BTPyKoU/xs3V5EDD1BcPkVQkyiglnGL5mF60AQ8aQPluLh4ICyyPPVuKhIJ4VvO4o5MCBtXqdWXAIaGVFL84wsuiLM6TWi7iiJ/Hq/AwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDK4HrvC6K+TQfsuRu69KEW/l3o3sVVeMwzl44wAzw/CvwjD8+zAM/z4Mw78Pw/DvwzD8+zAM/z4Mw18PhDGEhGD2P4FwYMfpCIaIiYAYIUhgL9eBBE59ceAWQkIhyE8VgH1514HLiPJgvol9jrh4X/PTF9ofusQQQZgE2UxI2HmOjWFTAHQ5LDLw6hBB/B5q3GIKLY6rr7DYpVxcOpsHCYSTSWIrCWcyQ1Fx4Ii3Vlub8wwRtrNlS8Iyi2qd0KaSX+57FLGdVve26hbGdOstuwqV73RaQ2LqpEpSEwD4eYvKOYYI2pueDADm+hgHNFO6Hrta0lLekgwRyjdDCrHvOlMYomQ5IEyKnDe3uJ9jCN+HVHoDqTrIAX/I+2DW2TaPPSk2lerj/rvS8jbW9Rzhv5MEmcSwoc5phsianRACQCQpkndFcd36Os7VdVsqH51TaIIdh1ktsDkW5ZVVPWxOMkQ0BR0R9d++PMsBYfUh0NxWjtxSXnWkVGQ3FOgr5FxNUTLkliGNPz83xecubSgY19qcYthoQbDczYN1vp3vtAiQyXeEEsVw0zA2RPXRTz1ibaUQKNMd0+jzs2knlscJDBlSb2sfXWbv+UzmHpxSK1ifVHCKoe4FYOlQDHneH+JDoSUcpAToqM9po2nhvbqmDRB7ExybcH+gLp9fCXaP21iLu7oR8feyCI6Yz6j6GQjqZmkkuE8wxCvdNm59AxHNJ1SNiLRQdTgAcn15pTbbyCrT+YfFNVJeAGJ/heq7u6uPv2CTff87yEqVwEttqMYX8DpNq/pfrPtftJRClT1VzQ+a55Ig4cd0FVLduX49NwJvpcClFjjMEK+Vse9Mx9piAN054Fb3UyFC9VFtjs6gHsYfdyoMHZWNi9SVEwzlCAF2tyfgngSLqH665MMOIfWJvqPTh35QfqdTWrTA5GwbqpYCRe+5RHOvXzpV/ZTbU91H38ecnaMff69zaMhnV79BhsoCDDQD2fUZ1vP7FisTxfr3GIVwID/u3IthMYqhso9lf/wTZSebMzwutMGw0m4vOQu0vTNDbQrPMkT0pK+KkjfJpVUzpmrsFar1R05w2qT9MEM1DN97aupRFrc0qud4UI/IMXgSQ/wlr61JZ64gemYI2xqRhiP81pyNLuBmhghDQhZwseAZA9xwGM8yVJEJKHKXEIxFpoJ5bYtITdDtYWgJP6bpWp+0/Tx5wTRaEKnQbQyZUhFPQAj/e5M5+yNajGOoPQ3u24brDzuK7FUwr533/kl42s176ztCDY2sVejN0pJ530XmrCgi+Q0MIXXiOkoRjq9fKLftPMOi2R416muzfooJvuv76fDKFYRXnpYDpELFdIY4KPtRtW6D8ww3Z8JV8dmB85uQ8ibY7D3YhPAwEObrBriaIXJPBegjGJLz3wXvQ02EkK8+UQ45pMx9PRfmX8sQUb/X0cYzhNrR7OWO2N9FNJgA1IOXzxUDOZ8QtMR0BF/LEFk6A8GNxY6H1HHa0HdcLwX7vEiXjYEI0s32SAYHmfbcxBfXXYo6AOEaLdN4t4tTv8HzWoZKba74+ihiaojco73OlM81ytKAbwitw0fuhP+8bO5s9wd3KG0uoLwa2fid+VBHSW9gmX1Ql81iyKWHj62nTN91DBvycqaSjqkRHjlbKMdljcW3xBviiYzThxUv2sap69No2wU2FMq8AxIKTZst6hzLqtNbxs34OLz2saoTgmF7Wge6RTevOmnGR65q+qwboo302tSLPTVz956oMhlLS0cZTadHm5myO81MZKjfmN3tVSM97+SqGI/pqcLOnOhoeLdo3FfZ/94Sz2kMtaPf9y1GMnRVkxxGOdAqo8hTAnU07OgOVHeqXkQ9kaEeFH1dRjHkRQY5msY8V/cZkaepjYo+plq/sX6+aSJD9UrjvvM4kuFpCUPPU2F9lWujiuFOZ0bpyWFzWxsO9NJxttRCB6VSftnWkLAtQSndKFpohqteL500W9QBdzdXgmkvU6ZDgrSVTawT2ZeeXGfHVQpfhyYqF1knwbtBF4JXT0zia9qWztt5bLgue90F6zx9s8Hrl5QOUqw/yqyIGrPqYeiohl0q+ylSCbq05TMgeNQvY9p82JzxWWy9qkOGmiHSeQmPF3CUVwb11O3vF628N1+xEDUqO8r/2dXK11lw+Yq1Fwmceg5BxHV0HXeqT8P9Llk2ol9xM4StGerCHigLbzOT9rx2/Nj42iMuhScymP+G7JDF+mtVBR4cEWTTHnho1WAiijNMUDRv1Kkn+6WsX2TbfR54OxVadxladVgnYhrlUOqqmQgGNv+2+9VqnzueWPxQK0S7pVB5WXfyqu/jnaboh3vbXjGXu1MjnRpbvLVLwOCzx7BBRTSYnsS8xvVuKkMppFLBIG2bEG3OpRfTyuK0FEqXkxjWGYUWAMijri3llb0mlZohKoZktF45XPf7hKTY6afNd96Us7HKSQwty+1TBGBGofQuWlWH5rqNmqEoh57iKMehNpq91Ju2p8zZFo+CXl8WeNuSRWX+JuRprKyTtwC7PRGlI4GmXcDRrE6ANTO9xP4cXm4CCqG2tqNpf7lIbU8r3RELydqyWCxMoWrcCbUnhD9msruL5QHeB0/AMtM545h3PrvPdj5Y+jMvb93AaD8D3TfFZNnV/IGrX7tZzoYcdBj67UVRYvkR0FLS8CgaPkpLhjjqS7gIjI9f3sxf+rEX2q7KHiGRwe45T9Di69NQL0mBIf3y/NrO+IVju3p+FCvXXHc49MeuvKsuIBw5G5H2KTehjZRLJ52CCQyFfoQsCF+aeFnAySWGmBA3Wn3n+d6O0AK2ZF1cmti+y6bBBXsreNFalHhGxI9BlC3GvKZxwu4ixsDAwMDAwOC3gi+4hCJfgKvMw2vN/sxlcw/7sJhVJcky3WTbxJ2+3eK3AUGae2l7tbiIMG46jwPB37KXCS2SbGDhBKe5u+Hn/9DRmx9/Qy9AMDmz2+LqRew1RIAa0qe3I3LnZ5ZhgBt+/09kKUG5xc/9kUSkSwlDi4/GLSU+hSpdC9L90N6yH4M6ASededm/MNgGgTPnaYM7tCH/TV2eKWTC909sR+QGX6vIIkQUDaqJEJJIVyzGLbU9BRylVS5q9kSOCDe2feiLauEVuPH4Jkw3Mk8Y57/rtCu9wntx+bPnoQqErK9uezm2J0LWRnv7+iaA5CqnDUrn2fMj1vU7WSru1DinASb1KrelZ9+6vXg6EET7LJOzgyzN3mcrCXYb6wb5VuBnNCT/RXixcxd8V7UauYHwPhueEMyXTYc3s9EPk0TQ2heyOFJt+CJpNQzvpQeMPlvlwNRJfm76QBAnod9ZDkzlH3dzKhFq1cpYQ+6C44/4OhgmTqPCDgoR9ipTett83wJz8ONuFSlmtvWRcTav1x/Fevr6oUFl6Iioqk3YWXn2ecR5a/v4nCSvSz3EuvKY3g7jtpsdR9X0Jzd7NrbW3gcwKvoLt4FfrA/4zh0Ws6G3Lfx28ZHFcnohWLUEZDm1qnYSCO/TDkXx5GWarY/jqnAjnkEWNH9P33ovc5ZoC16thepXx+8AjJ2h4xZE9dMLEuuWBBgfdhhFgee3Q8DqCeW6MUOhKiJ4zKGpkM7fBjhKmrNsa1ML8l3J1zydLwZH1M7/bfo7GIToZeg2TzkRnfSOU0VHGxhlp9MmvDAfb8Ltd+SSC8vX1TJ3Yh3t3CnicqDppFCvvUlDrE8AJ3YP3YfjmdSQpAmWpb+ZO1/7hCJeKufxqwbhp+gQSCP7O3gv0nLZ27PS5pd0rDXka1Fuyl9c5kgi7xzHBlMxRNPZxssY/v37N88yzyuKWTqUdRmSUUTdTSgivdJfZ393jsf5cArzPNlRtOqvlfND3wXmK6U7KzEfA0iDdDzH68HdXzq0iei4ZKand2jPI4AwWg2f/HMPemBzIjmEuYvcW/L9KPCoLb47R1A13wlLAmNQJj+ZUMHYnt+zt4qCi30mOMNO8SNdtAHEfOT54MlZU+jFjUVmw8BPqDQgBGHk7N5uYskn0U3w2IDsJvBMyvd7POx2XSYH/M/we/Bwut8E7jof9s4mHT3hyZkyLoIPOnDGzu8EY2lF+9BLL0zt8vbMc1bMV/+1XXMYiBlY5ndG+68wm5Vl2doMXDmtvA7vfNmUkL9GrgVeJyLQosfk4/s7z9fr7TrP8++PJGLuOIR3W5H5dCALIflLJuKfK4NHAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwODcRj4NZQXw6szdK3LvzD4p4GoFb32AjoUWTedC/L7gVZW8NoMcWB5D94c9WQQzwKvbWoosB6ykfbXAIaMIfjR/UM/C5wAztC/+AMUfxWY+oIh8JPX7Kgw4TvCLbH3IaQE/4IDo+8GfvI0odVp6Jbc3+EFq4i+io/q0mgVeJLZf6gDqGxDa1URAAAAAElFTkSuQmCC

- Here alexa.png is less than 9.7kb, gets inlined

- if our image is less than 10000bytes or 9.7kb then the images raw data is taken it is converted into a formatted called base 64 and that string represent the entire image all the pixel, color.... all the stuff gets placed as a single string into our js file

- siri.png is more than 9.7 kb, gets treated as separate file

- To use the image present in our folder
- after importing we write `<img src={SiriImage}`

- If we are taking image from an external url we'll write
  `<img src="https://picsum.photos/200/300"`

- always add alt props to the images
- alt props are used by people who make use of screen readers
- screen readers are pieces of software that take a look at the content at the screen and convert that content into audio

**Adding Css using Bulma**

1. Install bulma library for css => _npm install bulma_

- it will be present in _nodemodules_

2. import it into your component => `import 'bulma/css/bulma.css'`
- when we are importing the files and folders from the node modules directory we do  not have to use a relative path like ../ or like that 
- and as we are importing a file which is not a js so we need to write extension


