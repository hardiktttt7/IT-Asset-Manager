import React from 'react';
import { Asset, Ticket } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertCircle, CheckCircle2, Clock, HardDrive, Laptop, Network, Package } from 'lucide-react';

interface DashboardProps {
  assets: Asset[];
  tickets: Ticket[];
}

const COLORS = ['#4ade80', '#fb923c', '#60a5fa', '#f87171'];

export function Dashboard({ assets, tickets }: DashboardProps) {
  // Asset statistics
  const totalAssets = assets.length;
  const assetsByType = assets.reduce((acc, asset) => {
    acc[asset.type] = (acc[asset.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const assetsByStatus = assets.reduce((acc, asset) => {
    acc[asset.status] = (acc[asset.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const assetStatusData = Object.entries(assetsByStatus).map(([name, value]) => ({
    name: name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    value,
  }));

  // Ticket statistics
  const openTickets = tickets.filter(ticket => ticket.status === 'open').length;
  const criticalTickets = tickets.filter(ticket => ticket.priority === 'critical').length;
  const resolvedTickets = tickets.filter(ticket => ticket.status === 'resolved').length;

  const ticketsByPriority = tickets.reduce((acc, ticket) => {
    acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const priorityData = Object.entries(ticketsByPriority).map(([priority, count]) => ({
    name: priority.charAt(0).toUpperCase() + priority.slice(1),
    count,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Asset Summary Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Assets</p>
              <p className="text-2xl font-semibold text-gray-900">{totalAssets}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-gray-600">
              <HardDrive className="h-4 w-4 mr-1" />
              <span>Hardware: {assetsByType.hardware || 0}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Laptop className="h-4 w-4 mr-1" />
              <span>Software: {assetsByType.software || 0}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Network className="h-4 w-4 mr-1" />
              <span>Network: {assetsByType.network || 0}</span>
            </div>
          </div>
        </div>

        {/* Open Tickets Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Open Tickets</p>
              <p className="text-2xl font-semibold text-gray-900">{openTickets}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span>Critical: {criticalTickets}</span>
            </div>
          </div>
        </div>

        {/* Resolved Tickets Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Resolved Tickets</p>
              <p className="text-2xl font-semibold text-gray-900">{resolvedTickets}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-gray-600">
              Resolution Rate: {((resolvedTickets / tickets.length) * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Asset Status Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-gray-600 mb-4">Asset Status Distribution</p>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={45}
                  fill="#8884d8"
                >
                  {assetStatusData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Ticket Priority Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tickets by Priority</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#60a5fa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[...tickets]
              .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
              .slice(0, 5)
              .map(ticket => (
                <div key={ticket.id} className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                    ticket.priority === 'critical' ? 'bg-red-500' :
                    ticket.priority === 'high' ? 'bg-orange-500' :
                    ticket.priority === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{ticket.title}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(ticket.updatedAt).toLocaleDateString()} - {ticket.status}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}