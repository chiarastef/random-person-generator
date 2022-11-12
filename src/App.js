import React from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [loaded, setLoaded] = React.useState(false);
  const [person, setPerson] = React.useState({});
  const [infoType, setInfoType] = React.useState("name");
  const [infoValue, setInfoValue] = React.useState("random person");

  async function getPerson() {
    const response = await fetch(url);
    const data = await response.json();
    const personAllData = data.results[0];

    const personInfo = {
      image: personAllData.picture.large,
      name: `${personAllData.name.first} ${personAllData.name.last} `,
      email: personAllData.email,
      age: personAllData.dob.age,
      street: `${personAllData.location.street.number} ${personAllData.location.street.name} `,
      phone: personAllData.phone,
      password: personAllData.login.password,
    };

    setLoaded(true);
    setPerson(personInfo);
    setInfoType("name");
    setInfoValue(personInfo.name);
  }

  React.useEffect(() => {
    getPerson();
  }, []);

  function getInfo(e) {
    if (e.target.classList.contains("icon")) {
      const infoType = e.target.dataset.label;
      setInfoType(infoType);
      setInfoValue(person[infoType]);
    }
  }

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={person.image || defaultImage}
            alt={person.name || "random person"}
          />
          <p className="user-title">My {infoType} is</p>
          <p className="user-value">{infoValue}</p>
          <div className="values-list">
            <button className="icon" data-label="name" onMouseOver={getInfo}>
              <FaUser />
            </button>
            <button className="icon" data-label="email" onMouseOver={getInfo}>
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-label="age" onMouseOver={getInfo}>
              <FaCalendarTimes />
            </button>
            <button className="icon" data-label="street" onMouseOver={getInfo}>
              <FaMap />
            </button>
            <button className="icon" data-label="phone" onMouseOver={getInfo}>
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={getInfo}
            >
              <FaLock />
            </button>
          </div>
          <button type="button" className="btn" onClick={getPerson}>
            {loaded ? "random user" : "loading..."}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
