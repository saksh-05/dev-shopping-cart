import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-flex;
  width: 100%;
`;

const WrapperA = styled.div``;
const Container = styled.div`
  padding-left: 2rem;
  display: inline-flex;
  margin-bottom: 4rem;
`;
const Search = styled.div``;

const TopItem = styled.div`
  width: 25rem;
`;
const TopCategory = styled.div`
  width: 24rem;
`;

const Heading = styled.div`
  display: inline-flex;
  justify-content: space-between;
  font-size: 14px;
  width: 72%;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const FakeProgress = styled.div`
  background: #e0e0e0;
  height: 0.5rem;
  position: absolute;
  z-index: -1;
  width: 22%;
  border-radius: 0.5rem;
`;

const Progress = styled.div`
  height: 0.5rem;
  background: #56ccf2;
  border-radius: 0.5rem;
`;

const Chart = styled.div``;

export default {
  Wrapper,
  WrapperA,
  Container,
  Search,
  Chart,
  Progress,
  FakeProgress,
  Heading,
  TopCategory,
  TopItem,
};
