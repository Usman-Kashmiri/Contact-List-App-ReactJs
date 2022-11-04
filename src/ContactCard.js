import React from 'react';
import { Link } from 'react-router-dom';
// import userImg from './images/user-image.png';


export default function ContactCard(props) {
    const { c_id, first_name, last_name, phone_no, image_path} = props.contact;
  return (
    <div className='ui item gird'>
      <div className='left floated column'>
      <Link to={`/ContactDetails/${c_id}`} state={{ contactDetail:props.contact }}>
        <img className='ui avatar image' style={{width:"100px", height:"100px"}} src={image_path} alt="User"/>
        <div className='content'>
            <div className='header'>{first_name + " " + last_name}</div>
            <div>{phone_no}</div>
        </div>
      </Link>
      </div>
      <i className='trash alternate outline icon right floated column' style={{color:"red",marginTop:"8px",cursor:"pointer"}} onClick={()=>props.clickHandler(c_id)}></i>
      <Link to={`/editContact`} state={{ contactDetail:props.contact }}>
        <i className='edit alternate outline icon right floated column' style={{color:"blue",marginTop:"8px",marginRight:"8px"}}></i>
      </Link>
    </div>
  )
}
