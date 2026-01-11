import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  size = "md"
}) => {
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={cn(
        "relative z-50 w-full mx-4",
        sizeClasses[size],
        className
      )}>
        <div className="bg-white rounded-lg shadow-xl animate-fade-in">
          {/* Header */}
          {(title || onClose) && (
            <div className="flex items-center justify-between p-6 border-b">
              {title && (
                <h2 className="text-xl font-semibold">{title}</h2>
              )}
              <button
                onClick={onClose}
                className="p-1 rounded-md hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
          
          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export { Modal }