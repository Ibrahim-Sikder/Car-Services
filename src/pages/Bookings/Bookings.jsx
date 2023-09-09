import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingRow from "./BookingRow";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const Bookings = () => {
  const {user} = useContext(AuthContext)
    const navigate = useNavigate()
   const [bookings, setBookings] = useState([])
  const url = `https://car-services-server-amber.vercel.app/order?email=${user?.email}`
   useEffect(()=>{
    fetch(url,{
        method: "GET",
        headers: {
            authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    .then(res=> res.json())
    .then(data=> {
        if(!data.error){
            setBookings(data)
        }else{
            navigate('/')
        }
    })
   },[url])

   const handleDelete = id =>{
    fetch(`https://car-services-server-amber.vercel.app/order/${id}`,{
        method: "DELETE"
    })
    .then(res=>res.json())
    .then(data=>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              if(data.deletedCount > 0){
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                  const remaining = bookings.filter(book=>book._id !== id)
                  setBookings(remaining)
              }
            }
          })
    })
   }
 const handleBookingConfirm = id =>{
    fetch(`https://car-services-server-amber.vercel.app/order/${id}`,{
        method: "PATCH",
        headers: {
            'content-type': 'application/json'
        },
    body: JSON.stringify({status: 'confirm'})
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.modifiedCount > 0 ){
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Booking confirm successfully ! ',
                showConfirmButton: true,
                timer: 1500
              })
              const remaining = bookings.filter(booking=>booking._id !== id)
              const updated = bookings.filter(booking=>booking._id === id)
              updated.status = 'confirm'
              const newBooking = [updated, ...remaining];
              setBookings(newBooking)
        }
    })
    .catch(error =>console.log(error))
 }

 
    return (
        <div>
            <h2 className="text-5xl">Your bookings: {bookings.length} </h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings?.map(booking => <BookingRow
                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                                handleBookingConfirm={handleBookingConfirm}
                            ></BookingRow>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Bookings;