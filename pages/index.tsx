import React from "react";

import { Wrapper, Header, Main, Footer, Cards } from "@components";
import GlobalStyle from "@styles/globalStyles";
import Menu from "./menu";
import History from "./history";
import Analytics from "./analytics";

import { useSelector } from "react-redux";

import { activea, activeb, activec } from "@redux/actions";
import { RootState } from "@redux/reducers";
import { useAppDispatch } from "@redux/store";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeaVal = useSelector((state: RootState) => state.toggle.activea);
  const activebVal = useSelector((state: RootState) => state.toggle.activeb);
  const activecVal = useSelector((state: RootState) => state.toggle.activec);
  return (
    <Wrapper>
      <GlobalStyle />
      <Header />
      {activeaVal && <Menu />}
      {activebVal && <History />}
      {activecVal && <Analytics />}
      {/* <Main /> */}
      {/* <Cards /> */}
      {/* <Footer /> */}
    </Wrapper>
  );
};
export default Home;
