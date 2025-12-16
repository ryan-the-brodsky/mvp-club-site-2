import React, { useState, useEffect } from 'react';
import { Palette, X, ChevronDown, ChevronUp } from 'lucide-react';
import { COLOR_PALETTES, generateTheme, applyTheme } from './theme-system';

const ColorExplorer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentPalette, setCurrentPalette] = useState('default');
  const [customColors, setCustomColors] = useState(COLOR_PALETTES.default);

  // Toggle with keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Apply theme when palette changes
  useEffect(() => {
    const theme = generateTheme(customColors);
    applyTheme(theme);
  }, [customColors]);

  const handlePaletteChange = (paletteName) => {
    setCurrentPalette(paletteName);
    setCustomColors(COLOR_PALETTES[paletteName]);
  };

  const handleColorChange = (colorKey, value) => {
    setCustomColors(prev => ({
      ...prev,
      [colorKey]: value
    }));
    setCurrentPalette('custom');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-[9999] bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all"
        title="Open Color Explorer (⌘K)"
      >
        <Palette size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-white rounded-xl shadow-2xl border-2 border-gray-200 overflow-hidden"
      style={{ width: '360px', maxHeight: '90vh' }}>
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette size={20} />
          <h3 className="font-semibold">Color Explorer</h3>
          <span className="text-xs bg-gray-700 px-2 py-0.5 rounded">DEV MODE</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-700 rounded"
          >
            {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-700 rounded"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 60px)' }}>
          {/* Custom Color Inputs */}
          <div className="space-y-4 mb-6">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide block">
              Custom Colors
            </label>

            <ColorInput
              label="Primary"
              description="Headers, nav, primary buttons"
              value={customColors.primary}
              onChange={(val) => handleColorChange('primary', val)}
            />

            <ColorInput
              label="Secondary"
              description="Stats bars, accent sections"
              value={customColors.secondary}
              onChange={(val) => handleColorChange('secondary', val)}
            />

            <ColorInput
              label="Accent"
              description="CTA buttons, badges"
              value={customColors.accent}
              onChange={(val) => handleColorChange('accent', val)}
            />

            <ColorInput
              label="Accent Soft"
              description="Decorative accents, borders"
              value={customColors.accentSoft}
              onChange={(val) => handleColorChange('accentSoft', val)}
            />

            <ColorInput
              label="Background"
              description="Page background"
              value={customColors.background}
              onChange={(val) => handleColorChange('background', val)}
            />
          </div>

          {/* Preset Palettes */}
          <div className="mb-6">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block">
              Preset Palettes
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(COLOR_PALETTES).map((paletteName) => (
                <button
                  key={paletteName}
                  onClick={() => handlePaletteChange(paletteName)}
                  className={`p-2 rounded-lg border-2 transition-all text-left ${
                    currentPalette === paletteName
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-sm font-medium capitalize mb-1">{paletteName}</div>
                  <div className="flex gap-1">
                    {Object.values(COLOR_PALETTES[paletteName]).slice(0, 4).map((color, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="mt-6 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
            <p className="font-semibold mb-1">How it works:</p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Each base color auto-generates lifted, tint, and dark variants</li>
              <li>Press <kbd className="bg-gray-200 px-1 rounded">⌘K</kbd> to toggle this panel</li>
              <li>Changes apply in real-time to the page</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// Color Input Component
const ColorInput = ({ label, description, value, onChange }) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div>
          <label className="text-sm font-medium text-gray-900">{label}</label>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 rounded cursor-pointer border-2 border-gray-300"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-20 px-2 py-1 text-xs font-mono border border-gray-300 rounded"
            placeholder="#000000"
          />
        </div>
      </div>
    </div>
  );
};

export default ColorExplorer;
