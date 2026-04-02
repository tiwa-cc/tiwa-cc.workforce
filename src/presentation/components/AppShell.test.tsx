import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { AppShell } from "@/presentation/components/AppShell";
import { renderWithProviders, screen } from "@/test/render";

describe("AppShell", () => {
  it("現在のルートに対応するナビゲーションを表示する", () => {
    renderWithProviders(
      <AppShell>
        <div>content</div>
      </AppShell>,
      { route: "/attendance" },
    );

    expect(screen.getByRole("link", { name: "勤怠入力" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByText("content")).toBeInTheDocument();
  });

  it("言語切替で英語表記に変更できる", async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <AppShell>
        <div>content</div>
      </AppShell>,
      { route: "/" },
    );

    await user.click(screen.getByRole("button", { name: "English" }));

    expect(screen.getByRole("link", { name: "Dashboard" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "English" })).toHaveAttribute("aria-pressed", "true");
  });
});
