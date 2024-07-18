import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    await fetch("http://localhost:5000/api/myorderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    })
      .then(async (res) => {
        let response = await res.json();
        setOrderData(response.OrderData[0]); // Adjusting to match the response structure
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (
    !orderData ||
    !orderData.order_data ||
    orderData.order_data.length === 0
  ) {
    return (
      <div style={{ fontWeight: "700" }}>
        <Navbar />
        <div className="container">
          <div className="row">
            <div>No orders found</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ fontWeight: "700" }}>
      <Navbar />
      <div className="container">
        <div className="row">
          {orderData.order_data
            .slice(0)
            .reverse()
            .map((orderGroup, groupIndex) => (
              <div key={groupIndex}>
                {Array.isArray(orderGroup) &&
                  orderGroup.map((arrayData, dataIndex) => (
                    <div key={dataIndex}>
                      {arrayData.Order_date ? (
                        <div className="m-auto mt-5">
                          {arrayData.Order_date}
                          <hr />
                        </div>
                      ) : (
                        <div className="col-12 col-md-6 col-lg-3">
                          <div
                            className="card mt-3"
                            style={{ width: "16rem", maxHeight: "360px" }}
                          >
                            {arrayData.img && (
                              <img
                                src={arrayData.img}
                                className="card-img-top"
                                alt={arrayData.name}
                                style={{ height: "120px", objectFit: "fill" }}
                              />
                            )}
                            <div className="card-body">
                              <h5 className="card-title">{arrayData.name}</h5>
                              <div
                                className="container w-100 p-0"
                                style={{ height: "38px" }}
                              >
                                <span className="m-1">{arrayData.qty}</span>
                                <span className="m-1">{arrayData.size}</span>
                                <div className="d-inline ms-2 h-100 w-20 fs-5">
                                  ₹{arrayData.price}/-
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
