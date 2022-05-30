# sei36_project2
A react web page for learning purposes.

## User Stories

### Front page: 
#### Landing Section
<li> One master Image </li>
<li>Fields/Forms for search terms, on clicking GO, click to fetch. </li>
<li>display results in the same page</li>
--> stretch: display some first, scroll to display more.
<li> state to control display of results </li>

#### Results section
<li> Shows nothing on landing, displays clickable results on search</li>
<li> has 3 sort options: name, start dates, {one more} </li>
<li> filter: opens up in a floating div [wth how] </li>
<li> state to control filter + sort options </li>
<li> route for filter? </li>

### Further Details page:
<li> Routed to when user clicks on one of the results.<br/> </li>
<s> To decide: always open in new tab or redraw everything to stay on single page? </s>

#### Decided: 
Stateless, purely displaying, receives via props.
<li> BUY button goes to actual link from ticketmaster. </li>
Always open in new tab. *Project Route requirement* <br/>
--> Stretch: Return to Results button only exists if redrawing entire page.

--> Stretch: Responsive pages