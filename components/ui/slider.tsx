import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  valueLabel?: string
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, valueLabel, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {(label || valueLabel) && (
          <div className="flex justify-between items-center">
            {label && (
              <label className="text-sm font-medium">
                {label}
              </label>
            )}
            {valueLabel && (
              <span className="text-sm text-gray-600">
                {valueLabel}
              </span>
            )}
          </div>
        )}
        <input
          type="range"
          ref={ref}
          className={cn(
            "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer " +
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 " +
            "[&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full " +
            "[&::-webkit-slider-thumb]:bg-primary",
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }