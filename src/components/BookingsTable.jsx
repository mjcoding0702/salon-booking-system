import { useDebugValue, useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import UpdateBookingModal from "./UpdateBookingModal";
import ServicesDetailModal from "./ServicesDetailModal";
import { useDispatch } from "react-redux";
import { approveBookings, rejectBookings } from "../features/bookingsSlice";


export default function BookingsTable({bookings, services, adminStatus}) {
    const [show, setShow] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const handleClose = () => setShow(false);
    const dispatch = useDispatch();

    const handleShow = (booking) => {
        setSelectedBooking(booking)
        setShow(true);
    }

    const [showDetail, setShowDetail] = useState(false);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = (booking) => {
        setSelectedBooking(booking)
        setShowDetail(true);
    }


    const handleApproveBooking = (booking) => {
        dispatch(approveBookings(booking.booking_id))
    }

    const handleRejectBooking = (booking) => {
        dispatch(rejectBookings(booking.booking_id))
    }

    return (
        <>
             <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>No.</th>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Phone No.</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Booking</th>
                    <th>Service</th>
                    {adminStatus&&(
                        <th colSpan={2}>Admin Approval</th>
                    )}
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{booking.customer_name}</td>
                            <td>{booking.email}</td>
                            <td>{booking.phone_number}</td>
                            <td>{booking.date}</td>
                            <td>{booking.time}</td>
                            <td>{booking.name}</td>
                            <td className={booking.approval_status === 'pending'? "text-warning" : booking.approval_status === 'approved'? "text-success": "text-danger"}>{booking.approval_status}</td>
                            <td><button onClick={() => handleShow(booking)}>Edit Booking</button></td>
                            <td><button onClick={() => handleShowDetail(booking)}>View Service</button></td>
                            {adminStatus && (
                                <>
                                    <td><Button variant="success" onClick={() => handleApproveBooking(booking)}>Approve</Button></td>
                                    <td><Button variant="danger" onClick={() => handleRejectBooking(booking)}>Reject</Button></td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <UpdateBookingModal show={show} handleClose={handleClose} selectedBooking={selectedBooking} services={services}/>
            <ServicesDetailModal show={showDetail} handleClose={handleCloseDetail}  selectedBooking={selectedBooking}/>
        </>
    )
}