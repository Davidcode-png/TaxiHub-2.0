import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';

const DriverDashboard = () => {
  return (
    <Container fluid>
      <Row>
        <Col sm={3} md={2} className="bg-light sidebar">
          <div className="sidebar-sticky">
            <h4>Driver Dashboard</h4>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  <i className="bi bi-speedometer2" aria-hidden="true"></i>
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="bi bi-car-front-fill" aria-hidden="true"></i>
                  Vehicles
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="bi bi-gear" aria-hidden="true"></i>
                  Settings
                </a>
              </li>
            </ul>
          </div>
        </Col>
        <Col sm={9} md={10} className="bg-light main">
          <h4 className="mb-3">Dashboard</h4>
          <Row>
            <Col sm={6} md={4} lg={3}>
              <Card className="mb-4">
                <Card.Header>
                  <i className="bi bi-car-front-fill" aria-hidden="true"></i>
                  Total Rides
                </Card.Header>
                <Card.Body>
                  <h3>50</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} md={4} lg={3}>
              <Card className="mb-4">
                <Card.Header>
                  <i className="bi bi-cash" aria-hidden="true"></i>
                  Total Earnings
                </Card.Header>
                <Card.Body>
                  <h3>$500</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} md={4} lg={3}>
              <Card className="mb-4">
                <Card.Header>
                  <i className="bi bi-calendar" aria-hidden="true"></i>
                  Current Week
                </Card.Header>
                <Card.Body>
                  <h3>10 Rides</h3>
                  <h4>$100</h4>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={6} md={4} lg={3}>
              <Card className="mb-4">
                <Card.Header>
                  <i className="bi bi-people-fill" aria-hidden="true"></i>
                  Ratings
                </Card.Header>
                <Card.Body>
                  <h3>4.5</h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default DriverDashboard;
