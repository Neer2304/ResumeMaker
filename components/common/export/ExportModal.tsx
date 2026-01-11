'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Download, Mail, Eye, Copy, Check, FileJson, File } from 'lucide-react';
import { FaFilePdf, FaFileWord } from 'react-icons/fa';
import { Resume } from '@/types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  resume: Resume | null;
  onExport?: (format: string, options: ExportOptions) => Promise<void>;
}

export interface ExportOptions {
  fileName: string;
  format: 'pdf' | 'docx' | 'txt' | 'json';
  includeMetadata: boolean;
  quality: 'standard' | 'high';
  watermark: boolean;
}

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  resume,
  onExport,
}) => {
  const [options, setOptions] = useState<ExportOptions>({
    fileName: `${resume?.personalInfo?.firstName || 'resume'}_${resume?.personalInfo?.lastName || 'cv'}`,
    format: 'pdf',
    includeMetadata: true,
    quality: 'standard',
    watermark: false,
  });

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExport = async () => {
    if (!resume) return;

    setLoading(true);
    try {
      if (onExport) {
        await onExport(options.format, options);
      } else {
        // Placeholder - you can remove console.log later
        console.log('Export requested (no handler yet):', {
          format: options.format,
          fileName: options.fileName,
          resumeId: resume._id,
        });
      }
      // You can close automatically after successful export if you want:
      // onClose();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyShareLink = () => {
    if (!resume) return;

    const shareLink = `${window.location.origin}/view/${resume.slug || resume._id}`;
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintPreview = () => {
    window.open(`/preview/${resume?._id}`, '_blank');
  };

  const formatOptions = [
    {
      value: 'pdf',
      label: 'PDF Document',
      icon: FaFilePdf,
      description: 'Best for printing and sharing',
      color: 'text-red-500',
    },
    {
      value: 'docx',
      label: 'Microsoft Word',
      icon: FaFileWord,
      description: 'Editable format',
      color: 'text-blue-500',
    },
    {
      value: 'txt',
      label: 'Plain Text',
      icon: File,
      description: 'Simple text format',
      color: 'text-gray-500',
    },
    {
      value: 'json',
      label: 'JSON Data',
      icon: FileJson,
      description: 'Backup your resume data',
      color: 'text-green-500',
    },
  ];

  const handleFormatChange = (value: 'pdf' | 'docx' | 'txt' | 'json') => {
    const currentName = options.fileName.split('.')[0];
    setOptions({
      ...options,
      format: value,
      fileName: currentName,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Export Resume</DialogTitle>
          <DialogDescription>
            Choose how you want to export or share your resume
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* File Name */}
          <div className="grid gap-2">
            <Label htmlFor="fileName">File Name</Label>
            <div className="flex items-center gap-2">
              <Input
                id="fileName"
                value={options.fileName}
                onChange={(e) => setOptions({ ...options, fileName: e.target.value })}
                placeholder="resume_filename"
                className="flex-1"
              />
              <div className="px-3 py-2 bg-gray-100 text-gray-600 rounded-md text-sm min-w-[60px]">
                .{options.format}
              </div>
            </div>
          </div>

          {/* Format Selection */}
          <div className="grid gap-3">
            <Label>Format</Label>
            <RadioGroup
              value={options.format}
              onValueChange={handleFormatChange}
              className="grid grid-cols-2 gap-3"
            >
              {formatOptions.map((option) => (
                <div key={option.value}>
                  <RadioGroupItem
                    value={option.value}
                    id={`format-${option.value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`format-${option.value}`}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all cursor-pointer"
                  >
                    <option.icon className={`mb-2 h-6 w-6 ${option.color}`} />
                    <span className="font-medium text-center">{option.label}</span>
                    <span className="text-xs text-muted-foreground text-center mt-1">
                      {option.description}
                    </span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Additional Options */}
          <div className="grid gap-4">
            <Label>Export Settings</Label>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="includeMetadata"
                  checked={options.includeMetadata}
                  onCheckedChange={(checked) =>
                    setOptions({ ...options, includeMetadata: checked as boolean })
                  }
                />
                <Label htmlFor="includeMetadata" className="text-sm">
                  Include metadata (author, creation date)
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="watermark"
                  checked={options.watermark}
                  onCheckedChange={(checked) =>
                    setOptions({ ...options, watermark: checked as boolean })
                  }
                />
                <Label htmlFor="watermark" className="text-sm">
                  Add "Draft" watermark
                </Label>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="quality">Quality</Label>
                <RadioGroup
                  value={options.quality}
                  onValueChange={(value: 'standard' | 'high') =>
                    setOptions({ ...options, quality: value })
                  }
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="quality-standard" />
                    <Label htmlFor="quality-standard" className="text-sm">
                      Standard (faster)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="quality-high" />
                    <Label htmlFor="quality-high" className="text-sm">
                      High quality (better print)
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Share Options */}
          <div className="border-t pt-4">
            <Label className="mb-3 block">Share Options</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyShareLink}
                className="flex items-center gap-2"
                disabled={!resume}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy Share Link'}
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={handlePrintPreview}
                disabled={!resume}
              >
                <Eye className="h-4 w-4" />
                Print Preview
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                disabled={!resume}
              >
                <Mail className="h-4 w-4" />
                Email
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            disabled={loading || !resume}
            className="gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Export Resume
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportModal;