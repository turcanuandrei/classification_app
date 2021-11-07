import React from 'react';

export function PredictionItem({ data, refetchData }) {
  const { id, image, category, predicted } = data;

  const handlePredict = () => {
    fetch(`http://localhost:8000/api/predict/${id}`).then((res) => {
      if (res.status === 200) {
        refetchData();
      }
    });
  };

  return (
    <div className="card col-4 mx-2 my-3 p-0" style={{ width: '18rem' }}>
      <img src={image} className="card-img-top" style={{ height: '15rem' }} alt={id} />
      <div className="card-body">
        <h6>
          category: <span style={{ fontWeight: 'normal' }}>{category}</span>
        </h6>
      </div>
      <div className="card-footer">
        <button
          disabled={predicted}
          className="btn btn-info text-dark"
          onClick={handlePredict}
        >
          predict
        </button>
      </div>
    </div>
  );
}
