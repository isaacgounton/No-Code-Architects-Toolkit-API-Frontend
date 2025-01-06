import * as React from "react";
import { cn } from "../../lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

export function Progress({ value = 0, max = 100, className, ...props }: ProgressProps) {
  const percentage = Math.min(Math.max(value, 0), max);

  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full w-full flex-1 bg-blue-600 transition-all duration-300",
          percentage === 0 && "-translate-x-full",
          percentage === 100 && "translate-x-0",
          percentage > 0 && percentage < 100 && `translate-x-[-${100 - percentage}%]`
        )}
      />
    </div>
  );
}
