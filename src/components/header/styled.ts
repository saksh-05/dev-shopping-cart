import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${({ theme }: any) => theme.colors.headerBg};
  height: 100vh;
  width: fit-content;
  position: sticky;
  left: 0;
  top: 0;
`;

const Container = styled.div`
  display: inline-grid;
  align-items: center;
  justify-content: space-between;
  text-align: center;

  @media (max-width: 575px) {
    min-width: 22rem;
  }
`;

const LogoIcon = styled.div`
  position: relative;
  top: -1.5rem;
`;

const HeaderIcon = styled.div`
  display: inline-grid;
`;

const HeaderIconImage = styled.div`
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

const ToggleIcon = styled.div`
  position: relative;
  bottom: -2rem;
  justify-content: center;
  display: grid;
`;

const ToggleContainer = styled.button<{ themeName: string }>`
  background: ${({ theme }: any) => theme.colors.gradient};
  border: 1px solid ${({ theme }: any) => theme.colors.toggleBorder};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
  width: 4rem;
  height: 2rem;
  left: 1rem;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
  }

  div {
    height: auto;
    width: 2.5rem;
    transition: all 0.3s linear;

    // sun icon
    &:first-child {
      transform: ${({ themeName }: any) =>
        themeName === "light" ? "translateY(0)" : "translateY(100px)"};
    }

    // moon icon
    &:nth-child(2) {
      transform: ${({ themeName }: any) =>
        themeName === "light" ? "translateY(-100px)" : "translateY(0)"};
    }
  }
`;

const CartWrapper = styled.div`
  border-radius: 50%;
  background-color: #f9a109;
  height: 3rem;
  width: 3rem;
  justify-self: center;
  align-items: center;
  display: inline-flex;
`;

const Notification = styled.div`
  position: relative;
  top: 10px;
  left: 20px;
  background: #eb5757;
  width: 2rem;
  border-radius: 0.2rem;
  color: white;
  font-family: "Quicksand";
  font-weight: 600;
`;

export {
  Wrapper,
  Container,
  LogoIcon,
  HeaderIcon,
  HeaderIconImage,
  ToggleIcon,
  ToggleContainer,
  CartWrapper,
  Notification,
};
