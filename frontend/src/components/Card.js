import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

const Card = (props) => {
  let dispatch = useDispatchCart();
  let data = useCart();
  const prizeRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.foodItems;

  const [qty, setQty] = useState("1");
  const [size, setSize] = useState("");

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
    if (food.length !== 0) {
      if (food.size === size) {
        console.log(food);
        await dispatch({
          type: "UPDATE",
          id: foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: foodItem._id,
          name: foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });

    // setBtnEnable(true)
  };

  useEffect(() => {
    setSize(prizeRef.current.value);
  }, []);

  let finalPrice = qty * parseInt(options[size]);
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "509px" }}>
        <img
          src={foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ maxHeight: "200px", minHeight: "200px" }}
        />
        <div className="card-body">
          <h5 className="card-title ">{foodItem.name}</h5>
          <p className="card-text d-none d-lg-block">{foodItem.description}</p>
          <div className="container w-100">
            <select
              className="m-2 h-100  bg-success rounded"
              onClick={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>

            <select
              className="m-2 h-100 bg-success rounded"
              ref={prizeRef}
              onClick={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <br />
            <div className="d-inline h-100 fs-5 ">
              Total Price : ₹{finalPrice}/-
            </div>
          </div>
          <hr />
          <button
            className="btn btn-success justify-center ms-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
