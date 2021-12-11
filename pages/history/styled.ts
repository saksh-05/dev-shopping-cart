import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-flex;
  width: 100%;
`;

const Container = styled.div`
  width: 71.2%;
  padding-left: 2rem;
`;
const HistoryValue = styled.div``;
const HistoryTitle = styled.div`
  height: 5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: black 1px 1px 8px -5px;
  width: 47rem;
  display: inline-flex;
  align-items: center;
  padding: 1rem;
  font-size: 1rem;
  font-weight: 500;
  justify-content: space-between;
  cursor: pointer;
`;
const Progress = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
`;

const DetailHistory = styled.div`
  margin-top: 3rem;
`;

export {
  Wrapper,
  Container,
  HistoryValue,
  HistoryTitle,
  Progress,
  DetailHistory,
};
