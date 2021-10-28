import React from "react";
import { Search, Wrapper } from "./styled";
import { Header } from "@components";

const History: React.FC = () => {
  return (
    <Wrapper>
      <h3>History</h3>
      <Search>
        <input type="text" />
      </Search>
    </Wrapper>
  );
};

export default History;
