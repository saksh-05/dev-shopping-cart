import React from "react";
import Image from "next/image";

import { Container, LogoButton, List, ListItem } from "./styled";

export const Footer: React.FC = () => {
  return (
    <Container>
      <LogoButton href="https://github.com/pankod" target="_blank">
        <Image
          src="/icons/pankod-icon.svg"
          alt="pankod"
          width="140"
          height="28"
        />
      </LogoButton>
      <List>
        <ListItem>
          <Image
            src="/icons/github-icon.svg"
            alt="github"
            width="28"
            height="29"
          />
        </ListItem>
        <ListItem>
          <Image
            src="/icons/twitter-icon.svg"
            alt="twitter"
            width="28"
            height="28"
          />
        </ListItem>
        <ListItem>
          <Image
            src="/icons/youtube-icon.svg"
            alt="youtube"
            width="28"
            height="29"
          />
        </ListItem>
        <ListItem>
          <Image
            src="/icons/linkedin-icon.svg"
            alt="linkedin"
            width="28"
            height="32"
          />
        </ListItem>
      </List>
    </Container>
  );
};
