import React, { useState } from 'react';
import { toast } from 'react-toastify';

const styles = {
  parent: {
    width: '100%',
    height: '100vh',
  },
  child: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

export function UploadImage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const onImageSelect = (e) => {
    if (e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedImage !== null) {
      const formData = new FormData();
      formData.append('image', selectedImage, selectedImage.name);

      const response = await fetch('http://localhost:8000/api/upload/', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 201) {
        toast.success('Image uploaded successfully')
      } else {
        const { details } = await response.json();
        toast.error(details)
      }
    }
  };

  return (
    <div style={styles.parent}>
      <div style={styles.child}>
        <h1>Upload an Image</h1>
        <div className="d-flex">
          <div>
            <input type="file" onChange={onImageSelect} />
          </div>
          <button className="btn btn-outline-primary" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
