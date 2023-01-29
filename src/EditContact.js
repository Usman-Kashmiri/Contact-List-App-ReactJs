import { useFormik } from 'formik';
import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import * as yup from "yup";

export default function EditContact(props) {

    const location = useLocation();
    const { c_id, first_name, last_name, phone_no, email_address, contact_address } = location.state.contactDetail;
    const navigate = useNavigate();

    const initialFormValues = {
        c_id:c_id,
        first_name: first_name,
        last_name: last_name,
        phone_no: phone_no,
        email_address: email_address,
        contact_address: contact_address
    };

    const EditFormSchema = yup.object({
        first_name:yup.string().required("First name is required..!"),
        last_name:yup.string(),
        phone_no:yup.number().typeError("That doesn't look like a phone number").min(11).positive("A phone number can't start with a minus").integer("A phone number can't include a decimal point").required('A phone number is required'),
        email_address:yup.string().email("Invalid Email Format").required("Email address is required"),
        contact_address:yup.string().required("Address is required")
    });
    

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched
    } = useFormik({
        initialValues: initialFormValues,
        validationSchema: EditFormSchema,
        onSubmit: async (values) => {
            const res = await axios.put(`${props.baseURL}${c_id}`, values).then((response) => {
                console.log(response.data);
            });
            props.UpdateContactListHandler();
            navigate('/');
        }
    });

    return (
        <>
            <div className='ui main'>
                <h2>Update Contact</h2>
                <form className='ui form' onSubmit={handleSubmit}>
                    <div className='field'>
                        <label>First Name:</label>
                        <input type='text' name='first_name' placeholder='Enter First Name' value={values.first_name} onBlur={handleBlur} onChange={handleChange} className={errors.first_name && touched.first_name ? "field-error" : ""} />
                        {(errors.first_name && touched.first_name) ? <span style={{ color: "red" }}>{errors.first_name}</span> : null}
                    </div>
                    <div className='field'>
                        <label>Last Name:</label>
                        <input type='text' name='last_name' placeholder='Enter Last Name' value={values.last_name} onBlur={handleBlur} onChange={handleChange} className={errors.last_name && touched.last_name ? "field-error" : ""} />
                        {(errors.last_name && touched.last_name) ? <span style={{ color: "red" }}>{errors.last_name}</span> : null}
                    </div>
                    <div className='field'>
                        <label>Phone number:</label>
                        <input type='text' name='phone_no' placeholder='Enter Phone Number' value={values.phone_no} onBlur={handleBlur} onChange={handleChange} className={errors.phone_no && touched.phone_no ? "field-error" : ""} />
                        {(errors.phone_no && touched.phone_no) ? <span style={{ color: "red" }}>{errors.phone_no}</span> : null}
                    </div>
                    <div className='field'>
                        <label>Email Address:</label>
                        <input type='text' name='email_address' placeholder='Enter Email Address' value={values.email_address.toLocaleLowerCase()} onBlur={handleBlur} onChange={handleChange} className={errors.email_address && touched.email_address ? "field-error" : ""} />
                        {(errors.email_address && touched.email_address) ? <span style={{ color: "red" }}>{errors.email_address}</span> : null}
                    </div>
                    <div className='field'>
                        <label>Address:</label>
                        <input type='text' name='contact_address' placeholder='Enter Address' value={values.contact_address} onBlur={handleBlur} onChange={handleChange} className={errors.contact_address && touched.contact_address ? "field-error" : ""} />
                        {(errors.contact_address && touched.contact_address) ? <span style={{ color: "red" }}>{errors.contact_address}</span> : null}
                    </div>
                    <button type='submit' className='ui button blue'>Update Contacts</button>
                </form>
            </div>
        </>
    )
}
