import { useState, useEffect, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteBookings, updateBookings } from "../features/bookingsSlice";
import { AuthContext } from "./AuthProvider";

function UpdateBookingModal({ show, handleClose, selectedBooking, services }) {
    const [customerName, setCustomerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [serviceId, setServiceId] = useState("");
    const [bookingId, setBookingId] = useState("");
    const dispatch = useDispatch();
    const {currentUser, adminStatus} = useContext(AuthContext);
    let userUid= "";
    
    if (currentUser){
        userUid = currentUser.uid;
    }

    useEffect(() => {
        if(selectedBooking) {
            setCustomerName(selectedBooking.customer_name);
            setPhoneNumber(selectedBooking.phone_number);
            setEmail(selectedBooking.email);
            setDate(selectedBooking.date);
            setTime(selectedBooking.time);
            setServiceId(selectedBooking.service_id); // assuming the service name is in the 'name' field
            setBookingId(selectedBooking.booking_id);
        }
    }, [selectedBooking]);

    const handleUpdateBooking = () => {
        dispatch(updateBookings({customerName,email,phoneNumber,date,time,serviceId,bookingId,userUid}))
        handleClose();
    }

    const handleDeleteBooking = () => {
        dispatch(deleteBookings(bookingId));
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}> 
            <Modal.Header closeButton>
                <Modal.Title>Your Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label className="ps-2">Customer Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="ps-2">Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="ps-2">Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="ps-2">Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="ps-2">Time</Form.Label>
                        <Form.Control
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="ps-2">Service</Form.Label>
                        <Form.Select 
                            value={serviceId} 
                            onChange={(e) => setServiceId(e.target.value)}
                        >
                            {services.map((service, index) => 
                                <option key={index} value={service.id}>{service.name}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleUpdateBooking}>Save Booking</Button>
                <Button variant="danger" onClick={handleDeleteBooking}>Delete Booking</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateBookingModal;