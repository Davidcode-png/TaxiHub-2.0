import React, { useState } from "react";
import { Container, Row, Col, Card, Nav,Navbar } from "react-bootstrap";

const DriverDashboard = () => {
  const [activePill, setActivePill] = useState("dashboard");

  const handlePillClick = (pill) => {
    setActivePill(pill);
  };

  const renderContent = () => {
    switch (activePill) {
      case "dashboard":
        return (
          <div>
            <h4 className="mb-3 text-white">Dashboard</h4>
            <Row>
              <Col sm={6} md={4} lg={3}>
                <Card className="mb-4">
                  <Card.Header>
                    <i className="fa fa-car" aria-hidden="true"></i>
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
                    <i className="fa fa-money" aria-hidden="true"></i>
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
                    <i className="fa fa-calendar" aria-hidden="true"></i>
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
                    <i className="fa fa-users" aria-hidden="true"></i>
                    Ratings
                  </Card.Header>
                  <Card.Body>
                    <h3>4.5</h3>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
        );
      case "vehicles":
        return (
          <div>
            <h4 className="mb-3">Vehicles</h4>
            <Row>
              <Col sm={6} md={4} lg={3}>
                <Card className="mb-4">
                  <Card.Header>Vehicle 1</Card.Header>
                  <Card.Body>
                    <p>Make: Honda</p>
                    <p>Model: Civic</p>
                    <p>Year: 2020</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} md={4} lg={3}>
                <Card className="mb-4">
                  <Card.Header>Vehicle 2</Card.Header>
                  <Card.Body>
                    <p>Make: Toyota</p>
                    <p>Model: Corolla</p>
                    <p>Year: 2019</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={6} md={4} lg={3}>
                <Card className="mb-4">
                  <Card.Header>Vehicle 3</Card.Header>
                  <Card.Body>
                    <p>Make: Ford</p>
                    <p>Model: Mustang</p>
                <p>Year: 2018</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  case "earnings":
    return (
      <div>
        <h4 className="mb-3">Earnings</h4>
        <Row>
          <Col sm={6} md={4} lg={3}>
            <Card className="mb-4">
              <Card.Header>Week 1</Card.Header>
              <Card.Body>
                <p>Earnings: $100</p>
                <p>Rides: 10</p>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} md={4} lg={3}>
            <Card className="mb-4">
              <Card.Header>Week 2</Card.Header>
              <Card.Body>
                <p>Earnings: $120</p>
                <p>Rides: 12</p>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} md={4} lg={3}>
            <Card className="mb-4">
              <Card.Header>Week 3</Card.Header>
              <Card.Body>
                <p>Earnings: $140</p>
                <p>Rides: 14</p>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} md={4} lg={3}>
            <Card className="mb-4">
              <Card.Header>Week 4</Card.Header>
              <Card.Body>
                <p>Earnings: $160</p>
                <p>Rides: 16</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  case "settings":
    return (
      <div className="text-white">
        <h4 className="mb-3 text-white">Settings</h4>
        <p>This is the Settings page.</p>
      </div>
    );
  default:
    return null;
}
};

return (
    <div className="vh-100 bg-dark">
    <Container >
    <Row >
      <Col md={3} className="d-none d-md-block mt-3">
        <Nav
          variant="pills"
          className="flex-column mt-3"
          activeKey={activePill}
        >
          <Nav.Item>
            <Nav.Link
              eventKey="dashboard"
              onClick={() => handlePillClick("dashboard")}
            >
              Dashboard
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="vehicles"
              onClick={() => handlePillClick("vehicles")}
            >
              Vehicles
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="earnings"
              onClick={() => handlePillClick("earnings")}
            >
              Earnings
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              eventKey="settings"
              onClick={() => handlePillClick("settings")}
            >
              Settings
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
      <Col md={9}>
        <Navbar bg="dark" expand="md" className="d-md-none">
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-white" />
          <Navbar.Collapse id="basic-navbar-nav" className="bg-dark">
            <Nav
              variant="pills"
              className="flex-column mt-3"
              activeKey={activePill}
              onSelect={(pill) => setActivePill(pill)}
            >
              <Nav.Item>
                <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="vehicles">Vehicles</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="earnings">Earnings</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="settings">Settings</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {renderContent()}
      </Col>
    </Row>
  </Container>
  </div>
);
};

export default DriverDashboard;