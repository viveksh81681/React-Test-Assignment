import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { TableRow } from "./TableRow";
import { useDispatch, useSelector } from "react-redux";
import { addCity } from "../Redux/action";

export const Home = () => {
  const [text, setText] = useState("");
  const [arr, setArr] = useState([]);
  useEffect(() => getData(), []);

  const dispatch = useDispatch();

  const cities = useSelector((store) => store.cities);

  const getData = () => {
    axios.get(`https://countries001.herokuapp.com/cities`).then((res) => {
      console.log("res data", res.data);
      //   setCities([...res.data]);
      let change = dispatch(addCity(res.data));
      setArr([...change.payload]);
    });
  };

  const deleteCity = (id) => {
    axios.delete(`https://countries001.herokuapp.com/cities/${id}`).then(() => getData());
  };

  const MainDiv = styled.div`
    margin: auto;
    text-align: center;
    /* border: 1px solid red; */
    width: 80%;
    .subDiv {
      /* border: 1px solid black; */
      width: 80%;
      justify-content: center;
      margin: auto;
    }
    table {
      border: 1px solid black;
      margin: auto;
      /* padding: 10px; */
    }
    th {
      border: 1px solid black;
      padding: 10px;
    }
    td {
      border: 1px solid black;
    }
  `;
  //Sorting

  const sortCountry = () => {
    let test = cities.sort(compareCountry);
    let change = dispatch(addCity(test));
    setArr([...change.payload]);
    console.log("arr", arr);
  };

  function compareCountry(a, b) {
    if (a.country < b.country) {
      return -1;
    }
    if (a.country > b.country) {
      return 1;
    }
    return 0;
  }

  //country dsc

  const sortDscCountry = () => {
    let test = cities.sort(compareDscCountry);
    let change = dispatch(addCity(test));
    setArr([...change.payload]);
    console.log("arr", arr);
  };

  function compareDscCountry(a, b) {
    if (a.country > b.country) {
      return -1;
    }
    if (a.country < b.country) {
      return 1;
    }
    return 0;
  }

  //High

  const high = () => {
    let test = cities.sort(HighPop);
    let change = dispatch(addCity(test));
    setArr([...change.payload]);
    console.log("arr", arr);
  };

  function HighPop(a, b) {
    if (+a.population > +b.population) {
      return -1;
    }
    if (+a.population < +b.population) {
      return 1;
    }
    return 0;
  }

  const low = () => {
    let test = cities.sort(LowPop);
    let change = dispatch(addCity(test));
    setArr([...change.payload]);
    console.log("arr", arr);
  };

  function LowPop(a, b) {
    if (+a.population < +b.population) {
      return -1;
    }
    if (+a.population > +b.population) {
      return 1;
    }
    return 0;
  }

  return (
    <MainDiv>
      <br />
      <div className="sortingButtons">
        <button className="sortByCounty" onClick={() => sortCountry()}>
          Sort by Country
        </button>
        <button className="sortByCounty" onClick={() => sortDscCountry()}>
          Sort by Country DSC
        </button>
        <button className="sortByCounty" onClick={() => high()}>
          High to low
        </button>
        <button className="sortByCounty" onClick={() => low()}>
          Low to high
        </button>
      </div>
      <br />

      <div className="subDiv">
        <h2>See and Analyze the data</h2>
        <input
          className="searchAddress"
          type="text"
          placeholder="Search Address"
          onChange={({ target }) => {
            let results = cities.filter((el) => {
              if (el.country == target.value) {
                return el;
              }
            });
            setTimeout(() => {
              if (results.length != 0) {
                dispatch(addCity(results));
              }
            }, 1000);
          }}
        />
        <br />
        <br />

        <table>
          <tr>
            <th>id</th>
            <th>Country</th>
            <th>City</th>
            <th>Population</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {arr.map((el) => (
            <TableRow key={el.id} deleteCity={deleteCity} data={el} />
          ))}
        </table>
      </div>
    </MainDiv>
  );
};