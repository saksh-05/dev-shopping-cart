import styled from "styled-components";

const WrapperA = styled.div`
  width: 30%;
  background: #fff;
  padding: 2rem;
  box-shadow: 1px 1px 8px -3px black;
`;

const Search = styled.div`
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: -32px;
  width: 21.5rem;
  height: 8rem;
  bottom: -16rem;
  top: auto;
`;

const InputWrapper = styled.div`
  left: 1rem;
  position: relative;
`;

const Wrapper = styled.div`
  background: #80485b;
  display: inline-flex;
  border-radius: 1.5rem;
  width: 100%;
`;

const Txt = styled.div`
  color: white;
  width: 10rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const Btn = styled.div`
  background: white;
  color: #34333a;
  width: 7rem;
  height: 3rem;
  border-radius: 0.5rem;
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  justify-content: center;
`;

const Back = styled.div`
  cursor: pointer;
  color: #f9a109;
  display: inline-flex;
  font-weight: 600;
  div {
    margin-right: 0.6rem;
  }
`;

const ShowItem = styled.div``;

const ButtonGrp = styled.div`
  margin-top: 3rem;
  display: inline-flex;
  justify-content: space-around;
  width: 100%;
`;

export {
  WrapperA,
  Search,
  InputWrapper,
  Wrapper,
  Txt,
  Btn,
  Back,
  ShowItem,
  ButtonGrp,
};
