import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-[1.5rem] border px-4 py-4 text-sm shadow-sm [&>svg~*]:pl-11 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:size-4",
  {
    variants: {
      variant: {
        default: "border-border/80 bg-card/90 text-card-foreground",
        destructive:
          "border-destructive/30 bg-destructive/5 text-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return <div className={cn(alertVariants({ variant }), className)} role="alert" {...props} />;
}

function AlertTitle({ className, ...props }: React.ComponentProps<"h5">) {
  // The actual accessible content is always provided by callers via props.children.
  // eslint-disable-next-line jsx-a11y/heading-has-content
  return <h5 className={cn("mb-1 font-semibold tracking-tight", className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("text-sm leading-6 opacity-90", className)} {...props} />;
}

export { Alert, AlertDescription, AlertTitle };
