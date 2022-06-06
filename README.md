# sei36_project2
A react web page for learning purposes.

## Project Brief
- **Build a web application using create-react-app / vite or next.js**. Must be
  your own work.
- **Use React framework** to build your application with _at least_
  - 3 components
  - 4 props
  - 2 state properties
  - 2 setState
  - 2 routes
- **Use 3rd party API and/or Firestore**
  - API call with Axios and display the data for the user. You may use any API
    of your choosing.
- **Craft a `README.md` file that explains your app** to the world.
- **Create wireframes** for your app and include it in your repo/readme.

### Technology used
```
- React
- Material UI Components
- Very light CSS.
```
### Wireframe
I used MIRO
![WireFrame](https://github.com/g0ld3nk1w1/sei36_project2/blob/main/images/Miro-Wireframe.png?raw=true)

This made development for the MVP and react components much easier. But evidently styling was not considered in the wireframe
and when it came to having to style the page.

## User Stories as below:

### Front page: 
#### Landing Section
<li> One master Image </li>
<li>Fields/Forms for search terms, on clicking GO, click to fetch. </li>
<li>display results in the same page</li>
--> stretch: display some first, scroll to display more.
<li> state to control display of results </li>

#### Results section
<li> Shows nothing on landing, displays clickable results on search</li>
<li> has 3 sort options: name asc/desc, start dates asc/desc, {one more} </li>

### Further Details page:
<li> Routed to when user clicks on one of the results.<br/> </li>
<s> To decide: always open in new tab or redraw everything to stay on single page? </s>

#### Decided: 
Stateless, purely displaying, receives via props.
<li> BUY button goes to actual link from ticketmaster. </li>
Always open in new tab. *Project Route requirement* <br/>
--> Stretch: Return to Results button only exists if redrawing entire page.

--> Stretch: Responsive pages

## API Used
TicketMaster API : https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/ 