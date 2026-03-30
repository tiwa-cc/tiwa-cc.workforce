import { FileBarChart } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function ReportPageContent() {
  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardDescription>Report</CardDescription>
        <CardTitle className="flex items-center gap-2">
          <FileBarChart className="size-5 text-accent" />
          レポート
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-sm leading-7 text-muted-foreground">
          検索クエリ、集計条件、出力形式はこれから定義します。今は `shadcn/ui` ベースの画面枠だけを先に整えています。
        </p>
        <Separator />
        <Alert>
          <AlertTitle>次の実装候補</AlertTitle>
          <AlertDescription>
            期間指定、社員絞り込み、勤怠異常抽出、CSV 出力などをここへ追加できます。
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
