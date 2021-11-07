import React, { useEffect, useState } from 'react';
import { PredictionItem } from '../components/PredictionItem';

export function ImageList() {
  const [data, setData] = useState([]);

  const getData = () => {
    fetch('http://localhost:8000/api/images/')
      .then((response) => response.json())
      .then((data) => setData(data.items));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h2 className="my-5 text-center">List of images</h2>
      <div className="row justify-content-center align-items-center">
        {data.length > 0 ? (
          data.map((imageData) => (
            <PredictionItem data={imageData} refetchData={getData} />
          ))
        ) : (
          <h5 className="text-center text-muted">No predicted images yet.</h5>
        )}
      </div>
    </div>
  );
}
