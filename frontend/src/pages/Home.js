import React, { useState, useEffect } from "react";

export default function Home({ props }) {
  const [counter, setCounter] = useState(0);
  const [apiData, setApiData] = useState([]);

  const onButtonClick = (type) => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    async function fetchData() {
      const liveUrl = "https://jsonplaceholder.typicode.com/posts";
      const res = await fetch(liveUrl);
      const data = await res.json();
      console.log(data, "DATA WE FETCHED");
      setApiData(data);
    }
    fetchData();
  }, []);

  const renderTableRows = () => {
    let rows = [];
    if (apiData.length !== 0) {
      rows = apiData.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.from}</td>
            <td style={{ textAlign: "right" }}>{item.userId}</td>
            <td style={{ textAlign: "right" }}>{item.title}</td>
            <td style={{ textAlign: "right" }}>{item.id}</td>
          </tr>
        );
      });
    } else {
      return <p>No data available</p>;
    }

    return rows;
  };

  return (
    <>
      <div className="container-fluid m-0 py-2 align-middle text-center text-banner">
        {counter}
        <button onClick={() => onButtonClick()}>counter</button>HOME COMPONENT
        IS HERE
        <table className="table">
          <thead>
            <tr>
              <th>From</th>
              <th style={{ textAlign: "right" }}>To</th>
              <th style={{ textAlign: "right" }}>Updated</th>
              <th style={{ textAlign: "right" }}>Rate</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </div>
    </>
  );
}
