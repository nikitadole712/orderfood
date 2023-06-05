import React from 'react';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';

export default function Food({ food }) {
  const [quantity, setquantity] = useState(1);
  const [varient, setvarient] = useState('small');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div
      style={{ margin: '60px' }}
      className="shadow-lg p-3 mb-5 bg-white rounded"
    >
      <div onClick={handleShow}>
        <h1>{food.name}</h1>
        <img
          src={food.img}
          className="img-fluid"
          alt="food"
          style={{ height: '200px', width: '250px' }}
        />
      </div>
      <div className="flex-container">
        <div className="w-100 m-1">
          <p>varient</p>
          <select
            className="form-control"
            value={varient}
            onChange={(e) => {
              setvarient(e.target.value);
            }}
          >
            {food.varients.map((varient) => {
              return <option value={varient}>{varient}</option>;
            })}
          </select>
        </div>
        <div className="w-100 m-1">
          <p>Quantity</p>
          <select
            className="form-control"
            value={quantity}
            onChange={(e) => {
              setquantity(e.target.value);
            }}
          >
            {Array.from(Array(10), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="flex-container">
        <div className="m-1 w-100">
          <h1 className="mt-1">
            Price: {food.prices[0][varient] * quantity} Rs
          </h1>
        </div>
        <div className="m-1 w-100">
          <button className={'btn btn-success justify-center ms-2'}>
            Add to Cart
          </button>
        </div>
      </div>

      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>{food.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
         <img src={food.img} alt="" style={{heigth:"400px"}} className="img-fluid"/>
         <p>{food.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
