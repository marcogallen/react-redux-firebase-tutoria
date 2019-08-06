# react-redux-firebase-tutorial
Based on the incredible YouTube tutorial of The Net Ninja (https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg) ) check it out is great! Added a delete action for the project and the ability to only show projects from the same user.


## What is included:
- Delete button to allow users to delete projects from the dashboard and the project details
- Added capability to only show projects that belong to the current loged in user.


### Showing projects from the current loged in user:
On Dashboard.js
In line 57 in the firestoreConnect function: used an arrow function to pass the props and then return the array of objects needed by firestoreConnect and in the first object added a where clause (https://github.com/prescottprue/redux-firestore#query-options). The where clause filters the results of projects returned by the firestore to only those that matches the condition. In this case we pass props.auth.uid and compare it against the authorId field from our projects collection.
Note: Where takes in an array where all parameters are array items, including the comparison operator (==).
