import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string | null): string {
  if (!date) return 'Present'
  
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short' 
  })
}

export function calculateDuration(startDate: Date | string | null, endDate: Date | string | null, current: boolean = false): string {
  if (!startDate) return ''
  
  const start = new Date(startDate)
  const end = current || !endDate ? new Date() : new Date(endDate)
  
  const years = end.getFullYear() - start.getFullYear()
  const months = end.getMonth() - start.getMonth()
  
  let duration = ''
  if (years > 0) duration += `${years} ${years === 1 ? 'year' : 'years'}`
  if (months > 0) {
    if (duration) duration += ' '
    duration += `${months} ${months === 1 ? 'month' : 'months'}`
  }
  
  return duration || 'Less than 1 month'
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}