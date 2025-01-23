export interface Asset {
  id: string;
  name: string;
  type: 'hardware' | 'software' | 'network';
  serialNumber?: string;
  purchaseDate: string;
  assignedTo?: string;
  status: 'available' | 'in-use' | 'maintenance' | 'retired';
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  relatedAssetId?: string;
  category: 'hardware' | 'software' | 'network' | 'access' | 'other';
}