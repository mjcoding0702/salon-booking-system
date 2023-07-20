import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { AuthContext } from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import NewServiceModal from "../components/NewServiceModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteServices, fetchServices } from "../features/servicesSlice";
import UpdateServiceModal from "../components/UpdateServiceModal";


export default function ServicesPage() {
    const {currentUser, adminStatus}= useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const services = useSelector((state) => state.services.services);
    const loading = useSelector((state) => state.services.loading)
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        if(!currentUser){
            navigate('/login');
        }
    },[currentUser])

    useEffect(() => {
        dispatch(fetchServices());
    },[dispatch, services])

    const handleShowUpdate = (service) => {
        setSelectedService(service);
        setShowUpdateModal(true);
    }

    const handleUpdateClose = () => {
        setShowUpdateModal(false);

    }
    
    const handleDeleteService = (serviceId) => {
        dispatch(deleteServices(serviceId))
    }

    return (
        <Container>
            <div className="d-flex justify-content-between mx-3 mb-5">
                <h1>Services Page</h1>
                {adminStatus===true && (
                    <Button className="btn btn-primary rounded-pill mt-2 me-3" variant="primary" onClick={handleShow}>Add Service</Button>
                )}
            </div>
            
            <Row style={{width: "100%", maxWidth: "100%"}} className="m-0">
                {services.map(service => (
                    <Col key={service.id} xs={12} md={4}>
                        <Card style={{width: '24rem', marginBottom: '20px'}} className="p-2">
                            {adminStatus===true && (
                                <>
                                    <div className="d-flex justify-content-end mb-2">
                                        <Button variant="secondary" style={{width: '50px', height: '50px'}} className="me-3" onClick={() => handleShowUpdate(service)}><i className="bi bi-pencil"></i></Button>
                                        <Button variant="danger" style={{width: '50px', height: '50px'}}><i className="bi bi-trash" onClick={() => handleDeleteService(service.id)}></i></Button>
                                    </div>
                                </>
                            )}
                            <Card.Img variant="top" src={service.imageurl} style={{width: "100%", height:"400px", objectFit: "cover"}} className="border"/>
                            <Card.Body>
                                <Card.Title>{service.name}</Card.Title>
                                <Card.Text>
                                    {service.description}
                                </Card.Text>
                                <Card.Text>
                                    Duration: {service.duration} mins
                                </Card.Text>
                                <Card.Text>
                                    Price: ${service.price}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {loading && (
                <Spinner animation="border" className="ms-3 mt-3" variant="primary" />
            )}
            <NewServiceModal show={show} handleClose={handleClose} />
            {selectedService && (
                <UpdateServiceModal show={showUpdateModal} handleClose={handleUpdateClose} service={selectedService}/>
            )}
        </Container>
    )
}