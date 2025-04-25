import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HelpfulLinksScreen from "./HelpFulLinksScreen";
import * as Linking from "react-native/Libraries/Linking/Linking";

jest.mock("react-native-vector-icons/MaterialCommunityIcons", () => "Icon");
jest.mock("../../components/Button/BackButton", () => "BackButton");
jest.mock("../../components/Background/Background", () => "Background");
jest.mock(
  "../../components/Text/Text",
  () =>
    ({ children }) =>
      children
);

describe("HelpfulLinksScreen", () => {
  it("renders the screen with all sections and links", () => {
    const { getByTestId } = render(<HelpfulLinksScreen />);

    // Check section titles
    expect(getByTestId("tutorial-videos")).toBeTruthy();
    expect(getByTestId("regional-info")).toBeTruthy();
    expect(getByTestId("gear-resources")).toBeTruthy();

    // Check links
    expect(getByTestId("link-cast-line")).toBeTruthy();
    expect(getByTestId("link-buy-license")).toBeTruthy();
    expect(getByTestId("link-fishing-laws")).toBeTruthy();
    expect(getByTestId("link-bass-pro")).toBeTruthy();
    expect(getByTestId("link-cabelas")).toBeTruthy();
  });

  it("opens the correct link when a link is pressed", () => {
    const openURLSpy = jest
      .spyOn(Linking, "openURL")
      .mockImplementation(() => Promise.resolve());

    const { getByTestId } = render(<HelpfulLinksScreen />);

    // Simulate pressing a link
    fireEvent.press(getByTestId("link-cast-line"));
    expect(openURLSpy).toHaveBeenCalledWith(
      "https://www.youtube.com/watch?v=5ZFZO7B2304&ab_channel=FishcareVictoriaInc."
    );

    fireEvent.press(getByTestId("link-buy-license"));
    expect(openURLSpy).toHaveBeenCalledWith(
      "https://wildlife.ca.gov/Licensing"
    );

    fireEvent.press(getByTestId("link-bass-pro"));
    expect(openURLSpy).toHaveBeenCalledWith("https://www.basspro.com/");

    openURLSpy.mockRestore();
  });
});
