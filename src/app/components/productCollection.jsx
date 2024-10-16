"use client";

import { useEffect, useState } from "react";
import Link from "next/link"; // Import Link from next/link

const ProductCollection = () => {
  const [collections, setCollections] = useState([]);

  const collectionHandler = async () => {
    try {
      console.log("Fetching data...");
      const response = await fetch("https://resort-booking-roqm.vercel.app//api/admin/add-product");
      console.log("Response status:", response.status);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const newData = await response.json();
      console.log("Fetched data:", newData); // Log the full response
      setCollections(newData.data || []); // Check if newData.data exists
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  };

  useEffect(() => {
    collectionHandler();
  }, []);

  useEffect(() => {
    console.log("Collections state updated:", collections); // Log the state after it's set
  }, [collections]);

  return (
    <div className="productSection">
      <h1 align="center">Select your Stay</h1>
      {collections.length > 0 ?(
        collections && collections.map((item) => (
          <div key={item._id} className="proDetail">
            <div className="left">
              <div className="title">{item.title}</div>
              <br />
              <img src={item.image} alt={item.title} className="roomImage" />
            </div>
            <div className="center">
              <div className="pamen">
                <h2 className="price">Rs. {item.price}</h2>
                <div>
                  <h3>Amenities</h3>
                  {item.amen.map((serve, i) => (
                    <div className="amenities" key={i}>
                      <div>*{serve}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="right">
                <Link href={`/detail/${item._id}`}>
                  <button className="detail">Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          No products available
        </div>
      )}
    </div>
  );
};

export default ProductCollection;
