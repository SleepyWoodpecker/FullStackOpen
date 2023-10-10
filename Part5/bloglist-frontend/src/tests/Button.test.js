import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Button from "../components/Button";

describe("test that button works as expected", () => {
  const mockHandler = jest.fn();

  let container;
  beforeEach(() => {
    container = render(
      <Button onClick={mockHandler} className="like-button">
        Like
      </Button>
    ).container;
  });

  test("if like button is clicked 2 times, 2 events are fired", async () => {
    const user = userEvent.setup();
    const likeButton = container.querySelector(".like-button");
    await user.click(likeButton);
    await user.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
