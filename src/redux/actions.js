import axios from "axios"
import { ADD_USER, DELETE_USER, GET_SINGLE_USER, GET_USERS, UPDATE_USER } from "./actiontypes"


const getUsers=(users)=>({
    type: GET_USERS,
    payload:users,
});

const usersDeleted=()=>({
    type:DELETE_USER
})

const userAdded=()=>({
    type:ADD_USER
})

const userUpdated=()=>({
    type:UPDATE_USER
})

const getUser=(user)=>(
    {
        type:GET_SINGLE_USER,
        payload:user
    }
)
export const loadUsers=()=>{
    return function(load){
        axios.get('http://localhost:5500/user')
        .then((resp)=>{
          console.log("resp",resp.data);
         load(getUsers(resp.data))
        })
    }
}


export const deleteUser=(id)=>{ 
    return function(dispatch){
        axios.delete(`http://localhost:5500/user/${id}`)
        .then((resp)=>{
          console.log("resp",resp)
          dispatch(usersDeleted());
          dispatch(loadUsers());
        }).catch((error)=>console.log(error));
    };
};
export const addUser=(user)=>{ 
    return function(dispatch){
        axios.post('http://localhost:5500/user',user)
        .then((resp)=>{
          console.log("resp",resp)
          dispatch(userAdded());
          dispatch(loadUsers());
        }).catch((error)=>console.log(error));
    };
};

export const getSingleUser=(id)=>{ 
    return function(dispatch){
        axios.get(`http://localhost:5500/user/${id}`)
        .then((resp)=>{
          console.log("resp",resp)
          dispatch(getUser(resp.data));
        //   dispatch(loadUsers());
        }).catch((error)=>console.log(error));
    };
};


export const updateUser=(user)=>{ 
    return function(dispatch){
        axios.put(`http://localhost:5500/user`,user)
        .then((resp)=>{
          console.log("resp",resp)
          dispatch(userUpdated());
          dispatch(loadUsers());
        }).catch((error)=>console.log(error));
    };
};

