import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 } from 'uuid';


export default function UpdatePhoto(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [oldImagePath, newImagePath] = useState(location.state.imagePath);
    const userId = location.state.userId;
    const [file, setFile] = useState();

    const handlePhoto = (e) => {
        var reader = new FileReader();
        reader.onload = function () {
            newImagePath(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
        setFile(e.target.files[0]);
    }

    const updatePhotoRequest = async (e) => {
        e.preventDefault();
        const baseURL = "http://localhost/contact-app/backend/updatePhoto.php/";
        const uniqueFileName = v4();
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('file', file);
        formData.append('uniqueFileName', uniqueFileName);
        const res = await axios.post(baseURL, formData)
        // .then((response) => {
        //     console.log(response.data);
        // });
        props.UpdateContactListHandler();
        navigate('/');
    };

    return (
        <div className='main'>
            <div className="ui centered card">
                <div className="image">
                    <img src={oldImagePath} alt="User" />
                    <form className='ui form' encType='multipart/form-data' onSubmit={updatePhotoRequest}>
                        <div className='field'>
                            <label>Browse Image:</label>
                            <input type='file' name='file' onChange={handlePhoto} required />
                        </div>
                        <button type='submit' className='ui button green'>Update Contact Photo</button>
                    </form>
                </div>
            </div>
            <a href='#' onClick={() => navigate(-1)} style={{marginTop:"10px"}} className='ui grid centered'>Back to Contact Details</a>
        </div>
    )
}
