import React from 'react';
import { Asset } from '../types';
import { X, Edit, Trash2 } from 'lucide-react';

interface AssetDetailsProps {
  asset: Asset;
  onClose: () => void;
  onEdit: (asset: Asset) => void;
  onDelete: (id: string) => void;
}

export function AssetDetails({ asset, onClose, onEdit, onDelete }: AssetDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Asset Details</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Name</h4>
              <p className="mt-1 text-sm text-gray-900">{asset.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Type</h4>
              <p className="mt-1 text-sm text-gray-900 capitalize">{asset.type}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Serial Number</h4>
              <p className="mt-1 text-sm text-gray-900">{asset.serialNumber || 'N/A'}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Purchase Date</h4>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(asset.purchaseDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Assigned To</h4>
              <p className="mt-1 text-sm text-gray-900">{asset.assignedTo || 'Unassigned'}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Status</h4>
              <p className="mt-1 text-sm text-gray-900 capitalize">{asset.status}</p>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              onClick={() => onDelete(asset.id)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100"
            >
              <Trash2 size={16} className="mr-2" />
              Delete Asset
            </button>
            <button
              onClick={() => onEdit(asset)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              <Edit size={16} className="mr-2" />
              Edit Asset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}