import React from "react";
import { Container } from "./styled";

interface WrapperProps {
  children: React.ReactNode;
}
export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <Container>{children}</Container>;
};
