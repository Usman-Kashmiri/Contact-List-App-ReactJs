import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { v4 } from 'uuid';

export default function EditContact(props) {
  // console.log(props)
  const location = useLocation();
  const { c_id, first_name, last_name, phone_no, email_address, image_path, contact_address } = location.state.contactDetail;
  const navigate = useNavigate();
  const [newContact, setNewContact] = useState({ c_id, first_name, last_name, phone_no, email_address, contact_address});
  
  const handleChange = (e) => {
    const contactData = e.target.name;
    const value = e.target.value;
    setNewContact((prev) => {
      return {
        ...prev, [contactData]: value
      }
    });
  };

  const update = async (e) => {
    e.preventDefault();
    const baseURL = "http://localhost/contact-app/backend/contacts/";
    const res = await axios.put(`${baseURL}${c_id}/edit`, newContact).then((response) => {
        console.log(response.data);
      });
    props.UpdateContactListHandler();
    navigate('/');
  };
  return (
    <>
      <div className='ui main'>
        <h2>Edit Contact:</h2>
        <form encType='multipart/form-data' className='ui form' onSubmit={update}>
          <div className='field'>
            <label>First Name:</label>
            <input type='text' name='first_name' placeholder='Enter First Name' value={newContact.first_name} onChange={handleChange} required/>
          </div>
          <div className='field'>
            <label>Last Name:</label>
            <input type='text' name='last_name' placeholder='Enter Last Name' value={newContact.last_name} onChange={handleChange} required/>
          </div>
          <div className='field'>
            <label>Phone number:</label>
            <input type='text' name='phone_no' placeholder='Enter Phone Number' value={newContact.phone_no} onChange={handleChange} required/>
          </div>
          <div className='field'>
            <label>Email Address:</label>
            <input type='text' name='email_address' placeholder='Enter Email Address' value={newContact.email_address.toLocaleLowerCase()} onChange={handleChange} required/>
          </div>
          {/* <div className='field'>
            <label>Image:</label>
            <img id='output' width={100} src={newContact.image_path} />
            <input type='file' name='file' onChange={handlePhoto}/>
          </div> */}
          <div className='field'>
            <label>Address:</label>
            <input type='text' name='contact_address' placeholder='Enter Address' value={newContact.contact_address} onChange={handleChange} required/>
          </div>
          <button type='submit' className='ui button blue'>Update Contact</button>
        </form>
      </div>
    </>
  )
};
