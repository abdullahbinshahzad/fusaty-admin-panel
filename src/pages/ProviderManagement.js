import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { applyTheme } from '../utils/theme';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import DataTable from '../components/common/DataTable';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import SideModal from '../components/common/SideModal';

const columns = [
  { key: 'name', title: 'Name', render: (val) => <span className="font-semibold">{val}</span> },
  { key: 'email', title: 'Email' },
  { key: 'category', title: 'Category' },
  { key: 'status', title: 'Status' },
  { key: 'rating', title: 'Rating' },
  {
    key: 'action',
    title: 'Action',
    render: (_, row) => (
      <div className="flex gap-4 items-center">
        <button className="text-[#3B4A6B] hover:underline">View</button>
        <button className="text-[#2ECC71] hover:underline">Approve</button>
        <button className="text-[#FF4D4F] hover:underline">Reject</button>
      </div>
    ),
  },
];

const mockData = [
  { name: 'Provider Name', email: 'name123@gmail.com', category: 'Home Services', status: 'Approved', rating: 4.5 },
  { name: 'Provider Name', email: 'name123@gmail.com', category: 'Home Services', status: 'Pending', rating: 4.5 },
  { name: 'Provider Name', email: 'name123@gmail.com', category: 'Home Services', status: 'Rejected', rating: 2.5 },
  { name: 'Provider Name', email: 'name123@gmail.com', category: 'Home Services', status: 'Deactivated', rating: 3.5 },
  { name: 'Provider Name', email: 'name123@gmail.com', category: 'Home Services', status: 'Pending', rating: 4.5 },
  { name: 'Provider Name', email: 'name123@gmail.com', category: 'Home Services', status: 'Approved', rating: 4.5 },
  { name: 'Provider Name', email: 'name123@gmail.com', category: 'Home Services', status: 'Pending', rating: 4.5 },
  { name: 'Provider Name', email: 'name123@gmail.com', category: 'Home Services', status: 'Approved', rating: 3.5 },
  { name: 'Provider Name', email: 'name123@gmail.com', category: 'Home Services', status: 'Pending', rating: 4.5 },
  { name: 'Provider Name', email: 'name123@gmail.com', category: 'Home Services', status: 'Rejected', rating: 2.5 },
];

const tabs = [
  'All',
  'Approved',
  'Pending Requests',
  'Rejected',
  'Deactivated',
];

const ProviderManagement = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  // Handler for opening modal with row data
  const handleView = (row) => {
    setSelectedProvider(row);
    setModalOpen(true);
  };

  // Columns with updated View button
  const columnsWithView = columns.map((col) => {
    if (col.key === 'action') {
      return {
        ...col,
        render: (_, row) => (
          <div className="flex gap-4 items-center">
            <button className="text-[#3B4A6B] hover:underline" onClick={() => handleView(row)}>View</button>
            <button className="text-[#2ECC71] hover:underline">Approve</button>
            <button className="text-[#FF4D4F] hover:underline">Reject</button>
          </div>
        ),
      };
    }
    return col;
  });

  return (
    <div className="min-h-screen bg-background-main">
      <Navbar />
      <div className="flex">
        <Sidebar activeIndex={2} />
        <main className="flex-1 p-8 pt-4 overflow-y-auto">
          {/* Header and Filters */}
          <div className="flex flex-col md:flex-row md:items-center mb-4">
            <div className="flex items-center bg-input-bg rounded-l-full px-4 py-2 w-full md:w-1/3">
              <FaSearch className="text-input-placeholder mr-2" />
              <input
                type="text"
                placeholder="Search Name"
                className="bg-transparent outline-none flex-1 text-input-text placeholder-input-placeholder"
              />
            </div>
            <div className="flex items-center bg-input-bg rounded-r-full px-4 py-2 w-full md:w-1/6 border-l">
              <span className="text-input-placeholder mr-2">By Name</span>
              <FaChevronDown className="text-input-placeholder ml-auto" />
            </div>
          </div>
          {/* Tabs */}
          <div className="flex border-b border-border mt-2">
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                className={`px-6 py-2 text-sm font-semibold border-t-2 transition-all duration-200 ${
                  activeTab === idx
                    ? 'text-accent border-accent bg-background-card'
                    : 'text-input-placeholder border-transparent bg-background-main'
                }`}
                onClick={() => setActiveTab(idx)}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Data Table */}
          <div className="bg-background-card rounded-b-lg shadow-md">
            <DataTable columns={columnsWithView} data={mockData} />
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 text-text-primary text-sm">
            <span>Showing 10-20 of 1000</span>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1 rounded bg-background-main text-input-placeholder cursor-not-allowed" disabled>&lt;&lt; First</button>
              <button className="px-3 py-1 rounded bg-background-main text-input-placeholder cursor-not-allowed" disabled>&lt; Back</button>
              <button className="px-3 py-1 rounded bg-accent text-white font-bold">1</button>
              <button className="px-3 py-1 rounded bg-background-card border border-border">2</button>
              <button className="px-3 py-1 rounded bg-background-card border border-border">3</button>
              <span className="px-2">...</span>
              <button className="px-3 py-1 rounded bg-background-card border border-border">25</button>
              <button className="px-3 py-1 rounded bg-background-main text-accent">Next &gt;</button>
              <button className="px-3 py-1 rounded bg-background-main text-accent">Last &gt;&gt;</button>
            </div>
          </div>
        </main>
      </div>
      {/* Side Modal for Provider Details */}
      <SideModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Provider Detail"
        actions={selectedProvider && (
          <>
            <button className="w-full py-3 rounded-xl bg-[#02B856] text-white font-semibold text-lg" onClick={() => alert('Approved!')}>Approve</button>
            <div className="flex gap-3 mt-2">
              <button className="w-1/2 py-3 rounded-xl text-text-primary font-semibold text-lg bg-transparent" onClick={() => alert('Deactivated!')}>Deactivate</button>
              <button className="w-1/2 py-3 rounded-xl border border-[#FF4D4F] text-[#FF4D4F] font-semibold text-lg bg-transparent" onClick={() => alert('Rejected!')}>Reject</button>
            </div>
          </>
        )}
      >
        {selectedProvider && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-primary">Provider Information</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="font-medium text-text-primary">Provider Name :</div>
                <div className="text-text-secondary">{selectedProvider.name}</div>
              </div>
              <div>
                <div className="font-medium text-text-primary">Email Address :</div>
                <div className="text-text-secondary">{selectedProvider.email}</div>
              </div>
              <div>
                <div className="font-medium text-text-primary">Phone Number :</div>
                <div className="text-text-secondary">Name Here</div>
              </div>
              <div>
                <div className="font-medium text-text-primary">Data Registered :</div>
                <div className="text-text-secondary">Name Here</div>
              </div>
              <div>
                <div className="font-medium text-text-primary">Category :</div>
                <div className="text-text-secondary">{selectedProvider.category}</div>
              </div>
              <div>
                <div className="font-medium text-text-primary">Ratings :</div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="text-yellow-400 text-xl">{selectedProvider.rating % 1 ? '½' : '★'}</span>
                </div>
              </div>
              <div>
                <div className="font-medium text-text-primary">Status :</div>
                <div>
                  <span className={`inline-block px-3 py-1 rounded text-xs font-semibold ${selectedProvider.status === 'Approved' ? 'bg-green-100 text-green-600' : selectedProvider.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : selectedProvider.status === 'Rejected' ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-600'}`}>{selectedProvider.status}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </SideModal>
    </div>
  );
};

export default ProviderManagement; 