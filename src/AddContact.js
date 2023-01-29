import { useFormik } from 'formik';
import * as yup from 'yup';
import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { v4 } from 'uuid';
import { FormSchema } from './FormSchema';
import ImageReader from './ImageReader';

export default function AddContact(props) {

  const navigate = useNavigate();

  const fileRef = useRef(null);

  const initialFormValues = {
    first_name:"",
    last_name:"",
    phone_no:"",
    email_address:"",
    file:null,
    contact_address:""
  };

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    isValid,
    dirty,
    setFieldValue
  } = useFormik({
    initialValues: initialFormValues,
    validationSchema: FormSchema,
    onSubmit: async (values, actions) => {
      const uniqueFileName = v4();
      const uniqueId = v4();
      const formData = new FormData();
      formData.append('c_id', uniqueId);
      formData.append('first_name', values.first_name);
      formData.append('last_name', values.last_name);
      formData.append('phone_no', values.phone_no);
      formData.append('email_address', values.email_address);
      formData.append('file', values.file);
      formData.append('uniqueFileName', uniqueFileName);
      formData.append('contact_address', values.contact_address);
      const res = await axios.post(props.baseURL, formData).then((response) => {
          console.log(response.data);
        });
      props.UpdateContactListHandler();
      actions.resetForm();
      navigate('/');
    }
  });

  return (
    <>
      <div className='ui main'>
        <h2>Add Contact</h2>
        <form encType='multipart/form-data' className='ui form' onSubmit={handleSubmit}>
          <div className='field'>
            <label>First Name:</label>
            <input type='text' name='first_name' placeholder='Enter First Name' value={values.first_name} onBlur={handleBlur} onChange={handleChange} className={errors.first_name && touched.first_name ? "field-error" : ""}/>
            {(errors.first_name && touched.first_name) ? <span style={{color:"red"}}>{errors.first_name}</span> : null}
          </div>
          <div className='field'>
            <label>Last Name:</label>
            <input type='text' name='last_name' placeholder='Enter Last Name' value={values.last_name} onBlur={handleBlur} onChange={handleChange} className={errors.last_name && touched.last_name ? "field-error" : ""}/>
            {(errors.last_name && touched.last_name) ? <span style={{color:"red"}}>{errors.last_name}</span> : null}
          </div>
          <div className='field'>
            <label>Phone number:</label>
            <input type='text' name='phone_no' placeholder='Enter Phone Number' value={values.phone_no} onBlur={handleBlur} onChange={handleChange} className={errors.phone_no && touched.phone_no ? "field-error" : ""}/>
            {(errors.phone_no && touched.phone_no) ? <span style={{color:"red"}}>{errors.phone_no}</span> : null}
          </div>
          <div className='field'>
            <label>Email Address:</label>
            <input type='text' name='email_address' placeholder='Enter Email Address' value={values.email_address.toLocaleLowerCase()} onBlur={handleBlur} onChange={handleChange} className={errors.email_address && touched.email_address ? "field-error" : ""}/>
            {(errors.email_address && touched.email_address) ? <span style={{color:"red"}}>{errors.email_address}</span> : null}
          </div>
          <div className='field'>
            <label>Image:</label>
            <input ref={fileRef} type='file' hidden name='file' onChange={ (e) => { setFieldValue("file", e.target.files[0]);} }/>
            {values.file && <ImageReader file={values.file}/>}
            <button type='button' name='fileBtn' onClick={ () => { fileRef.current.click() } } className='ui button green'>Select Contact Photo</button>
            {(errors.file && touched.file) ? <span style={{color:"red"}}>{errors.file}</span> : null}
          </div>
          <div className='field'>
            <label>Address:</label>
            <input type='text' name='contact_address' placeholder='Enter Address' value={values.contact_address} onBlur={handleBlur} onChange={handleChange} className={errors.contact_address && touched.contact_address ? "field-error" : ""}/>
            {(errors.contact_address && touched.contact_address) ? <span style={{color:"red"}}>{errors.contact_address}</span> : null}
          </div>
          <button type='submit' disabled={!(isValid && dirty)} className='ui button blue'>Add to Contacts</button>
        </form>
      </div>
    </>
  )
}
