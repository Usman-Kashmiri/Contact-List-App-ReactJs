import React from 'react'
// import userImg from '../images/User-svg.png';
import EditContact from './EditContact';
import {useLocation, Link} from 'react-router-dom';

export default function ContactDetails(props) {
    const location = useLocation();
    const { c_id, first_name, last_name, phone_no, email_address, image_path, contact_address } = location.state.contactDetail;
    return (
        <div className='main'>
            <div className="ui centered card">
                <div className="image">
                    <img src={image_path} alt="User"/>
                    <Link to={`/UpdateContactPhoto/${c_id}`} state={{ imagePath: image_path, userId: c_id }}>Update Contact Photo</Link>
                </div>
                <div className="content">
                    <div className="header">{first_name + " " + last_name}</div>
                    <div className="description">
                    <div>Phone number: {phone_no}</div>
                    <div>Email Address: {email_address}</div>
                    <div>Address: {contact_address}</div>
                    </div>
                </div>
            </div>
            <Link to="/" style={{marginTop:"10px"}} className='ui grid centered'>Back to Contact List</Link>
            <Link to={`/editContact`} state={{ contactDetail: location.state.contactDetail }} style={{marginTop:"10px"}} className='ui grid centered'>Edit Contact</Link>
        </div>
    )
}
