import { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImage from "../PlaceImage";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage(){
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        axios.get('/bookings').then((response) =>{
            setBookings(response.data);
        })
    }, [])
    
    return (
        <div>
            <AccountNav />
            <div className="mt-6">
                {bookings?.length > 0 && bookings.map(booking => (
                    <Link to={'/account/bookings/'+ booking._id} className="flex gap-4 mt-4 overflow-hidden bg-gray-200 rounded-2xl">
                        <div className="w-48">
                            <PlaceImage place={booking.place} />
                        </div>
                        <div className="py-3 pr-3 grow">
                            <h2 className="text-xl">{booking.place.title}</h2>
                            <div className="text-xl">
                                <BookingDates booking={booking} />
                                <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                    </svg>
                                    Total price: ${booking.price}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))} 
            </div>
        </div>
    )
}