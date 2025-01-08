import React from 'react';
import { cn } from '../../lib/utils';

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium text-gray-700 dark:text-gray-300",
          className
        )}
        {...props}
      />
    );
  }
);

Label.displayName = 'Label';
