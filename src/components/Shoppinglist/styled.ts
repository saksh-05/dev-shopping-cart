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

export const ItemVal = styled.div`
  display: inline-flex;
  align-items: center;
  background: white;
  height: 3.5rem;
  width: 12rem;
  border-radius: 1rem;
  justify-content: space-between;
`;

export const DeleteIcon = styled.div`
  background: #f9a109;
  border-radius: 1rem;
  height: 3.5rem;
  width: 3rem;
  align-items: center;
  display: grid;
  cursor: pointer;
`;

export const Counter = styled.div`
  border: 2px solid #f9a109;
  color: #f9a109;
  border-radius: 1.5rem;
  width: 5rem;
  height: 2.5rem;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 14px;
`;
export const Minus = styled.div`
  width: 2rem;
  font-size: 3rem;
  font-weight: 500;
  display: grid;
  color: #f9a109;
  justify-content: center;
  cursor: pointer;
`;
export const Plus = styled.div`
  width: 2rem;
  font-size: 2rem;
  font-weight: 500;
  display: grid;
  color: #f9a109;
  justify-content: center;
  cursor: pointer;
`;

// export const ItemCounter = styled.div`
//   border: 2px solid #f9a109;
//   color: #f9a109;
//   border-radius: 1.5rem;
//   width: 5rem;
//   height: 2.5rem;
//   align-items: center;
//   display: flex;
//   justify-content: center;
//   font-size: 14px;
//   &:hover ${ItemVal} {
//     display: inline-flex;
//   }
//   cursor: pointer;
// `;

export const ListName = styled.div`
  z-index: 1;
  background: white;
  position: absolute;
  border-radius: 0.5rem;
  font-weight: 700;
  width: 18.2rem;
  padding: 2rem;
`;
