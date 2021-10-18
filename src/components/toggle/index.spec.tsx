import mount from "@test/mount";

import { Toggle } from "./index";

describe("Toggle component testing with enzyme", () => {
  const mockFn = jest.fn();

  const component = mount(<Toggle onClick={mockFn} />);

  it("renders without crashing", () => {
    expect(component).toBeTruthy();
  });

  it("toggle button is clickable", () => {
    const toggleBtn = component.find("button");

    toggleBtn.simulate("click");
  });
});
