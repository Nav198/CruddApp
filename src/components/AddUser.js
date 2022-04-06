import {React,useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addUser, getSingleUser, updateUser } from '../redux/actions';

import { FormGroup, Form, Input,Button } from "reactstrap";

const AddUser = () => {
  const params=useParams();
  let dispatch=useDispatch();
  const navigate=useNavigate();
  const [state,setState]=useState({
    name:"",
    email:"",
    contact:"",
    address:""
  });
  
  const {name,email,contact,address}=state;
   
  const {user}=useSelector(state=>state.data);
  
  useEffect(()=>{
   dispatch(getSingleUser(params.id))
  },[]);

  useEffect(()=>{
      if(user ){
          setState({...user})
      }
     },[user])
     
     const handleInputChange=(e)=>{
      let {name,value}=e.target;
      setState({...state,[name]:value});
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
  
  if(!params.id){
      dispatch(updateUser(state,params.id));

      navigate("/"); 
      window.location.reload(false);
  }
  else{ dispatch(addUser(state));
   navigate('/');}

  return (
    <div>
    <h1>{!params.id ? "NEW USER REGISTRATION" :"UPDATE USER" }</h1>
      <Form style={{padding:"10px"}} onSubmit={handleSubmit}>
        <FormGroup>
          <label>Name</label>
        <Input  type="text" value={name} name="name" onChange={handleInputChange}></Input>
         <label>Email</label>
         <Input  type="text" value={email} name="email" onChange={handleInputChange} ></Input>
         <label>Contact</label>
         <Input  type="text" value={contact} name="contact" onChange={handleInputChange}></Input>
         <label>Address</label>
         <Input  type="text" value={address} name="address" onChange={handleInputChange}></Input>
          {/* <label>Name</label>
          <input type="text" value={name} name="name" onChange={handleInputChange} ></input> */}
        </FormGroup>

        <Button style={{margin:"20px"}} color="primary" type="submit">
        {!params.id ? "ADD" : "UPDATE"}
      </Button>
      <Button color="primary" type="button">
        Back
      </Button>
        </Form>

    </div>
  )
}
}

export default AddUser