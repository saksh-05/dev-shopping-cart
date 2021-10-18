import React from "react";
import Image from "next/image";

import { useTheme } from "@definitions/styled-components";
import { ToggleContainer } from "./styled";

export type IButton = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Toggle: React.FC<IButton> = () => {
  const { toggle, themeName } = useTheme();

  return (
    <ToggleContainer themeName={themeName} onClick={toggle}>
      <Image src="/icons/sun-icon.svg" alt="sun" width="32" height="32" />
      <Image src="/icons/moon-icon.svg" alt="moon" width="32" height="32" />
    </ToggleContainer>
  );
};
