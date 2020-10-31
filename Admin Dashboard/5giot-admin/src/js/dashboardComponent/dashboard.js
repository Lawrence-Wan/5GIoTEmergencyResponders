import {
  faChartArea,
  faCubes,
  faMapMarker,
  faRssSquare,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Col, Nav, Row } from "react-bootstrap";
import "../../styles/dashboard.css";
import AssetPage from "../assetComponent/assetPage";
import Header from "./header.js";
import MainDashboardPage from "./mainDashboardPage";
import Sidebar from "./sidebar.js";
import RealtimePage from "../realTimeDataComponent/realtimePage";
import MapContainer from "../realTimeDataComponent/map";
import { useEffect } from "reactn";
export default function Dashboard() {
  /*************** DATA ****************** */
  const [showPage, setShowPage] = useState({
    isMain: true,
    isAsset: false,
    isStat: false,
    isMap: false,
    isReal: true,
  });

  useEffect(() => {
    setShowPage({
      isMain: true,
      isAsset: false,
      isStat: false,
      isMap: false,
      isReal: false,
    });
  }, []);
  /************** Methods ***************** */

  return (
    <div className="dashboard-bg container-fluid ">
      <Row>
        <Header />
      </Row>
      <Row>
        <Col sm="2" className="no-padding">
          {/* width={300} */}
          <Sidebar width={230} height={"100vh"}>
            <Nav defaultActiveKey="dashboard" className="flex-column sidebar">
              <Nav.Link
                eventKey="dashboard"
                onClick={() =>
                  setShowPage({
                    isMain: true,
                    isAsset: false,
                    isStat: false,
                    isMap: false,
                    isReal: false,
                  })
                }
              >
                <Row>
                  <Col sm="2">
                    <span>
                      <i>
                        <FontAwesomeIcon
                          icon={faTachometerAlt}
                          style={{ color: "#015ec6" }}
                        />
                      </i>
                    </span>
                  </Col>
                  <Col sm="10">Dashboard</Col>
                </Row>
              </Nav.Link>
              <hr />
              <Nav.Link
                eventKey="asset"
                onClick={() =>
                  setShowPage({
                    isMain: false,
                    isAsset: true,
                    isStat: false,
                    isMap: false,
                    isReal: false,
                  })
                }
              >
                <Row>
                  <Col sm="2">
                    <span>
                      <i>
                        <FontAwesomeIcon
                          icon={faCubes}
                          style={{ color: "#015ec6" }}
                        />
                      </i>
                    </span>
                  </Col>
                  <Col sm="10">Asset</Col>
                </Row>
              </Nav.Link>
              <hr />
              <Nav.Link
                eventKey="statistic"
                onClick={() =>
                  setShowPage({
                    isMain: false,
                    isAsset: false,
                    isStat: true,
                    isMap: false,
                    isReal: false,
                  })
                }
              >
                <Row>
                  <Col sm="2">
                    <span>
                      <i>
                        <FontAwesomeIcon
                          icon={faChartArea}
                          style={{ color: "#015ec6" }}
                        />
                      </i>
                    </span>
                  </Col>
                  <Col sm="10">Statistics</Col>
                </Row>
              </Nav.Link>
              <hr />
              <Nav.Link
                eventKey="map"
                onClick={() =>
                  setShowPage({
                    isMain: false,
                    isAsset: false,
                    isStat: false,
                    isMap: true,
                    isReal: false,
                  })
                }
              >
                <Row>
                  <Col sm="2">
                    <span>
                      <i>
                        <FontAwesomeIcon
                          icon={faMapMarker}
                          style={{ color: "#015ec6" }}
                        />
                      </i>
                    </span>
                  </Col>
                  <Col sm="10">Map</Col>
                </Row>
              </Nav.Link>
              <hr />
              <Nav.Link
                eventKey="real"
                onClick={() =>
                  setShowPage({
                    isMain: false,
                    isAsset: false,
                    isStat: false,
                    isMap: false,
                    isReal: true,
                  })
                }
              >
                <Row>
                  <Col sm="2">
                    <span>
                      <i>
                        <FontAwesomeIcon
                          icon={faRssSquare}
                          style={{ color: "#015ec6" }}
                        />
                      </i>
                    </span>
                  </Col>
                  <Col sm="10">Real-Time Panel</Col>
                </Row>
              </Nav.Link>
            </Nav>
          </Sidebar>
        </Col>
        <Col sm="10">
          <div style={{ paddingTop: "3%", paddingBottom: "5%" }}>
            <div className={showPage.isMain ? "not-hidden" : "hidden"}>
              <MainDashboardPage />
            </div>
            <div className={showPage.isAsset ? "not-hidden" : "hidden"}>
              {" "}
              <AssetPage />
            </div>
            <div className={showPage.isMap ? "not-hidden" : "hidden"}>
              <MapContainer width={"100%"} height={"100vh"} />
            </div>
            <div className={showPage.isReal ? "not-hidden" : "hidden"}>
              <RealtimePage
                showBtn={true}
                width={"60%"}
                height={"20%"}
                chartMain={null}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
