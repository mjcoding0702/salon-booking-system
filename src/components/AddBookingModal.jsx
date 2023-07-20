import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { saveBookings } from "../features/bookingsSlice";

export default function AddBookingModal({show, handleClose, services, userId}) {
    const [customerName, setCustomerName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [serviceId, setServiceId] = useState("");
    const dispatch = useDispatch();

    const handleSaveBooking = () => {
        dispatch(saveBookings({customerName, email, phoneNumber, date, time, serviceId, userId}));
        handleClose();
        setEmail("");
        setPhoneNumber("");
        setDate("");
        setTime("");
        setServiceId("");
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className="fw-bold ms-2">New Booking</Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label className="ps-2">Customer Name</Form.Label>
                    <Form.Control
                        placeholder="Enter name"
                        required
                        type="email"
                        onChange={(e) => setCustomerName(e.target.value)}
                    />
                    <br></br>
                    <Form.Label className="ps-2">Email</Form.Label>
                    <Form.Control
                        placeholder="Enter your email"
                        required
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br></br>
                    <Form.Label className="ps-2">Phone Number</Form.Label>
                    <Form.Control
                        placeholder="Enter your phone number"
                        required
                        type="text"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <br></br>
                    <Form.Label className="ps-2">Date</Form.Label>
                    <Form.Control
                        placeholder="Select the date"
                        required
                        type="date"
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <br></br>
                    <Form.Label className="ps-2">Time</Form.Label>
                    <Form.Control
                        placeholder="Select the time"
                        required
                        type="time"
                        onChange={(e) => setTime(e.target.value)}
                    />
                    <br></br>
                    <Form.Label className="ps-2">Service</Form.Label>
                    <Form.Select
                        placeholder="Select a service"
                        required
                        onChange={(e) => setServiceId(e.target.value)}
                    >
                        <option value="">Select a service</option>
                        {services.map((service) => 
                            <option key={service.id} value={service.id}>{service.name}</option>
                        )}
                    </Form.Select>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant="primary"
                    className="rounded-pill"
                    onClick={handleSaveBooking}
                >Book Now</Button>
            </Modal.Footer>
        </Modal>
    )
}
