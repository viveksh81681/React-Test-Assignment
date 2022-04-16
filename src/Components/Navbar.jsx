import { Link } from "react-router-dom";
import styled from "styled-components";

export const Navbar = () => {
  const Main = styled.div`
    button {
      margin-left: 10px;
    }
  `;
  return (
    <Main>
      <button>
        <Link to={"/"}>Home</Link>
      </button>
      <button>
        <Link to={"/add-city"}>Add City</Link>
      </button>
      <button>
        <Link to={"/add-country"}>Add Country</Link>
      </button>
    </Main>
  );
};