import React, { useState } from 'react'

export default function ImageReader({file}) {
    const [imgSrc,setImgSrc] = useState(null);

    var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setImgSrc(reader.result);
        };

  return (
    <div>
        { imgSrc ? <img src={imgSrc} alt='contact photo' width='200px' height='200px'/> : "Loading..."}
    </div>
  )
}
