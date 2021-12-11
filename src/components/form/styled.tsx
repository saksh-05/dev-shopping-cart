import styled from "styled-components";

const WrapperB = styled.div`
  width: 30%;
  background: white;
  text-align: left;
  padding: 1rem;
  height: 100vh;
  overflow-y: scroll;
  position: sticky;
  right: 0;
  top: 0;

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

  div {
    color: red;
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

const Category = styled.ul`
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

const BtnGroup = styled.div`
  margin-top: 2rem;
  display: inline-flex;
  justify-content: space-around;
  width: 100%;
`;

export { WrapperB, Category, BtnGroup };
