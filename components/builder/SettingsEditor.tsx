import React from 'react'
import { Settings, FileText, Printer } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'

interface SettingsEditorProps {
  settings: {
    margin: number
    fontSize: number
    lineHeight: number
    pageSize: 'A4' | 'Letter' | 'Legal'
    showPageNumbers?: boolean
    showHeader?: boolean
    showFooter?: boolean
  }
  onChange: (settings: any) => void
}

const SettingsEditor: React.FC<SettingsEditorProps> = ({
  settings,
  onChange
}) => {
  const pageSizeOptions = [
    { value: 'A4', label: 'A4 (210 × 297 mm)' },
    { value: 'Letter', label: 'Letter (8.5 × 11 in)' },
    { value: 'Legal', label: 'Legal (8.5 × 14 in)' },
  ]

  const handleSettingChange = (key: keyof typeof settings, value: any) => {
    onChange({ [key]: value })
  }

  // Slider change handlers
  const handleMarginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSettingChange('margin', parseFloat(e.target.value))
  }

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSettingChange('fontSize', parseFloat(e.target.value))
  }

  const handleLineHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSettingChange('lineHeight', parseFloat(e.target.value))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Settings className="w-6 h-6 text-gray-700" />
        <div>
          <h2 className="text-2xl font-bold">Resume Settings</h2>
          <p className="text-gray-600">
            Customize the appearance and export settings of your resume
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Layout Settings */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg space-y-6">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-gray-700" />
              <h3 className="font-semibold">Layout Settings</h3>
            </div>

            <div>
              <label className="text-sm font-medium mb-3 block">
                Page Size: {settings.pageSize}
              </label>
              <Select
                value={settings.pageSize}
                onChange={(e) => handleSettingChange('pageSize', e.target.value)}
                options={pageSizeOptions}
              />
              <p className="mt-2 text-sm text-gray-500">
                Choose the paper size for printing and PDF export
              </p>
            </div>

            <div>
              <Slider
                label="Margins"
                valueLabel={`${settings.margin}mm`}
                min={10}
                max={40}
                step={1}
                value={settings.margin}
                onChange={handleMarginChange}
                className="w-full"
              />
              <p className="mt-2 text-sm text-gray-500">
                Adjust the margins around your resume content
              </p>
            </div>

            <div>
              <Slider
                label="Font Size"
                valueLabel={`${settings.fontSize}pt`}
                min={8}
                max={16}
                step={0.5}
                value={settings.fontSize}
                onChange={handleFontSizeChange}
                className="w-full"
              />
              <p className="mt-2 text-sm text-gray-500">
                Base font size for the entire document
              </p>
            </div>
          </div>

          {/* Display Options */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <h3 className="font-semibold">Display Options</h3>
            
            <div className="space-y-4">
              <Checkbox
                label="Show page numbers"
                checked={settings.showPageNumbers ?? true}
                onChange={(e) => handleSettingChange('showPageNumbers', e.target.checked)}
              />
              
              <Checkbox
                label="Show header with contact info"
                checked={settings.showHeader ?? true}
                onChange={(e) => handleSettingChange('showHeader', e.target.checked)}
              />
              
              <Checkbox
                label="Show footer with page numbers"
                checked={settings.showFooter ?? true}
                onChange={(e) => handleSettingChange('showFooter', e.target.checked)}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Typography & Preview */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg space-y-6">
            <div className="flex items-center space-x-2">
              <Printer className="w-5 h-5 text-gray-700" />
              <h3 className="font-semibold">Typography</h3>
            </div>

            <div>
              <Slider
                label="Line Height"
                valueLabel={settings.lineHeight.toFixed(1)}
                min={1.0}
                max={2.0}
                step={0.1}
                value={settings.lineHeight}
                onChange={handleLineHeightChange}
                className="w-full"
              />
              <p className="mt-2 text-sm text-gray-500">
                Space between lines of text (1.0 = single, 1.5 = 1.5x, 2.0 = double)
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Font Families</h4>
              
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Heading Font
                </label>
                <Select
                  value="Inter"
                  onChange={() => {}}
                  options={[
                    { value: 'Inter', label: 'Inter (Modern)' },
                    { value: 'Roboto', label: 'Roboto (Clean)' },
                    { value: 'Georgia', label: 'Georgia (Traditional)' },
                    { value: 'Poppins', label: 'Poppins (Creative)' },
                  ]}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Body Font
                </label>
                <Select
                  value="Inter"
                  onChange={() => {}}
                  options={[
                    { value: 'Inter', label: 'Inter' },
                    { value: 'Roboto', label: 'Roboto' },
                    { value: 'Georgia', label: 'Georgia' },
                    { value: 'Open Sans', label: 'Open Sans' },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <h3 className="font-semibold">Preview Settings</h3>
            
            <div 
              className="bg-white p-6 rounded border"
              style={{
                padding: `${settings.margin}mm`,
                fontSize: `${settings.fontSize}pt`,
                lineHeight: settings.lineHeight
              }}
            >
              <h4 className="text-lg font-bold mb-4" style={{ fontSize: `${settings.fontSize + 4}pt` }}>
                Sample Section
              </h4>
              
              <div className="space-y-3">
                <p>
                  This is how your text will appear with the current settings.
                  The font size is {settings.fontSize}pt and line height is {settings.lineHeight.toFixed(1)}.
                </p>
                
                <p>
                  Margins are set to {settings.margin}mm on all sides. This spacing
                  ensures your content is properly aligned and easy to read.
                </p>
                
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    Subheading text shows how smaller text appears.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <p>Page size: {settings.pageSize}</p>
              <p>Margins: {settings.margin}mm</p>
              <p>Font size: {settings.fontSize}pt</p>
              <p>Line height: {settings.lineHeight.toFixed(1)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            onChange({
              margin: 20,
              fontSize: 12,
              lineHeight: 1.5,
              pageSize: 'A4',
              showPageNumbers: true,
              showHeader: true,
              showFooter: true
            })
          }}
          className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Reset to Default Settings
        </button>
      </div>
    </div>
  )
}

export default SettingsEditor