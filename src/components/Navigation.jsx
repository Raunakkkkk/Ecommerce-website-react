import React, { useState } from "react";
import CartBasket from "./CartBasket";
import DropDown from "./FilterDropDown";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Modal,
  Button,
  NavLink,
} from "react-bootstrap";
import { useAuth } from "./context/auth";
import { useNavigate } from "react-router-dom";

function Navigation(props) {
  const auth=localStorage.getItem('auth');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate=useNavigate();
  const { cartItems, onAdd, onRemove, onDelete } = props;
  return (
    <>
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <span id="brand">Ecommerce App</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {auth?(<>
                <Button onClick={()=>{
              localStorage.removeItem('auth');
              window.location.reload();
              // window.location.href="http://localhost:3000/"//redirecting to login page
              navigate('/')
            }}>
                Logout
               
                
              </Button></>):(<>

              </>)}
            

              <Nav.Link to="/home/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact Us</Nav.Link>

{auth?(<>
{/* //showing cart button only when logged in */}
  <Button onClick={handleShow}>
                Cart{" "}
                {props.countCartItems ? (
                  <span className="badge badge-light">
                    {props.countCartItems}
                  </span>
                ) : (
                  ""
                )}
              </Button>
</>):(<></>)}

             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CartBasket
            onDelete={onDelete}
            onAdd={onAdd}
            onRemove={onRemove}
            cartItems={cartItems}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Navigation;
