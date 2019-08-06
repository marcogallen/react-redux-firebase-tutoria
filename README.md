# react-redux-firebase-tutorial
Based on the incredible YouTube tutorial of The Net Ninja (https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg) ) check it out is great! 
This are my notes of whatI did and I'm sharing to the community in case anyone wants to take a look.
Added a delete action for the project and the ability to only show projects from the same user.


## What I did:
- Delete button to allow users to delete projects from the dashboard and the project details
- Added capability to only show projects that belong to the current loged in user.


### Showing projects from the current loged in user:
#### Dashboard.js
FirestoreConnect function: used an arrow function to pass the props and then return the array of objects needed by firestoreConnect and in the first object added a where clause (https://github.com/prescottprue/redux-firestore#query-options). The where clause filters the results of projects returned by the firestore to only those that matches the condition. In this case we pass props.auth.uid and compare it against the authorId field from our projects collection.
Note: Where takes in an array where all parameters are array items, including the comparison operator (==).
This arrow function returns to objects, first it checks if the props.auth.uid exists if it does it include the where. If it is not is just returns the collections. This is to avoid an error when users log out and the props.auth.uid is not present. Ideally we will check if the user is loged in and then call firestoreConnect. 


### Adding a delete capability:
#### Dashboard.js
imported deleteProject from projectActions.js
Create a function called deleteProject that accepts the project id as a parameter.

This function is sent as a parameter to ProjectsList.
Create a mapDispatchToProps inside Dashboard.js, this function accepts dispatch as a parameter and should return an object that includes deleteProject and gets mapped to the properties. 
Added the mapDispatchToProps to the HOC connect as a seccond parameter.

#### ProjectList.js
Include deleteProject to the arguments of ProjectList function.
Added a button to call the deleteProject function passed as props. Because deleteProject expects an id added it to the onclick event of the button inside an arrow function and used project.id as the parameter.

#### projectAction
Created a similar function to createProject but changing the firestore command to delete, this function expects two parameters: the collection from where you want to delete and the id of the document to be deleted, dispatching the actions DELETE_PROJECT to the reducer.

#### projectReducer
Added to new cases to the switch: DELETE_PROJECT and DELETE_PROJECT_ERROR both only return the state as it is.

#### ProjectDetail
Similar to Dashboard.js:
imported deleteProject from projectActions.js

Create a mapDispatchToProps inside ProjectDetail.js, this function accepts dispatch as a parameter and should return an object that includes deleteProject and gets mapped to the properties. 
Added the mapDispatchToProps to the HOC connect as a seccond parameter.
Added a button to call the deleteProject function passed as props. Because deleteProject expects an id added it to the onclick event of the button inside an arrow function and used project.id as the parameter. Also included a call to props.history.push("/") to redirect the user to the dashboard.

