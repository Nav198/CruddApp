import React from 'react'
import { deleteUser, getSingleUser, loadUsers } from '../redux/actions'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect,useState } from 'react';
import BootStrapTable from 'react-bootstrap-table-next'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import * as ReactBootStrap from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom';
import paginationFactory from 'react-bootstrap-table2-paginator';

const Home = () => {
    
    let dispatch=useDispatch();
    let navigate=useNavigate();
    const {users} =useSelector(state=>state.data);
    
    
    useEffect(()=>{
     dispatch(loadUsers());
    },[]);
   
const columns=[
    {
        dataField:'id',
        text:" User ID ",
    },
    {
        dataField:'name',
        text:" User Name ",
    },
    {
      dataField:'address',
      text:" Address ",
  },
    {
        dataField:'email',
        text:" Email ",
    },
]

const handleDelete=(id)=>{
if(window.confirm("Are You Sure to Delete")){
  dispatch(deleteUser(id));
}
}

const handleNewUser=()=>{
   navigate("/newuser")
   
}

const handleEdit=(id)=>{
  navigate("/edituser/"+id)
  dispatch(getSingleUser())
 
}
  return (
    <div>
    <h1>Crud App</h1><br/>
    <Button variant="success" onClick={handleNewUser}>Add New User</Button>{' '}<br/><br/>
    <ReactBootStrap.Table  
    striped 
    bordered
     hover 
     data={users}
     columns={columns} 
     pagination={paginationFactory()}>
  <thead>
    <tr>
      <th>id</th>
      <th>Name</th>
      <th>Address</th>
      <th>Email</th>
      <th>Action</th>
     
    </tr>
  </thead>
  <tbody id='user-input'>
   
   {users && users.map((item)=>(
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.address}</td>
      <td>{item.email}</td>
      <td>
      {/* <button>Delete</button> */}
      <Button variant="danger" style={{margin:"5px"}}  onClick={(e)=>{handleDelete(item.id)}}>Delete</Button>
      <Button variant="success" onClick={()=>{handleEdit(item.id)}}>Edit</Button>
      </td>
    </tr>
   ))}
   
   
   
   
  </tbody>
</ReactBootStrap.Table>
  
    </div>
  )
}

export default Home