import { useEffect, useState } from "react";
import { listById } from "../services/BankService";
import socket from "../utils/socket";

const BankPage = () => {
  const [name, setName] = useState("");
  const [idBank, setIdBank] = useState("");

  //Ticket
  const [capacityNormalWindow, setCapacityNormalWindow] = useState(0);
  const [capacityNormalPlatform, setCapacityNormalPlatform] = useState(0);
  const [capacityPrefWindow, setCapacityPrefWindow] = useState(0);
  const [capacityPrefPlatform, setCapacityPrefPlatform] = useState(0);

  //Camera 1
  const [capacityInt, setCapacityInt] = useState(0);

  //Camera 2
  const [capacityAtm, setCapacityAtm] = useState(0);

  //Camera 3
  const [capacityTranQueue, setCapacityTranQueue] = useState(0);
  const [capacityAtmQueue, setCapacityAtmQueue] = useState(0);

  //Sensor
  const [capacitySensorInt, setCapacitySensorInt] = useState(0);

  useEffect(() => {
    if (idBank !== "") {
      console.log("Use socket");
      socket.on(`Send Capacity by Camera 1 ${idBank}`, (data) => {
        if (capacityInt !== data.capacityInt) setCapacityInt(data.capacityInt);
      });
      socket.on(`Send Capacity by Camera 2 ${idBank}`, (data) => {
        if (capacityAtm !== data.capacityAtm) setCapacityAtm(data.capacityAtm);
      });
      socket.on(`Send Capacity by Camera 3 ${idBank}`, (data) => {
        if (capacityTranQueue !== data.capacityTranQueue) setCapacityTranQueue(data.capacityTranQueue);
        if (capacityAtmQueue !== data.capacityAtmQueue) setCapacityAtmQueue(data.capacityAtmQueue);
      });
      socket.on(`Send Capacity by Ticket ${idBank}`, (data) => {
        if (capacityNormalWindow !== data.capacityNormalWindow) setCapacityNormalWindow(data.capacityNormalWindow);
        if (capacityNormalPlatform !== data.capacityNormalPlatform) setCapacityNormalPlatform(data.capacityNormalPlatform);
        if (capacityPrefWindow !== data.capacityPrefWindow) setCapacityPrefWindow(data.capacityPrefWindow);
        if (capacityPrefPlatform !== data.capacityPrefPlatform) setCapacityPrefPlatform(data.capacityPrefPlatform);
      });
      socket.on(`Send Capacity by Sensor ${idBank}`, (data) => {
        if (capacitySensorInt !== data.capacitySensorInt) setCapacitySensorInt(data.capacitySensorInt);
      });
    }
  }, []);

  const listByIdFromApi = async (idBank) => {
    if (idBank === "") return;
    listById(idBank).then(
      (data) => {
        console.log(data);
        if (data && data.data) {
          setName(data.data.name);
          socket.connect();
        }
      },
      (error) => {
        console.log(error);
        socket.connect();
      }
    );
  }

  const handleChange = (event) => {
    setIdBank(event.target.value);
  }

  const handleSubmit = () => {
    listByIdFromApi(idBank);
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <label>idBank: </label>
      <input type="text" value={idBank} onChange={handleChange} />
      <button onClick={handleSubmit}>Buscar</button>
      <br></br>
      <br></br>
      <label>Name: </label>
      <label>{name}</label>
      <br></br>
      <br></br>
      <label>Ticket: </label>
      <br></br>
      <label>capacityNormalWindow: </label>
      <label>{capacityNormalWindow}</label>
      <br></br>
      <label>capacityNormalPlatform: </label>
      <label>{capacityNormalPlatform}</label>
      <br></br>
      <label>capacityPrefWindow: </label>
      <label>{capacityPrefWindow}</label>
      <br></br>
      <label>capacityPrefPlatform: </label>
      <label>{capacityPrefPlatform}</label>
      <br></br>
      <br></br>
      <label>Sensor: </label>
      <br></br>
      <label>capacitySensorInt: </label>
      <label>{capacitySensorInt}</label>
      <br></br>
      <br></br>
      <label>Camera 1: </label>
      <br></br>
      <label>capacityInt: </label>
      <label>{capacityInt}</label>
      <br></br>
      <br></br>
      <label>Camera 2: </label>
      <br></br>
      <label>capacityAtm: </label>
      <label>{capacityAtm}</label>
      <br></br>
      <br></br>
      <label>Camera 3: </label>
      <br></br>
      <label>capacityTranQueue: </label>
      <label>{capacityTranQueue}</label>
      <br></br>
      <label>capacityAtmQueue: </label>
      <label>{capacityAtmQueue}</label>
      <br></br>

    </div>
  );
};

export default BankPage;
