import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateServices } from "../features/servicesSlice";

export default function UpdateServiceModal({show, handleClose, service}) {
    const [serviceName, setServiceName] = useState(service.name);
    const [serviceDescription, setServiceDescription] = useState(service.description);
    const [serviceDuration, setServiceDuration] = useState(service.duration);
    const [servicePrice, setServicePrice] = useState(service.price);
    const [serviceFile, setServiceFile] = useState(null);
    const imageurl = service.imageurl;
    const serviceId = service.id;
    const dispatch = useDispatch();

    const handleFileChange = (e) => {
        setServiceFile(e.target.files[0]);
    }

    // Update state when `service` prop changes
    useEffect(() => {
        if (service) {
            setServiceName(service.name);
            setServiceDescription(service.description);
            setServiceDuration(service.duration);
            setServicePrice(service.price);
        }
    }, [service]);

    const handleUpdateService = () => {
        dispatch(updateServices({serviceName, serviceDescription, serviceDuration, servicePrice,serviceFile, imageurl, serviceId}));
        handleClose();
        setServiceName("")
        setServiceDescription("")
        setServiceDuration("")
        setServicePrice("")
        setServiceFile(null)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton className="fw-bold ms-2">Update Service</Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label className="ps-2">Name</Form.Label>
                    <Form.Control
                        placeholder="Enter service name"
                        type="text"
                        onChange={(e) => setServiceName(e.target.value)}
                        value={serviceName}
                    />
                    <br></br>
                    <Form.Label className="ps-2">Description</Form.Label>
                    <Form.Control
                        placeholder="Enter service description"
                        as="textarea"
                        rows={3}
                        onChange={(e) => setServiceDescription(e.target.value)}
                        value={serviceDescription}
                    />
                    <br></br>
                    <Form.Label className="ps-2">Duration (mins)</Form.Label>
                    <Form.Control
                        placeholder="Enter service duration"
                        type="number"
                        onChange={(e) => setServiceDuration(e.target.value)}
                        value={serviceDuration}
                    />
                    <br></br>
                    <Form.Label className="ps-2">Price ($)</Form.Label>
                    <Form.Control
                        placeholder="Enter service price"
                        type="number"
                        onChange={(e) => setServicePrice(e.target.value)}
                        value={servicePrice}
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
                    onClick={handleUpdateService}
                >Update</Button>
            </Modal.Footer>
        </Modal>
    )
}