"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import CalenderComponent from '@/app/components/CalenderComponent'
import { bookingAction } from '@/app/serverAction/bookingAction'

const DynamicProduct = () => {
    const [record, setRecord] = useState("")
    const [selecetedDates, setSelectedDates] = useState(null)

    const params = useParams();
    const { id } = params

    console.log("dynamic ClientId:", id)

    const dynamicProductHandler = async () => {
        try {
            const response = await fetch(`https://resort-booking-roqm.vercel.app//api/admin/product/${id}`)
            const newData = await response.json()
            console.log("dynamic data:", newData)
            setRecord(newData.data)
        } catch (error) {
            console.error("Error fetching dynamic product data:", error)
        }
    }

    useEffect(() => {
        dynamicProductHandler()
    }, [])

    const bookingHandler = async()=>{
        if(!selecetedDates){
          alert("Please select booking dates")
          return
        }

          const bookingDetails = {record, selecetedDates}
      try {
        const response = await bookingAction(bookingDetails)
        if(response.success){
          alert("Booking Successfull")
        }
      } catch (error) {
        
      }

    }

    const handleDateSelect = (dates) => {
        setSelectedDates(dates)
        console.log("dates coming from calenderComp:", dates)
    }

    return (
        <div>
            <CalenderComponent onDatesSelect={handleDateSelect} />
            <Link href="/">
                <p align="center">Go Back</p>
            </Link>
            {record ? (
                <div className="">
                    <div className="singleSection">
                        <div className="singleLeft">
                            <div className="">
                                <h2>{record.title}</h2>
                            </div>
                            <img
                                src={record?.image ? record.image : "/default-image.jpg"}
                                alt={record.title || "Product Image"}
                                className="singleImage"
                            />
                        </div>
                        <div className="singleCenter">
                            <div className="singlePrice">Rs.{record.price}</div>
                            <p className="singleDesc">{record.desc}</p>
                            <div className="">
                                {record.amen.map((item, i) => (
                                    <div className="singleAmen" key={i}>
                                        <span>*</span> {item}
                                    </div>
                                ))}
                            </div>
                            <div className="offer">
                                <span>*</span>
                                <button>Discount {record.offer}</button>
                            </div>
                            <div className="singleBtn">
                                <button className="" onClick={bookingHandler}>
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading product details...</p>
            )}
        </div>
    )
}

export default DynamicProduct
