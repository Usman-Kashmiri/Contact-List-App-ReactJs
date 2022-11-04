import axios from "axios";
import React, { useState, useEffect } from 'react'
import { Route, Routes, useParams, useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import Header from './Header';
import AddContact from './AddContact';
import EditContact from './EditContact';
import ContactList from './ContactList';
import './App.css';
import ContactDetails from './ContactDetails';
import UpdatePhoto from "./UpdatePhoto";

const baseURL = "http://localhost/contact-app/backend/contacts/";


function App() {
  const { id } = useParams();
  const [contacts, setContacts] = useState([]);
  const [searchContact, setSearchContact] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const updateContactListHandler = async () => {
    const response = await axios.get(baseURL).then((response) => {
      setContacts(response.data);
    });
  };

  // const updateContactHandler = async () => {
      // const res = await axios.put(`${baseURL}${id}/edit`, newContact)
  //     const response = await axios.get(baseURL).then((response) => {
  //       setContacts(response.data);
  //     });
  // }

  const removeContactHandler = async (id) => {
    const res = await axios.delete(`${baseURL}${id}/delete`);
    const newContactList = contacts.filter((contact) => {
      return contact.c_id !== id;
    });
    setContacts(newContactList);
  }

  const searchHandler = (searchTerm) => {
    setSearchContact(searchTerm)
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  }

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(baseURL).then((res) => {
        // console.log(res.data)
        setContacts(res.data);
      });
    }
    getData();
  }, [])

  return (
    <div>
      <Header />
      <div className='ui container'>
        <Routes>
          <Route path='/' element={<ContactList contacts={searchContact.length < 1 ? contacts : searchResults} getContactId={removeContactHandler} term={searchContact} searchKeyword={searchHandler} />} />
          <Route path='/AddContact' element={<AddContact UpdateContactListHandler={updateContactListHandler} />} />
          <Route path='/EditContact' element={<EditContact UpdateContactListHandler={updateContactListHandler} />} />
          <Route path='/ContactDetails/:id' element={<ContactDetails />} />
          <Route path='/UpdateContactPhoto/:id' element={<UpdatePhoto UpdateContactListHandler={updateContactListHandler} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
