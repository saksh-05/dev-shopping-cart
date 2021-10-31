import styled from "styled-components";

export const WrapperA = styled.div`
  width: 30%;
  height: 100vh;
  background: #fff0de;
  padding: 2rem;
`;

export const WrapperB = styled.div`
  width: 30%;
  background: white;
  text-align: left;
  padding: 1rem;
  height: 100vh;
  overflow-y: scroll;

  h4 {
    margin-bottom: 0;
    font-weight: 600;
  }
  textarea {
    border: 2px solid gray;
  }
  textarea:focus {
    outline: none !important;
    border: 2px solid #f9a109;
  }
  textarea:focus + .category {
    display: block;
  }
  .category:hover {
    display: block;
  }
`;

export const Category = styled.ul`
  display: none;
  box-shadow: 1px 1px 4px -1px black;
  border-radius: 0.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  list-style: none;
  line-height: 2rem;
  font-weight: 600;
  padding-left: 0;
  li {
    padding-left: 1.5rem;
    cursor: pointer;
  }
  li:hover {
    background: #faebd7;
  }
`;

export const BtnGroup = styled.div`
  margin-top: 2rem;
  display: inline-flex;
  justify-content: space-around;
  width: 100%;
`;

export const Search = styled.div`
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

export const InputWrapper = styled.div`
  left: 1rem;
  position: relative;
`;
