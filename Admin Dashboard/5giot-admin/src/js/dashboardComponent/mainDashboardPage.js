import React, { useState, useEffect, useRef } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import CustomizedTable from "../sharedComponents/customizedTable";
import { assetColumns, userColumns } from "../sharedComponents/tableColumns";
import { getAssets } from "../assetComponent/assetService";
import { getApolloClient } from "../apolloClient";
import { getUsers } from "../userComponent/userService";
import Map from "../realTimeDataComponent/map";
import RealTimePage from "../realTimeDataComponent/realtimePage";
import { chartConfig } from "../sharedComponents/chartConfig";
import Chart from "chart.js";
import { faUser, faCubes, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function MainDashboardPage() {
  const columns = React.useMemo(() => assetColumns, []);
  const userTable = React.useMemo(() => userColumns, []);
  const [assetsMain, setAssetsMain] = useState([]);
  const [users, setUsers] = useState([]);
  const chartMain = useRef(null);
  const [chart, setChart] = useState(null);
  const [activeAssets, setActiveAssets] = useState(0);
  const [inactiveAssets, setInactiveAssets] = useState(0);
  const [ref, setRef] = useState(false);
  useEffect(() => {
    if (chartMain && chartMain.current) {
      console.log("Creating New chart instance");
      const newChartInst = new Chart(chartMain.current, chartConfig());
      setChart(newChartInst);
    }
  }, [chartMain]);

  useEffect(() => {
    let apolloClient = getApolloClient();
    if (!assetsMain.length > 0 || ref) {
      apolloClient
        .query({
          query: getAssets,
        })
        .then((response) => {
          let active = 0;
          let inactive = 0;
          setAssetsMain(response.data.assets);
          for (var i = 0; i < response.data.assets.length; i++) {
            if (response.data.assets[i].status === "Active") active++;
            else inactive++;
          }
          setActiveAssets(active);
          setInactiveAssets(inactive);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (!users.length > 0) {
      apolloClient
        .query({
          query: getUsers,
        })
        .then((response) => {
          let usersList = [];
          usersList = response.data.users.map((obj) => {
            return {
              name: obj.firstName + " " + obj.lastName,
              role: obj.role,
              contactNumber: obj.contactNumber,
            };
          });

          // console.log(users);
          setUsers(usersList);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [users, assetsMain, ref]);
  return (
    <div>
      <div className="row" style={{ borderBottom: "1px solid rgba(0,0,0,.1)" }}>
        <Col sm={6}>
          <h3 className="font-weight-bold">Dashboard</h3>
        </Col>
        <Col sm={6}>
          <h4 style={{ float: "right" }}>
            {new Date().toLocaleString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              time: "numeric",
            })}
            <span> {new Date().toLocaleTimeString()}</span>
          </h4>
        </Col>
      </div>

      <Row style={{ paddingTop: "3%" }}>
        <Col sm={4}>
          <Card className="shadow " style={{ borderLeft: "4px solid #36b9cc" }}>
            <Card.Body>
              <Row className="no-gutters align-items-center">
                <Col className="mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    users
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {users.length === 0 ? "" : users.length}
                  </div>
                </Col>
                <Col sm="auto">
                  <i style={{ color: "#dddfeb ", fontSize: "2em" }}>
                    <FontAwesomeIcon icon={faUser} />
                  </i>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card className="shadow " style={{ borderLeft: "4px solid #fd7e14" }}>
            <Card.Body>
              <Row className="no-gutters align-items-center">
                <Col className="mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Active Devices
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {activeAssets}
                  </div>
                </Col>
                <Col sm="auto">
                  <i>
                    <FontAwesomeIcon
                      icon={faCubes}
                      style={{ color: "#dddfeb", fontSize: "2em" }}
                    />
                  </i>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={4}>
          <Card className="shadow " style={{ borderLeft: "4px solid #f6c23e" }}>
            <Card.Body>
              <Row className="no-gutters align-items-center">
                <Col className="mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Inactive Devices
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {inactiveAssets}
                  </div>
                </Col>
                <Col sm="auto">
                  <i style={{ color: "#dddfeb", fontSize: "2em" }}>
                    <FontAwesomeIcon icon={faCubes} />
                  </i>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row style={{ paddingTop: "3%" }}>
        <Col sm={{ span: "10", offset: "1" }}>
          <Card style={{ height: "60vh" }} className="shadow">
            <Card.Header
              className="text-white font-weight-bold bg-secondary"
              style={{
                backgroundColor: "#f8f9fc",
                borderBottom: "x 1px solid #e3e6f0",
              }}
            >
              Statistics
            </Card.Header>
            <Card.Body>
              <RealTimePage
                width={"20%"}
                height={"5%"}
                showBtn={false}
                chartMain={chart}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row style={{ paddingTop: "5%" }}>
        <Col sm={{ span: "8", offset: "2" }}>
          <Card style={{ height: "60vh" }} className="shadow">
            <Card.Header className="bg-info font-weight-bold text-white">
              Location
            </Card.Header>
            <Card.Body style={{ backgroundColor: "white", overflow: "scroll" }}>
              <Map width={"100%"} height={"100%"} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row style={{ paddingTop: "3%" }}>
        <Col sm="6">
          <Card style={{ height: "50vh" }} className="shadow">
            <Card.Header className="bg-success font-weight-bold text-white">
              Assets
              <Button
                onClick={() => setRef(!ref)}
                style={{
                  float: "right",
                  backgroundColor: "rgba(0, 0, 255, 0)",
                  border: "none",
                }}
              >
                {" "}
                <i>
                  <FontAwesomeIcon
                    icon={faSyncAlt}
                    style={{ color: "#ffffff" }}
                  />
                </i>
              </Button>
            </Card.Header>
            <Card.Body style={{ backgroundColor: "white" }}>
              <CustomizedTable
                columns={columns}
                data={assetsMain}
                tHeadStyle={{
                  backgroundColor: "#f8f9fc",
                  textAlign: "center",
                  fontFamily: "poppins-medium",
                }}
                minPageSize={2}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col sm="6">
          <Card style={{ height: "50vh" }} className="shadow">
            <Card.Header className="bg-primary font-weight-bold text-white">
              Users
            </Card.Header>
            <Card.Body>
              <CustomizedTable
                columns={userTable}
                data={users}
                tHeadStyle={{
                  backgroundColor: "#f8f9fc",
                  textAlign: "center",
                  fontFamily: "poppins-medium",
                }}
                minPageSize={2}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
