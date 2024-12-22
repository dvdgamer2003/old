import React from 'react';
import { Globe } from 'lucide-react';
import { REGIONS, type RegionCode } from '@/types/regions';

interface RegionSelectorProps {
  selectedRegion: RegionCode;
  onRegionChange: (region: RegionCode) => void;
}

export function RegionSelector({ selectedRegion, onRegionChange }: RegionSelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-secondary" />
      <select
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value as RegionCode)}
        className="bg-transparent text-sm text-secondary hover:text-primary focus:text-primary focus:outline-none"
      >
        {Object.entries(REGIONS).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}