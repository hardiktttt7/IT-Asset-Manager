import React from 'react';
import { Table } from './Table';
import { Ticket } from '../types';
import { Plus } from 'lucide-react';

interface TicketListProps {
  tickets: Ticket[];
  onAddTicket: () => void;
  onSelectTicket: (ticket: Ticket) => void;
}

export function TicketList({ tickets, onAddTicket, onSelectTicket }: TicketListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Support Tickets</h2>
        <button
          onClick={onAddTicket}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus size={20} />
          Create Ticket
        </button>
      </div>
      <Table
        columns={[
          { header: 'Title', accessor: 'title' },
          { header: 'Priority', accessor: 'priority' },
          { header: 'Status', accessor: 'status' },
          { header: 'Category', accessor: 'category' },
          { header: 'Created', accessor: 'createdAt' },
        ]}
        data={tickets}
        onRowClick={onSelectTicket}
      />
    </div>
  );
}