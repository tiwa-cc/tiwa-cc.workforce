import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { AppRouter } from "@/app/router/AppRouter";
import { DEMO_AUTH_CREDENTIALS } from "@/infrastructure/repositories/MockAuthRepository";
import { renderWithProviders, screen } from "@/test/render";

describe("AppRouter", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("未認証の場合はログイン画面を最初に表示する", async () => {
    renderWithProviders(<AppRouter />, { route: "/" });

    expect(await screen.findByRole("heading", { name: "ログイン" })).toBeInTheDocument();
    expect(screen.getByLabelText("メールアドレス")).toHaveValue(DEMO_AUTH_CREDENTIALS.email);
  });

  it("正しいDemoアカウントでログインするとダッシュボードへ遷移する", async () => {
    const user = userEvent.setup();

    renderWithProviders(<AppRouter />, { route: "/login" });

    await screen.findByRole("heading", { name: "ログイン" });
    await user.type(screen.getByLabelText("パスワード"), DEMO_AUTH_CREDENTIALS.password);
    await user.click(screen.getByRole("button", { name: "ログイン" }));

    expect(await screen.findByRole("heading", { name: "勤怠管理アプリのフロントエンド基盤" })).toBeInTheDocument();
  });
});
