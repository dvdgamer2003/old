import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CATEGORIES } from '@/config/constants';
import { REGIONS, type RegionCode } from '@/types/regions';
import { usePreferences } from '@/hooks/usePreferences';

interface UserPreferencesProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserPreferences({ isOpen, onClose }: UserPreferencesProps) {
  const { preferences, updatePreferences, loading } = usePreferences();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<RegionCode>('us');

  useEffect(() => {
    if (preferences?.categories) {
      setSelectedCategories(preferences.categories);
    }
    if (preferences?.region) {
      setSelectedRegion(preferences.region as RegionCode);
    }
  }, [preferences]);

  const handleSave = async () => {
    await updatePreferences({ 
      categories: selectedCategories,
      region: selectedRegion 
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">News Preferences</h2>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select your region
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value as RegionCode)}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary"
            >
              {Object.entries(REGIONS).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select your preferred categories
            </label>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map((category) => (
                <label
                  key={category}
                  className="flex items-center space-x-2 p-2 rounded border border-gray-200 dark:border-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCategories([...selectedCategories, category]);
                      } else {
                        setSelectedCategories(selectedCategories.filter((c) => c !== category));
                      }
                    }}
                    className="rounded text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Saving...' : 'Save preferences'}
          </button>
        </div>
      </div>
    </div>
  );
}