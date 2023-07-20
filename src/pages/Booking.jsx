import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Button, Container, Spinner } from "react-bootstrap";
import { AuthContext } from "../components/AuthProvider";
import AddBookingModal from "../components/AddBookingModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../features/servicesSlice";
import { fetchAllBookings, fetchBookings } from "../features/bookingsSlice";
import BookingsTable from "../components/BookingsTable";


export default function Booking() {
    const navigate = useNavigate();
    const [showAddBooking, setShowAddBooking] = useState(false);
    const handleCloseAddBooking = () => setShowAddBooking(false);
    const handleShowAddBooking = () => setShowAddBooking(true);
    const dispatch = useDispatch();
    const {currentUser, adminStatus} = useContext(AuthContext);

    const loading = useSelector((state) => state.services.loading)
    const services = useSelector((state) => state.services.services);
    const bookings = useSelector((state) => state.bookings.bookings)

   

    //Get all services available from Redux global store
    useEffect(() => {
        if(!currentUser){
            navigate('/login');
        } else {
            if (adminStatus===true){
                dispatch(fetchServices());
                dispatch(fetchAllBookings())
            } else{
                dispatch(fetchServices());
                dispatch(fetchBookings(currentUser.uid))
            }
        }
    },[dispatch, currentUser,bookings,adminStatus])

    

    return (
        <Container>
            <div className="d-flex justify-content-between mb-5">
                <h1>Bookings Page</h1>
                <Button className="btn btn-primary rounded-pill mt-2 me-3" variant="primary" onClick={handleShowAddBooking}>New Booking</Button>
            </div>

            <BookingsTable bookings={bookings} services={services} adminStatus={adminStatus}/>
            {loading && (
                <Spinner animation="border" className="ms-3 mt-3" variant="primary" />
            )}
            {currentUser && (
                <AddBookingModal show={showAddBooking} handleClose={handleCloseAddBooking} services={services} userId={currentUser.uid}/>
            )}
        
        </Container>
    )
}