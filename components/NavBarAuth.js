/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container className="navbar">
        <Link passHref href="/">
          <Navbar.Brand>SKATE SPOT</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="navbarButtons">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Your Skate Spots</Nav.Link>
            </Link>
            <Link passHref href="/neighborhood">
              <Nav.Link>Neighborhoods</Nav.Link>
            </Link>
            <Link passHref href="/location/new">
              <Nav.Link>Create New Skate Spot</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut} className="signOutButton">Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
