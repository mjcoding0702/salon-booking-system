import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { AuthContext, AuthProvider } from "./components/AuthProvider";
import AuthPage from "./pages/AuthPage";
import Booking from "./pages/Booking";
import ServicesPage from "./pages/ServicesPage";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { auth } from "./firebase";
import { useContext } from "react";
import { Provider } from "react-redux";
import store from "./store";


function Layout(){
  const handleLogout = () => auth.signOut();
  const {currentUser} = useContext(AuthContext);
  return(
    <>
      <Navbar bg="light" variant="light" className="mb-3">
        <Container className="justify-content-start gap-4">
          <Navbar.Brand href="/">Salon Logo</Navbar.Brand>
          <Nav.Link href="/services">Services</Nav.Link>
          {currentUser && (
            <Nav.Link href="/booking">Booking</Nav.Link>
          )}
          {currentUser && (
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
          )}
        </Container>
      </Navbar>
      <Outlet/>
    </>
  )
}


export default function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<AuthPage/>}/>
              <Route path="*" element={<AuthPage/>} />
              <Route path="/login" element={<AuthPage/>} />
              <Route path="/booking" element={<Booking/>} />
              <Route path="/services" element={<ServicesPage/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  )
}