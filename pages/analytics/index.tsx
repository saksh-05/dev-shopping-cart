import React from "react";
import { Search, Wrapper } from "./styled";
import { Header } from "@components/header";

const Analytics: React.FC = () => {
  return (
    <>
      <Wrapper>
        <h3>Analytics</h3>
        <Search>
          <input type="text" />
        </Search>
      </Wrapper>
    </>
  );
};

export default Analytics;
