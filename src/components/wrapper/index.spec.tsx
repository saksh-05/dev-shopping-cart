import mount from "@test/mount";

import { Wrapper } from "./index";

describe("Wrapper component testing with enzyme", () => {
  const component = mount(<Wrapper />);

  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });
});
