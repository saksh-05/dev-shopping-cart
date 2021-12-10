import React from "react";
import Router from "next/router";
import Image from "next/image";

import {
  Wrapper,
  Container,
  LogoIcon,
  HeaderIcon,
  ToggleIcon,
  CartWrapper,
  Notification,
} from "./styled";
import { useSelector } from "react-redux";
import { activea, activeb, activec } from "@redux/actions";
import { RootState } from "@redux/reducers";
import { useAppDispatch } from "@redux/store";

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const activeaVal = useSelector((state: RootState) => state.toggle.activea);
  const activebVal = useSelector((state: RootState) => state.toggle.activeb);
  const activecVal = useSelector((state: RootState) => state.toggle.activec);
  const itemArray = useSelector(
    (state: RootState) => state.itemCounter.itemArray
  );
  const itemKeys = Object.keys(itemArray);

  return (
    <Wrapper>
      <Container>
        <LogoIcon>
          <Image src="/icons/logo.svg" alt="nextjs" width="48" height="48" />
        </LogoIcon>
        <HeaderIcon>
          <div
            className={activeaVal ? "active" : "null"}
            onClick={() => {
              dispatch(activea());
              Router.push("menu");
            }}
          >
            <Image src="/icons/list.svg" alt="list" width="96" height="26" />
          </div>
          <div
            className={activebVal ? "active" : "null"}
            onClick={() => {
              dispatch(activeb());
              Router.push("history");
            }}
          >
            <Image
              src="/icons/replay.svg"
              alt="replay"
              width="96"
              height="26"
            />
          </div>
          <div
            className={activecVal ? "active" : "null"}
            onClick={() => {
              dispatch(activec());
              Router.push("analytics");
            }}
          >
            <Image
              src="/icons/analytic.svg"
              alt="nextjs"
              width="96"
              height="26"
            />
          </div>
          <style jsx>
            {`
              .active {
                border-left: 5px solid #f9a109;
              }
            `}
          </style>
        </HeaderIcon>
        <ToggleIcon>
          {itemKeys.length !== 0 ? (
            <Notification>{itemKeys.length}</Notification>
          ) : (
            ""
          )}
          <CartWrapper>
            <Image src="/icons/cart.svg" alt="cart" width="96" height="72" />
          </CartWrapper>
        </ToggleIcon>
      </Container>
    </Wrapper>
  );
};
