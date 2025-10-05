import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import type React from "react";

function Spinner({
  // Workaround for React type definition mismatch:
  // `Loader2Icon` compiled with older React type definitions
  // which did not include `bigint` as a possible type for `children`.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  className,
  ...props
}: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
