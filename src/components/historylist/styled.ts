import styled from "styled-components";

const WrapperA = styled.div`
  width: 30%;
  background: #fff0de;
  padding: 2rem;
  padding-bottom: 8rem;
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

export { WrapperA, Wrapper, Txt, Btn };
