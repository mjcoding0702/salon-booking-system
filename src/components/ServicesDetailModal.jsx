import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";


export default function ServicesDetailModal({show, handleClose, selectedBooking}) {
    const [service, setService] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        if(selectedBooking) {
            setService(selectedBooking.name); // assuming the service name is in the 'name' field
            setDescription(selectedBooking.description);
            setDuration(selectedBooking.duration);
            setPrice(selectedBooking.price);
        }
    }, [selectedBooking]);

    return (
        <Modal show={show} onHide={handleClose}> 
            <Modal.Header closeButton>
                <Modal.Title>Service Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label className="ps-2">Service</Form.Label>
                        <Form.Control
                            type="text"
                            value={service}
                            readOnly
                            style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                            className="mb-3"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="ps-2">Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={description}
                            readOnly
                            style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                            className="mb-3"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="ps-2">Duration (mins)</Form.Label>
                        <Form.Control
                            type="number"
                            value={duration}
                            readOnly
                            style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                            className="mb-3"
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className="ps-2">Price ($)</Form.Label>
                        <Form.Control
                            type="number"
                            value={price}
                            readOnly
                            style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                            className="mb-3"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    )
}