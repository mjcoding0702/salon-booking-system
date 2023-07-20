import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { saveServices } from "../features/servicesSlice";

export default function NewServiceModal({show, handleClose}) {
    const [serviceName, setServiceName] = useState("");
    const [serviceDescription, setServiceDescription] = useState("");
    const [serviceDuration, setServiceDuration] = useState("");
    const [servicePrice, setServicePrice] = useState("");
    const [serviceFile, setServiceFile] = useState(null);
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        setServiceFile(e.target.files[0]);
    }

    const handleSaveService = () => {
        dispatch(saveServices({serviceName, serviceDescription, serviceDuration, servicePrice,serviceFile}));
        handleClose();
        setServiceName("")
        setServiceDescription("")
        setServiceDuration("")
        setServicePrice("")
        setServiceFile(null)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className="fw-bold ms-2">Add New Service</Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label className="ps-2">Name</Form.Label>
                    <Form.Control
                        placeholder="Enter service name"
                        required
                        type="text"
                        onChange={(e) => setServiceName(e.target.value)}
                    />
                    <br></br>
                    <Form.Label className="ps-2">Description</Form.Label>
                    <Form.Control
                        placeholder="Enter service description"
                        required
                        as="textarea"
                        rows={3}
                        onChange={(e) => setServiceDescription(e.target.value)}
                    />
                    <br></br>
                    <Form.Label className="ps-2">Duration (mins)</Form.Label>
                    <Form.Control
                        placeholder="Enter service duration"
                        required
                        type="number"
                        onChange={(e) => setServiceDuration(e.target.value)}
                    />
                    <br></br>
                    <Form.Label className="ps-2">Price ($)</Form.Label>
                    <Form.Control
                        placeholder="Enter service price"
                        required
                        type="number"
                        onChange={(e) => setServicePrice(e.target.value)}
                    />
                    <br></br>
                    <Form.Label className="ps-2">Image</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant="primary"
                    className="rounded-pill"
                    onClick={handleSaveService}
                >Add New Service</Button>
            </Modal.Footer>
        </Modal>
    )
}