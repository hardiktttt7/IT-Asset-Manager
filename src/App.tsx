import React, { useState } from 'react';
import { Asset, Ticket } from './types';
import { AssetList } from './components/AssetList';
import { TicketList } from './components/TicketList';
import { AssetForm } from './components/AssetForm';
import { TicketForm } from './components/TicketForm';
import { AssetDetails } from './components/AssetDetails';
import { TicketDetails } from './components/TicketDetails';
import { Dashboard } from './components/Dashboard';
import { LayoutGrid, Ticket as TicketIcon, LayoutDashboard } from 'lucide-react';

// Mock data
const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'MacBook Pro 16"',
    type: 'hardware',
    serialNumber: 'MBP2023001',
    purchaseDate: '2023-01-15',
    assignedTo: 'John Doe',
    status: 'in-use',
  },
  {
    id: '2',
    name: 'Windows Server License',
    type: 'software',
    purchaseDate: '2023-03-20',
    status: 'available',
  },
  {
    id: '3',
    name: 'Cisco Switch',
    type: 'network',
    serialNumber: 'CSC2024001',
    purchaseDate: '2024-01-10',
    status: 'in-use',
  },
  {
    id: '4',
    name: 'Office 365 License',
    type: 'software',
    purchaseDate: '2023-12-01',
    assignedTo: 'Marketing Team',
    status: 'in-use',
  },
];

const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Cannot access email',
    description: 'Unable to login to Outlook',
    priority: 'high',
    status: 'open',
    createdAt: '2024-03-15T10:00:00',
    updatedAt: '2024-03-15T10:00:00',
    category: 'software',
  },
  {
    id: '2',
    title: 'Laptop screen flickering',
    description: 'Screen flickers when on battery power',
    priority: 'medium',
    status: 'in-progress',
    createdAt: '2024-03-14T15:30:00',
    updatedAt: '2024-03-15T09:00:00',
    assignedTo: 'Tech Support',
    relatedAssetId: '1',
    category: 'hardware',
  },
  {
    id: '3',
    title: 'Network outage in Building B',
    description: 'Complete network failure in Building B affecting all departments',
    priority: 'critical',
    status: 'open',
    createdAt: '2024-03-15T11:00:00',
    updatedAt: '2024-03-15T11:00:00',
    category: 'network',
  },
  {
    id: '4',
    title: 'Software license expired',
    description: 'Adobe Creative Suite license expired',
    priority: 'low',
    status: 'resolved',
    createdAt: '2024-03-13T09:00:00',
    updatedAt: '2024-03-14T14:00:00',
    category: 'software',
  },
];

type ActiveTab = 'dashboard' | 'assets' | 'tickets';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

  const handleAddAsset = (newAsset: Partial<Asset>) => {
    const asset: Asset = {
      ...newAsset,
      id: Date.now().toString(),
      purchaseDate: newAsset.purchaseDate || new Date().toISOString().split('T')[0],
      status: newAsset.status || 'available',
    } as Asset;
    setAssets([...assets, asset]);
    setShowAssetForm(false);
  };

  const handleUpdateAsset = (updatedAsset: Partial<Asset>) => {
    if (!editingAsset) return;
    const updated = assets.map(asset =>
      asset.id === editingAsset.id ? { ...asset, ...updatedAsset } : asset
    );
    setAssets(updated);
    setEditingAsset(null);
  };

  const handleDeleteAsset = (id: string) => {
    setAssets(assets.filter(asset => asset.id !== id));
    setSelectedAsset(null);
  };

  const handleAddTicket = (newTicket: Partial<Ticket>) => {
    const ticket: Ticket = {
      ...newTicket,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: newTicket.status || 'open',
    } as Ticket;
    setTickets([...tickets, ticket]);
    setShowTicketForm(false);
  };

  const handleUpdateTicket = (updatedTicket: Partial<Ticket>) => {
    if (!editingTicket) return;
    const updated = tickets.map(ticket =>
      ticket.id === editingTicket.id
        ? { ...ticket, ...updatedTicket, updatedAt: new Date().toISOString() }
        : ticket
    );
    setTickets(updated);
    setEditingTicket(null);
  };

  const handleDeleteTicket = (id: string) => {
    setTickets(tickets.filter(ticket => ticket.id !== id));
    setSelectedTicket(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">IT Asset Manager</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'dashboard'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <LayoutDashboard className="mr-2" size={20} />
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('assets')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'assets'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <LayoutGrid className="mr-2" size={20} />
                  Assets
                </button>
                <button
                  onClick={() => setActiveTab('tickets')}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    activeTab === 'tickets'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <TicketIcon className="mr-2" size={20} />
                  Tickets
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' ? (
          <Dashboard assets={assets} tickets={tickets} />
        ) : activeTab === 'assets' ? (
          <AssetList
            assets={assets}
            onAddAsset={() => setShowAssetForm(true)}
            onSelectAsset={setSelectedAsset}
          />
        ) : (
          <TicketList
            tickets={tickets}
            onAddTicket={() => setShowTicketForm(true)}
            onSelectTicket={setSelectedTicket}
          />
        )}
      </main>

      {showAssetForm && (
        <AssetForm
          onSubmit={handleAddAsset}
          onClose={() => setShowAssetForm(false)}
        />
      )}

      {editingAsset && (
        <AssetForm
          initialData={editingAsset}
          onSubmit={handleUpdateAsset}
          onClose={() => setEditingAsset(null)}
        />
      )}

      {selectedAsset && (
        <AssetDetails
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          onEdit={setEditingAsset}
          onDelete={handleDeleteAsset}
        />
      )}

      {showTicketForm && (
        <TicketForm
          onSubmit={handleAddTicket}
          onClose={() => setShowTicketForm(false)}
        />
      )}

      {editingTicket && (
        <TicketForm
          initialData={editingTicket}
          onSubmit={handleUpdateTicket}
          onClose={() => setEditingTicket(null)}
        />
      )}

      {selectedTicket && (
        <TicketDetails
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onEdit={setEditingTicket}
          onDelete={handleDeleteTicket}
        />
      )}
    </div>
  );
}

export default App;