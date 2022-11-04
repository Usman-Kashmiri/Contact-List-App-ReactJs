import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import AddContact from './AddContact';
import ContactCard from './ContactCard'

export default function ContactList(props) {
  // console.log(props.contacts)
  const searchedValue = useRef("");
  const contactError = <h2>404 - Contact not found...!</h2>
  const deleteContactHandler = (c_id) => {
    props.getContactId(c_id);
  };

  const renderContactList = props.contacts.map((contact,index)=> (
      <ContactCard contact={contact} clickHandler={deleteContactHandler} key={index}></ContactCard>
    )
  );

  const getSearchedContact = () => {
    props.searchKeyword(searchedValue.current.value)
  }

  return (
    <div className='main'>
      <div className='ui grid'>
        <div style={{margin:"20px 0"}} className='seven column row'>
          <h2 className='left floated column'>Contact list</h2>
          <Link to="/AddContact">
            <button className='ui button blue right floated column'>Add New Contact</button>
          </Link>
        </div>
      </div>
      <div className='ui search'>
        <div className='ui icon input'>
          <input type="text" placeholder='Whom are you looking for?' className='prompt' ref={searchedValue} value={props.term} onChange={getSearchedContact} />
          <i className='search icon'></i>
        </div>
      </div>
      <div className='ui celled list'>
        {renderContactList.length > 0 ? renderContactList : contactError}
      </div>
    </div>
  )
}
