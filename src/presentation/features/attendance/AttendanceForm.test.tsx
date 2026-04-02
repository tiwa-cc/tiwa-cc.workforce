import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { AttendanceForm } from "@/presentation/features/attendance/AttendanceForm";
import { renderWithProviders, screen } from "@/test/render";

describe("AttendanceForm", () => {
  it("入力フォームを表示して保存完了メッセージを出せる", async () => {
    const user = userEvent.setup();

    renderWithProviders(<AttendanceForm />);

    expect(screen.getByRole("heading", { name: "勤怠入力" })).toBeInTheDocument();

    await user.clear(screen.getByLabelText("備考"));
    await user.type(screen.getByLabelText("備考"), "顧客定例のため少し延長");
    await user.click(screen.getByRole("button", { name: "保存する" }));

    expect(screen.getByRole("form")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("status")).toHaveTextContent("勤怠データを保存しています。");
    expect(await screen.findByText("保存完了")).toBeInTheDocument();
    expect(screen.getByRole("form")).toHaveAttribute("aria-busy", "false");
    expect(screen.getByText("勤怠データを保存しました。")).toBeInTheDocument();
  });
});
