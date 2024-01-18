import { useCart, useDispatchCart } from './ContextReducer';
import { useState } from 'react';
import React, { useRef, useEffect } from 'react';
export default function Card(props) {
  let data = useCart();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const dispatch = useDispatchCart();
  const handleQty = (e) => {
    setQty(e.target.value);
    e.preventDefault();
  };
  const handleOptions = (e) => {
    setSize(e.target.value);
  };
  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food);
    console.log(new Date());
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: 'UPDATE',
          id: foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: 'ADD',
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });
        console.log(
          'Size different so simply ADD one more to the list'
        );
        return;
      }
      return;
    }

    await dispatch({
      type: 'ADD',
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  let finalPrice = qty * parseInt(options[size]);
  return (
    <div>
      {' '}
      <div>
        <div
          className="card mt-3"
          style={{ width: '16rem', maxHeight: '360px' }}
        >
          <img
            className="card-img-top"
            src={props.imgSrc}
            alt=""
            style={{ heigth: '120px', objectFit: 'fill' }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodName}</h5>
            <div className="container w-100">
              <div
                className="container w-100 p-0"
                style={{ height: '38px' }}
              >
                <select
                  className=" h-100 w-10 text-black"
                  style={{ select: '#FF0000', minWidth: 90 }}
                  onChange={handleQty}
                >
                  {Array.from(Array(10), (e, i) => {
                    return (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    );
                  })}
                </select>

                <select
                  className="m-2 h-100 w-10 text-black"
                  style={{ select: '#FF0000', minWidth: 90 }}
                  ref={priceRef}
                  onChange={handleOptions}
                >
                  {priceOptions.map((i) => {
                    return (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <hr />
            <div className=" d-inline ms-2 h-100 w-20 fs-5">
              ₹{finalPrice}/-
              <button
                type="button"
                className={
                  'btn btn-outline-primary justify-center ms-2'
                }
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}