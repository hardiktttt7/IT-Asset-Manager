import React from 'react';
import { Table } from './Table';
import { Asset } from '../types';
import { Plus } from 'lucide-react';

interface AssetListProps {
  assets: Asset[];
  onAddAsset: () => void;
  onSelectAsset: (asset: Asset) => void;
}

export function AssetList({ assets, onAddAsset, onSelectAsset }: AssetListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">IT Assets</h2>
        <button
          onClick={onAddAsset}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add Asset
        </button>
      </div>
      <Table
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'Type', accessor: 'type' },
          { header: 'Status', accessor: 'status' },
          { header: 'Assigned To', accessor: 'assignedTo' },
        ]}
        data={assets}
        onRowClick={onSelectAsset}
      />
    </div>
  );
}