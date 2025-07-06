import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { applyTheme } from "../utils/theme";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import DataTable from "../components/common/DataTable";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import SideModal from "../components/common/SideModal";
import { useApi } from "../hooks/useApi";
import { message } from "antd";

// Columns will be defined inside the component to access translation function



// Tabs will be defined inside component to access translation function

const ProviderManagement = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [providers, setProviders] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("name");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { getProviders, approveProvider } = useApi();
  const mode = useSelector((state) => state.theme.mode);

  // Define tabs inside component to access translation function
  const tabs = [
    t('tabs.all'),
    t('tabs.approved'),
    t('tabs.pendingRequests'),
    t('tabs.rejected'),
    t('tabs.deactivated')
  ];

  // Define columns inside component to access translation function
  const columns = [
    {
      key: "fullName",
      title: t('table.name'),
      render: (val) => <span className="text-text-tablebody font-semibold">{val}</span>,
    },
    {
      key: "email",
      title: t('table.email'),
      render: (val) => <span className="text-text-tablebody">{val}</span>,
    },
    {
      key: "category",
      title: t('table.category'),
      render: (val) => <span className="text-text-tablebody">{val || "N/A"}</span>,
    },
    {
      key: "isApproved",
      title: t('table.status'),
      render: (val) => (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            val === true
              ? "bg-[#55CE631A] text-[#55CE63]"
              : val === false
              ? "bg-[#FFBC341A] text-[#FFBC34]"
              // : val === 'Rejected'
              // ? "bg-[#F62D511A] text-[#F62D51]"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {val === true ? "Approved" : val === false ? "Pending" : "Unknown"}
        </span>
      ),
    },
    {
      key: "verified",
      title: t('table.verified'),
      render: (val) => (
        <span
          className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
            val === true
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {val === true ? "Yes" : "No"}
        </span>
      ),
    },
    {
      key: "action",
      title: t('table.action'),
    },
  ];

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  // Fetch providers on component mount and when pagination changes
  useEffect(() => {
      const fetchProviders = async () => {
    try {
      const response = await getProviders(pagination.currentPage, pagination.itemsPerPage);
      
      console.log('Providers API response:', response);
      console.log('Response.data:', response.data);
      console.log('Response.data type:', typeof response.data);
      console.log('Is response.data array?', Array.isArray(response.data));
      
      if (response.success) {
        // Handle the actual API response structure
        let providersData = [];
        if (response.data && response.data.docs && Array.isArray(response.data.docs)) {
          providersData = response.data.docs;
        } else if (Array.isArray(response.data)) {
          providersData = response.data;
        } else if (Array.isArray(response.result)) {
          providersData = response.result;
        } else {
          console.warn('No valid providers array found in response:', response);
          providersData = [];
        }
        
        console.log('Setting providers to:', providersData);
        setProviders(providersData);
        setPagination(prev => ({
          ...prev,
          totalPages: response.data?.totalPages || 1,
          totalItems: response.data?.totalDocs || 0,
        }));
      } else {
        message.error(response.message || "Failed to fetch providers");
      }
    } catch (error) {
      message.error("Error fetching providers");
      console.error("Error fetching providers:", error);
    }
  };

    fetchProviders();
  }, [pagination.currentPage, pagination.itemsPerPage, getProviders]);

  // Handler for opening modal with row data
  const handleView = (row) => {
    setSelectedProvider(row);
    setModalOpen(true);
  };

  // Handler for approving a provider
  const handleApprove = async (providerId) => {
    try {
      const response = await approveProvider(providerId);
      
      if (response.success) {
        message.success("Provider approved successfully!");
        
        // Update the specific provider in the providers array
        setProviders(prevProviders => 
          prevProviders.map(provider => 
            provider._id === providerId 
              ? { ...provider, isApproved: true }
              : provider
          )
        );
        
        // If the modal is open and we're approving the selected provider, update it too
        if (selectedProvider && selectedProvider._id === providerId) {
          setSelectedProvider(prev => ({ ...prev, isApproved: true }));
        }
      } else {
        message.error(response.message || "Failed to approve provider");
      }
    } catch (error) {
      message.error("Error approving provider");
      console.error("Error approving provider:", error);
    }
  };

  // Pagination handlers
  const handlePageChange = (page) => {
    setPagination(prev => ({
      ...prev,
      currentPage: page,
    }));
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    // Reset to first page when searching
    setPagination(prev => ({
      ...prev,
      currentPage: 1,
    }));
  };

  const handleSearchOptionChange = (option) => {
    setSearchOption(option);
    setDropdownOpen(false);
    setSearchTerm(""); // Clear search when changing option
  };

  const getSearchOptionLabel = (option) => {
    switch (option) {
      case "name": return t('search.byName');
      case "email": return t('search.byEmail');
      case "category": return t('search.byCategory');
      case "status": return t('search.byStatus');
      default: return t('search.byName');
    }
  };

  // Filter providers based on search term and selected option
  const filteredProviders = Array.isArray(providers) ? providers.filter(provider => {
    if (!searchTerm) return true;
    
    const searchValue = searchTerm.toLowerCase();
    
    switch (searchOption) {
      case "name":
        return provider.fullName?.toLowerCase().includes(searchValue) || false;
      case "email":
        return provider.email?.toLowerCase().includes(searchValue) || false;
      case "category":
        // Handle categories array
        if (provider.categories && Array.isArray(provider.categories)) {
          const categoryMatch = provider.categories.some(cat => 
            cat && typeof cat === 'string' && cat.toLowerCase().includes(searchValue)
          );
          if (categoryMatch) return true;
        }
        // Handle single category field
        if (provider.category && typeof provider.category === 'string') {
          return provider.category.toLowerCase().includes(searchValue);
        }
        return false;
      case "status":
        const statusText = provider.isApproved === true ? "approved" : 
                          provider.isApproved === false ? "pending" : "unknown";
        return statusText.includes(searchValue);
      default:
        return (provider.fullName?.toLowerCase().includes(searchValue) || false) ||
               (provider.email?.toLowerCase().includes(searchValue) || false) ||
               (provider.phoneNo?.toLowerCase().includes(searchValue) || false);
    }
  }) : [];

  // Columns with updated View button
  const columnsWithView = columns.map((col) => {
    if (col.key === "action") {
      return {
        ...col,
        render: (_, row) => (
          <div className="flex gap-4 items-center">
            <button
              className="text-text-tableactionbtn hover:underline"
              onClick={() => handleView(row)}
            >
              View
            </button>
            <button 
              className="text-[#00B050] hover:underline"
              onClick={() => handleApprove(row._id)}
            >
              Approve
            </button>
            <button className="text-[#FF0000] hover:underline">Reject</button>
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
        <Sidebar />
        <main className="flex-1 p-8 pt-4 overflow-y-auto">
          {/* Header and Filters */}
          <div className="flex flex-col md:flex-row md:items-center mb-4">
            <div className="flex items-center bg-background-search rounded-l-full px-4 py-2 w-full md:w-1/3 border-l border-y border-border-search">
              <FaSearch className="text-[#81879D] mr-2" />
              <input
                type="text"
                placeholder={(() => {
                  switch (searchOption) {
                    case "name": return t('search.searchName');
                    case "email": return t('search.searchEmail');
                    case "category": return t('search.searchCategory');
                    case "status": return t('search.searchStatus');
                    default: return t('search.searchName');
                  }
                })()}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-transparent outline-none flex-1 text-input-text placeholder-[#81879D]"
              />
            </div>
            <div className="relative flex items-center bg-background-search rounded-r-full px-4 py-2 w-full md:w-1/6 border-l border-l-searchbar-divider border-r border-r-border-search border-y border-y-border-search cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <span className="text-[#A9AEBC] mr-2">{getSearchOptionLabel(searchOption)}</span>
              <FaChevronDown className={`text-[#81879D] ml-auto transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              
              {/* Dropdown Options */}
              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-background-search text-[#A9AEBC] rounded-b-lg shadow-lg z-10 mt-1">
                  <div 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleSearchOptionChange("name")}
                  >
                    {t('search.byName')}
                  </div>
                  <div 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleSearchOptionChange("email")}
                  >
                    {t('search.byEmail')}
                  </div>
                  <div 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleSearchOptionChange("category")}
                  >
                    {t('search.byCategory')}
                  </div>
                  <div 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleSearchOptionChange("status")}
                  >
                    {t('search.byStatus')}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Tabs */}
          <div className="flex mt-2">
            {tabs.map((tab, idx) => (
              <button
                key={tab}
                className={`px-6 py-2 text-sm font-semibold border-t-2 transition-all duration-200 ${
                  activeTab === idx
                    ? "text-text-activetab border-border-activetab bg-background-activetab"
                    : "text-[#676D75] border-transparent bg-background-filter"
                }`}
                onClick={() => setActiveTab(idx)}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Data Table */}
          <div className="bg-background-card rounded-b-lg shadow-md">
            <DataTable columns={columnsWithView} data={filteredProviders} />
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 text-text-primary text-sm">
            <span>
              {t('pagination.showing')} {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1}-{Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} {t('pagination.of')} {pagination.totalItems}
            </span>
            <div className="flex items-center gap-1">
              <button
                className={`px-3 py-1 rounded ${
                  pagination.currentPage === 1
                    ? "bg-background-card border border-border-paginationbtn text-input-placeholder cursor-not-allowed"
                    : "bg-background-card border border-border-paginationbtn text-accent hover:bg-accent hover:text-white"
                }`}
                disabled={pagination.currentPage === 1}
                onClick={() => handlePageChange(1)}
              >
                {t('pagination.first')}
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  pagination.currentPage === 1
                    ? "bg-background-card border border-border-paginationbtn text-input-placeholder cursor-not-allowed"
                    : "bg-background-card border border-border-paginationbtn text-accent hover:bg-accent hover:text-white"
                }`}
                disabled={pagination.currentPage === 1}
                onClick={() => handlePageChange(pagination.currentPage - 1)}
              >
                {t('pagination.back')}
              </button>
              
              {/* Page numbers */}
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    className={`px-3 py-1 rounded ${
                      pagination.currentPage === pageNum
                        ? "bg-accent text-white font-bold"
                        : "bg-background-card border border-border-paginationbtn hover:bg-accent hover:text-white"
                    }`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              {pagination.totalPages > 5 && (
                <>
                  <span className="px-2">...</span>
                  <button
                    className="px-3 py-1 rounded bg-background-card border border-border-paginationbtn hover:bg-accent hover:text-white"
                    onClick={() => handlePageChange(pagination.totalPages)}
                  >
                    {pagination.totalPages}
                  </button>
                </>
              )}
              
              <button
                className={`px-3 py-1 rounded ${
                  pagination.currentPage === pagination.totalPages
                    ? "bg-background-card border border-border-paginationbtn text-input-placeholder cursor-not-allowed"
                    : "bg-background-card border border-border-paginationbtn text-accent hover:bg-accent hover:text-white"
                }`}
                disabled={pagination.currentPage === pagination.totalPages}
                onClick={() => handlePageChange(pagination.currentPage + 1)}
              >
                {t('pagination.next')}
              </button>
              <button
                className={`px-3 py-1 rounded ${
                  pagination.currentPage === pagination.totalPages
                    ? "bg-background-card border border-border-paginationbtn text-input-placeholder cursor-not-allowed"
                    : "bg-background-card border border-border-paginationbtn text-accent hover:bg-accent hover:text-white"
                }`}
                disabled={pagination.currentPage === pagination.totalPages}
                onClick={() => handlePageChange(pagination.totalPages)}
              >
                {t('pagination.last')}
              </button>
            </div>
          </div>
        </main>
      </div>
      {/* Side Modal for Provider Details */}
      <SideModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t('providerDetail.title')}
        actions={
          selectedProvider && (
            <>
              <button
                className="w-full py-3 rounded-xl bg-[#02B856] text-white font-semibold text-lg"
                onClick={() => handleApprove(selectedProvider._id)}
              >
                {t('providerDetail.approve')}
              </button>
              <div className="flex gap-3 mt-2">
                <button
                  className="w-1/2 py-3 rounded-xl text-text-primary font-semibold text-lg bg-transparent"
                  onClick={() => alert("Deactivated!")}
                >
                  {t('providerDetail.deactivate')}
                </button>
                <button
                  className="w-1/2 py-3 rounded-xl border border-[#FF4D4F] text-[#FF4D4F] font-semibold text-lg bg-transparent"
                  onClick={() => alert("Rejected!")}
                >
                  {t('providerDetail.reject')}
                </button>
              </div>
            </>
          )
        }
      >
        {selectedProvider && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-primary">
              {t('providerDetail.information')}
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="font-medium text-text-primary">
                  {t('providerDetail.name')} :
                </div>
                <div className="text-text-secondary">
                  {selectedProvider.fullName}
                </div>
              </div>
              <div>
                <div className="font-medium text-text-primary">
                  {t('providerDetail.email')} :
                </div>
                <div className="text-text-secondary">
                  {selectedProvider.email}
                </div>
              </div>
              <div>
                <div className="font-medium text-text-primary">
                  {t('providerDetail.phone')} :
                </div>
                <div className="text-text-secondary">
                  {selectedProvider.phoneNo || "N/A"}
                </div>
              </div>
              <div>
                <div className="font-medium text-text-primary">
                  {t('providerDetail.dateRegistered')} :
                </div>
                <div className="text-text-secondary">
                  {new Date(selectedProvider.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div>
                <div className="font-medium text-text-primary">{t('providerDetail.categories')} :</div>
                <div className="text-text-secondary">
                  {selectedProvider.categories && selectedProvider.categories.length > 0 
                    ? selectedProvider.categories.join(", ") 
                    : t('providerDetail.noCategories')}
                </div>
              </div>
              <div>
                <div className="font-medium text-text-primary">{t('providerDetail.location')} :</div>
                <div className="text-text-secondary">
                  {selectedProvider.latitude && selectedProvider.longitude 
                    ? `${selectedProvider.latitude.toFixed(4)}, ${selectedProvider.longitude.toFixed(4)}`
                    : t('providerDetail.noLocation')}
                </div>
              </div>
              <div>
                <div className="font-medium text-text-primary">{t('providerDetail.status')} :</div>
                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
                      selectedProvider.isApproved === true
                        ? "bg-green-100 text-green-600"
                        : selectedProvider.isApproved === false
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {selectedProvider.isApproved === true ? "Approved" : selectedProvider.isApproved === false ? "Pending" : "Unknown"}
                  </span>
                </div>
              </div>
              <div>
                <div className="font-medium text-text-primary">{t('providerDetail.verified')} :</div>
                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
                      selectedProvider.verified === true
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {selectedProvider.verified === true ? "Yes" : "No"}
                  </span>
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
