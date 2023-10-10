import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import NewBlog from "../components/NewBlog";

describe("test for the new blog form", () => {
  // this is kind of a scuffed implementation, dont like how I have to force the component to change
  const mockHandler = jest.fn();
  const testNewBlogEntry = {
    title: "What am I doing sometimes",
    author: "Troller",
    url: "nothere.com",
    user: {
      username: "Wisemanuel",
      name: "Emmanuel",
      id: "64b14cc7b701d8652d2e6212",
    },
  };
  const userToken = {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ildpc2VtYW51ZWwiLCJpZCI6IjY0YjE0Y2M3YjcwMWQ4NjUyZDJlNjIxMiIsImlhdCI6MTY4OTUxNDY1NX0.eK1f9pmE_gLhmWe99JuVRCJxhmHkwAIA1oI_KPe5tRc",
    username: "Wisemanuel",
    name: "Emmanuel",
    id: "64b14cc7b701d8652d2e6212",
  };

  let container;
  beforeEach(async () => {
    container = render(
      <NewBlog createNewBlog={mockHandler} user={userToken} />
    ).container;
  });

  test("form calls the event handler with the right details", async () => {
    const user = userEvent.setup();

    // input the necessary data into the form's fields
    const title = container.querySelector("#title");
    await user.type(title, testNewBlogEntry.title);
    const author = container.querySelector("#author");
    await user.type(author, testNewBlogEntry.author);
    const url = container.querySelector("#url");
    await user.type(url, testNewBlogEntry.url);
    const submitButton = container.querySelector(".submit-new-blog");
    await user.click(submitButton);

    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler).toHaveBeenCalledWith(userToken, {
      ...testNewBlogEntry,
      user: userToken.id,
    });
  });
});
