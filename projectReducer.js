const initState = {
    projects:[
        {id:1, title: "Do one thing", content: "lorem ipsum"},
        {id:2, title: "Do other thing", content: "lorem ipsum"},
        {id:3, title: "Do another thing", content: "lorem ipsum"},
    ],
};
const projectReducer = (state = initState, action) => {
    switch (action.type){   
        case "CREATE_PROJECT":            
            //console.log("Create project", action.project)
            return state;
        case "CREATE_PROJECT_ERROR":
            //console.log("Create project error", action.err)
            return state;
           
        case "DELETE_PROJECT":
            //console.log("Create project error", action.err)
            return state;
        
            case "DELETE_PROJECT_ERROR":
                    //console.log("Create project error", action.err)
                    return state;
         
        default:
                return state;
    }    
}

export default projectReducer;