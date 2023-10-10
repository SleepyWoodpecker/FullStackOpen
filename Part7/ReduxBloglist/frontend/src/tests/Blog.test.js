import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";
import userEvent from "@testing-library/user-event";

describe("Testing that the Blog component renders properly", () => {
  const testBlog = {
    title: "What am I doing sometimes",
    author: "Troller",
    url: "nothere.com",
    likes: 69,
    user: {
      username: "Wisemanuel",
      name: "Emmanuel",
      id: "64b14cc7b701d8652d2e6212",
    },
  };
  let container;
  beforeEach(() => {
    container = render(<Blog blog={testBlog} />).container;
  });

  test("expect blog title to be rendered", () => {
    const element = container.querySelector(".blog-title");
    expect(element).toHaveTextContent("What am I doing sometimes");
  });

  test("expect the author to be defined", () => {
    const element = container.querySelector(".blog-author");
    expect(element).toHaveTextContent("Troller");
  });

  test("expect URL and likes to not be rendered", () => {
    const element = container.querySelector(".toggleable-component");
    expect(element).toHaveStyle("display: none");
  });

  test("after clicking the 'show' button, URL and likes are shown", async () => {
    const user = userEvent.setup();
    const showButton = container.querySelector(".show-button");
    await user.click(showButton);
    const element = container.querySelector(".toggleable-component");
    expect(element).not.toHaveStyle("display: none");
  });
});
