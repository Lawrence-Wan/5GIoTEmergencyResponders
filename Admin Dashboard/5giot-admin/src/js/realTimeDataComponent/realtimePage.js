import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import Chart from "chart.js";
import "../../styles/realtime.css";
import { chartConfig } from "../sharedComponents/chartConfig";
import { Singleton } from "../websocketClient";
const maxLength = 10;
let device_id = "";
/**** END Chart Configurations ******* */

export default function RealTimePage({ showBtn, width, height, chartMain }) {
  const [isStop, setStop] = useState(!showBtn ? false : true);
  const [devices, setDevices] = useState([]);
  const [listDevices, setListDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const ws = useRef(null);
  const chartContainer = useRef(null);
  const [chartInst, setCharInst] = useState(chartMain);
  /*useEffect(() => {
    ws.current = new WebSocket("ws://127.0.0.1:9001");
    ws.current.onopen = () => {
      console.log("Websocket open", ws);
    };
    ws.current.onclose = () => {
      console.log("Websocket closed");
    };
    return () => {
      ws.current.close();
    };
  }, []);*/
  useEffect(() => {
    ws.current = Singleton.getInstance();
    //console.log("Realtime", ws);
    return () => {
      ws.current.close();
    };
  }, []);
  useEffect(() => {
    //console.log("list of devices", listDevices);
  }, [listDevices]);
  useEffect(() => {
    if (!chartInst) {
      console.log("chart container", chartContainer);
      if (chartContainer && chartContainer.current) {
        console.log("Creating New chart instance");
        const newChartInst = new Chart(chartContainer.current, chartConfig());
        setCharInst(newChartInst);
      }
    }
    //  }
  }, [chartContainer, chartInst]);
  useEffect(() => {
    if (chartInst) {
      if (!showBtn) {
        let temperatureArray = [
          "20.3433413",
          "10.2321312",
          "30.123123",
          "40.123213",
          "20.3433413",
          "10.2321312",
          "30.123123",
          "40.123213",
          "30.123123",
          "40.123213",
        ];
        let humidityArray = [
          "12.2323",
          "8.222",
          "13.222",
          "5.2333",
          "12.2323",
          "8.222",
          "13.222",
          "5.2333",
          "13.222",
          "5.2333",
        ];
        chartInst.data.labels = [
          "2020-10-14T08:21:58.383Z",
          "2020-10-14T08:22:02.918Z",
          "2020-10-14T08:22:19.947Z",
          "2020-10-14T08:22:42.580Z",
          "2020-10-14T08:23:42.580Z",
          "2020-10-14T08:24:42.580Z",
          "2020-10-14T08:25:42.580Z",
          "2020-10-14T08:26:42.580Z",
          "2020-10-14T08:27:42.580Z",
          "2020-10-14T08:28:42.580Z",
        ];
        chartInst.data.datasets[0].data = temperatureArray;
        chartInst.data.datasets[1].data = humidityArray;
        chartInst.update();
      } else {
        chartInst.data.labels = [];
        chartInst.data.datasets[0].data = [];
        chartInst.data.datasets[1].data = [];
        chartInst.clear();
      }
      console.log("chart instance", chartInst);
    }
  }, [chartInst, showBtn]);
  useEffect(() => {
    // Find a device based on its Id
    const findDevice = (deviceId) => {
      for (let i = 0; i < devices.length; ++i) {
        if (devices[i].deviceId === deviceId) {
          return i;
        }
      }

      return null;
    };

    const addDeviceData = (id, time, temperature, humidity) => {
      const existingDeviceIndex = findDevice(id);
      if (existingDeviceIndex == null) {
        console.log("new device so going to add data of device");
        var dataCopy = devices;
        var obj = initDevice();
        obj.deviceId = id;
        obj.timeData.push(time);
        obj.temperatureData.push(temperature);
        obj.humidityData.push(humidity);
        dataCopy.push(obj);
        setDevices(dataCopy);
        //setDevices((devices) => [...devices, obj]);
      } else {
        devices[existingDeviceIndex].timeData.push(time);
        devices[existingDeviceIndex].temperatureData.push(temperature);
        devices[existingDeviceIndex].humidityData.push(humidity);
        if (devices[existingDeviceIndex].timeData.length > maxLength) {
          devices[existingDeviceIndex].timeData.shift();
          devices[existingDeviceIndex].temperatureData.shift();
          devices[existingDeviceIndex].humidityData.shift();
        }
      }
    };
    if (!ws.current) return;
    ws.current.onmessage = (e) => {
      if (isStop) return;
      const messageData = JSON.parse(e.data);
      console.log(messageData);
      // time and either temperature or humidity are required
      if (
        !messageData.MessageDate ||
        (!messageData.IotData.temperature && !messageData.IotData.humidity)
      ) {
        return;
      } else {
        //Check if it is a new device or exisiting one
        const existingDeviceIndex = findDevice(messageData.DeviceId);

        if (existingDeviceIndex == null) {
          if (devices.length === 0) {
            console.log("selecting the first encountered device"); //selecting the first device if nothing is selected
            setSelectedDevice(messageData.DeviceId);
            device_id = messageData.DeviceId;
          }
          // device is new so add to list of devices
          console.log("new device entered into the list");
          setListDevices((listDevices) => [
            ...listDevices,
            { deviceId: messageData.DeviceId },
          ]);
        }

        addDeviceData(
          messageData.DeviceId,
          messageData.MessageDate,
          messageData.IotData.temperature,
          messageData.IotData.humidity
        );
        const index = devices.findIndex((x) => x.deviceId === device_id);

        if (device_id === messageData.DeviceId) {
          console.log(devices);
          console.log("update chart for device:", device_id);
          chartInst.data.labels = devices[index].timeData;
          chartInst.data.datasets[0].data = devices[index].temperatureData;
          chartInst.data.datasets[1].data = devices[index].humidityData;
          chartInst.update();
        }
      }
    };
  }, [isStop, devices, chartInst]);

  /****************** FUNCTIONS**************** */
  function initDevice() {
    return {
      deviceId: "",
      maxLen: maxLength,
      timeData: [],
      temperatureData: [],
      humidityData: [],
    };
  }
  function onDeviceSelect(e) {
    console.log("change device select", e.target.value);
    setSelectedDevice(e.target.value);
    device_id = e.target.value;
    chartInst.data.labels =
      devices[devices.findIndex((x) => x.deviceId === device_id)].timeData;
    chartInst.data.datasets[0].data =
      devices[
        devices.findIndex((x) => x.deviceId === device_id)
      ].temperatureData;
    chartInst.data.datasets[1].data =
      devices[devices.findIndex((x) => x.deviceId === device_id)].humidityData;
    chartInst.update();
  }

  return (
    <div>
      <div className="row realtime-header">
        <div className="col-sm-8">
          <span>Device(s):</span>
          <select
            name="Devices"
            onChange={onDeviceSelect}
            value={selectedDevice}
            style={{ width: "150px" }}
          >
            {listDevices.map((e, i) => {
              return (
                <option key={i} value={e.deviceId}>
                  {e.deviceId}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-sm-4">
          {" "}
          <Button
            onClick={() => setStop(!isStop)}
            className={showBtn ? "btn-success not-hidden" : "hidden"}
            style={{ width: "100px" }}
          >
            {isStop ? "Start" : "Stop"}
          </Button>
        </div>
      </div>
      <div className="row">
        <canvas
          ref={chartContainer}
          width={width}
          height={height}
          options={{ maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
}
