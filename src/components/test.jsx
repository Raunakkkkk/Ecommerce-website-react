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
} from "react-bootstrap";
import { useAuth } from "./context/auth";

export function Test(props) {
  const [auth] = useAuth();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { cartItems, onAdd, onRemove, onDelete } = props;
  const authFormlocal = localStorage.getItem("auth");
  if (authFormlocal == null) {
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
                <Nav.Link href="/home/about">About</Nav.Link>
                <Nav.Link href="/home/contact">Contact Us</Nav.Link>

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
            <Button
                    onClick={() => {
                      localStorage.setItem("auth", null);
                      window.location.reload();
                    }}
                  >
                    Logout
                  </Button>

              <Nav.Link href="/home/about">About</Nav.Link>
              <Nav.Link href="/home/contact">Contact Us</Nav.Link>

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


