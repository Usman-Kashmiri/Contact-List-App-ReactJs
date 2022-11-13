import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { v4 } from 'uuid';

export default function AddContact(props) {
  // console.log(props)
  const navigate = useNavigate();
  const [newContact, setNewContact] = useState({ first_name:"", last_name:"", phone_no:"", email_address:"", contact_address:"" });
  const [file, setFile] = useState();

  const handleChange = (e) => {
    
    const contactData = e.target.name;
    const value = e.target.value;
    setNewContact((prev) => {
      return {
        ...prev, [contactData]: value
      }
    });
  };

  const handlePhoto = (e) => {
    setFile(e.target.files[0]);
  }

  const add = async (e) => {
    e.preventDefault();
    const baseURL = "http://localhost/contact-app/backend/contacts/";
    const uniqueFileName = v4();
    const uniqueId = v4();
    const formData = new FormData();
    formData.append('c_id', uniqueId);
    formData.append('first_name', newContact.first_name);
    formData.append('last_name', newContact.last_name);
    formData.append('phone_no', newContact.phone_no);
    formData.append('email_address', newContact.email_address);
    formData.append('file', file);
    formData.append('uniqueFileName', uniqueFileName);
    formData.append('contact_address', newContact.contact_address);
    const res = await axios.post(baseURL, formData).then((response) => {
        console.log(response.data);
      });
    props.UpdateContactListHandler();
    navigate('/');
  };
  return (
    <>
      <div className='ui main'>
        <h2>Add Contact</h2>
        <form encType='multipart/form-data' className='ui form' onSubmit={add}>
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
          <div className='field'>
            <label>Image:</label>
            <input type='file' name='file' onChange={handlePhoto} required/>
          </div>
          <div className='field'>
            <label>Address:</label>
            <input type='text' name='contact_address' placeholder='Enter Address' value={newContact.contact_address} onChange={handleChange} required/>
          </div>
          <button type='submit' className='ui button blue'>Add to Contacts</button>
        </form>
      </div>
    </>
  )
};
