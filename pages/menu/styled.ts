import styled from "styled-components";

const Container = styled.div`
  width: 70%;
  padding-left: 2rem;
  padding-bottom: 2rem;
`;

const Wrapper = styled.div`
  width: 100%;
  display: inline-flex;
`;
const Search = styled.div``;

const InputWrapper = styled.label`
  position: relative;
  display: inline-flex;
  align-item: center;
  :before {
    content: "";
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    width: 20px;
    background: url(icons/search.svg) center / contain no-repeat;
  }
  input {
    padding: 10px 30px;
    border-radius: 0.5rem;
    border: none;
    background: white;
    box-shadow: 1px 1px 8px -3px black;
    font-size: 1rem;
    color: #bdbdbd;
  }
`;

const Txt = styled.p`
  color: #f9a109;
  margin-right: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
`;

const AllItems = styled.div`
  height: 10rem;
`;

const DisplayItem = styled.div``;

export { Container, Wrapper, Search, InputWrapper, Txt, AllItems };
