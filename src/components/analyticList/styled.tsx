import styled from "styled-components";

export const WrapperA = styled.div`
  width: 30%;
  background: #fff0de;
  padding: 2rem;
  padding-bottom: 8rem;
`;

export const Search = styled.div`
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 22.2rem;
  height: 8rem;
  bottom: 0;
  right: 0;
`;

export const InputWrapper = styled.div`
  left: 1rem;
  position: relative;
  input:focus {
    outline: none !important;
    border: 2px solid #f9a109;
  }
`;

export const Wrapper = styled.div`
  background: #80485b;
  display: inline-flex;
  border-radius: 1.5rem;
  width: 100%;
`;

export const Txt = styled.div`
  color: white;
  width: 10rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

export const Btn = styled.div`
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

export const ShoppingListItem = styled.ul`
  padding: 0;
`;

export const ItemVal = styled.label`
  justify-content: space-between;
  display: inline-flex;
  width: 100%;
  align-items: center;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  span {
    position: relative;
    height: 25px;
    width: 36px;
    margin-right: 0.5rem;
    background: transparent;
    border: 2px solid #f9a109;
    border-radius: 0.3rem;
  }

  &:hover input ~ span {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  input:checked ~ span {
    background-color: transparent;
  }
  input:checked ~ h3 {
    text-decoration: line-through;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  span:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  input:checked ~ span:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  span:after {
    left: 9px;
    width: 5px;
    height: 20px;
    border: solid #f9a109;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;

export const Span = styled.span``;

export const Counter = styled.div`
  border: 2px solid #f9a109;
  color: #f9a109;
  border-radius: 1.5rem;
  width: 7rem;
  height: 2.5rem;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 14px;
`;

export const ListDetail = styled.div`
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  width: 22.2rem;
  height: 8rem;
  bottom: 0;
  right: 0;
`;

export const Dialog = styled.div`
  position: relative;
  height: 15rem;
  width: 30rem;
  z-index: 1;
  position: absolute;
  left: 29%;
  background: white;
  box-shadow: 1px 3px 8px -2px black;
  display: block;
  border-radius: 1.5rem;
  font-weight: 400;
  font-size: 1.5rem;
  padding-left: 2rem;
`;

export const ListName = styled.div`
  z-index: 1;
  background: white;
  position: absolute;
  border-radius: 0.5rem;
  font-weight: 700;
  width: 18.2rem;
  padding: 2rem;
`;
