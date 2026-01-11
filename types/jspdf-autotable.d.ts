declare module 'jspdf-autotable' {
  import { jsPDF } from 'jspdf';
  
  interface AutoTableOptions {
    startY?: number;
    margin?: number | { top?: number; right?: number; bottom?: number; left?: number };
    head?: string[][];
    body?: any[][];
    foot?: string[][];
    headStyles?: any;
    bodyStyles?: any;
    footStyles?: any;
    theme?: 'striped' | 'grid' | 'plain';
    styles?: any;
    columnStyles?: any;
    didParseCell?: (data: any) => void;
    willDrawCell?: (data: any) => void;
    didDrawCell?: (data: any) => void;
    didDrawPage?: (data: any) => void;
  }

  export default function autoTable(doc: jsPDF, options: AutoTableOptions): void;
}