import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import App from "./App";
// import { JSDOM } from "jsdom"

// const dom = new JSDOM()
// global.document = dom.window.document
// global.window = dom.window

describe("Main App", async () => {
    test("renders Kanban Example test", () => {
        render(<App />);

        const linkElement = screen.getByText(/kanban example/i);
        expect(linkElement).toBeInTheDocument();
    });
});
