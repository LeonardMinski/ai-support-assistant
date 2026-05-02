import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Home from "../page";

describe("Home page", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          reply: "Sure - Users can reset their password from the login page.",
        }),
      })
    );
  });

  it("renders the title", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /ai support assistant/i })
    ).toBeInTheDocument();
  });

  it("lets a user type and send a message", async () => {
    const user = userEvent.setup();

    render(<Home />);

    const input = screen.getByPlaceholderText(/ask a question/i);
    await user.type(input, "What is your refund policy?");
    await user.click(screen.getByRole("button", { name: /send/i }));

    expect(screen.getAllByText("What is your refund policy?").length).toBeGreaterThan(1);
  });
});
