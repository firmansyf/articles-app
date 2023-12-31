import { render, cleanup } from "@testing-library/react";
import App from "./App";
import { getArticles } from "./api";
import Home from "./pages/home";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

describe("TESTING...", () => {
  it("Test.., Render Data API", () => {
    render(<App />);
    expect(getArticles()).toBeDefined();
  });

  it("Test.., Render Page Home", () => {
    render(<Home />);
  });

  it("Test.., Click Detail", () => {
    render(<Home />);
    const btn = document.getElementById("btnDetail");
    btn?.click();
  });
});
