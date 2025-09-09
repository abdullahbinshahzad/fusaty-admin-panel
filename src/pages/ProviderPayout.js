import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { applyTheme } from "../utils/theme";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import DataTable from "../components/common/DataTable";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import SideModal from "../components/common/SideModal";
// import { useApi } from "../hooks/useApi";
import { message } from "antd";

const ProviderPayout = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [payouts, setPayouts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("orderId");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState("autoRelease");
  const [actionDropdownOpen, setActionDropdownOpen] = useState(false);
  //   const { getPayouts, releasePayout, holdPayout } = useApi();
  const mode = useSelector((state) => state.theme.mode);

  // Define tabs inside component to access translation function
  const tabs = [
    t("tabs.all"),
    t("tabs.released"),
    t("tabs.eligible"),
    t("tabs.hold"),
  ];

  const dummyPayouts = useMemo(
    () => [
      {
        orderId: "1234567890",
        provider: "Provider 1",
        noOfOrders: 1,
        totalAmount: 100,
        payoutDate: "2024-01-15T10:30:00Z",
        payoutTime: "10:30 AM",
        status: "released",
      },
      {
        orderId: "1234567891",
        provider: "Provider 2",
        noOfOrders: 2,
        totalAmount: 200,
        payoutDate: "2024-01-15T10:30:00Z",
        payoutTime: "10:30 AM",
        status: "eligible",
      },
      {
        orderId: "1234567892",
        provider: "Provider 3",
        noOfOrders: 3,
        totalAmount: 300,
        payoutDate: "2024-01-15T10:30:00Z",
        payoutTime: "10:30 AM",
        status: "hold",
      },
      {
        orderId: "1234567893",
        provider: "Provider 4",
        noOfOrders: 4,
        totalAmount: 400,
        payoutDate: "2024-01-15T10:30:00Z",
        payoutTime: "10:30 AM",
        status: "released",
      },
      {
        orderId: "1234567894",
        provider: "Provider 5",
        noOfOrders: 5,
        totalAmount: 500,
        payoutDate: "2024-01-15T10:30:00Z",
        payoutTime: "10:30 AM",
        status: "eligible",
      },
      {
        orderId: "1234567895",
        provider: "Provider 6",
        noOfOrders: 6,
        totalAmount: 600,
        payoutDate: "2024-01-15T10:30:00Z",
        payoutTime: "10:30 AM",
        status: "hold",
      },
    ],
    []
  );

  // Define columns inside component to access translation function
  const columns = [
    {
      key: "orderId",
      title: t("table.orderId"),
      render: (val) => (
        <span className="text-text-tablebody font-semibold">{val}</span>
      ),
    },
    {
      key: "provider",
      title: t("table.provider"),
      render: (val) => <span className="text-text-tablebody">{val}</span>,
    },
    {
      key: "noOfOrders",
      title: t("table.noOfOrders"),
      render: (val) => <span className="text-text-tablebody">{val}</span>,
    },
    {
      key: "totalAmount",
      title: t("table.totalAmount"),
      render: (val) => (
        <span className="text-text-tablebody font-semibold">SAR {val}</span>
      ),
    },
    {
      key: "payoutDate",
      title: t("table.payoutDate"),
      render: (val) => <span className="text-text-tablebody">{val}</span>,
    },
    {
      key: "payoutTime",
      title: t("table.payoutTime"),
      render: (val) => <span className="text-text-tablebody">{val}</span>,
    },
    {
      key: "status",
      title: t("table.status"),
      render: (val) => (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            val === "released"
              ? "bg-[#55CE631A] text-[#55CE63]"
              : val === "eligible"
              ? "bg-[#007BFF1A] text-[#007BFF]"
              : val === "hold"
              ? "bg-[#FFBC341A] text-[#FFBC34]"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {val === "released"
            ? "Released"
            : val === "eligible"
            ? "Eligible"
            : val === "hold"
            ? "Hold"
            : "Unknown"}
        </span>
      ),
    },
    {
      key: "action",
      title: t("table.action"),
    },
  ];

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  // Close action dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (actionDropdownOpen && !event.target.closest('.action-dropdown')) {
        setActionDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [actionDropdownOpen]);

  // Fetch payouts on component mount and when pagination changes
  //   useEffect(() => {
  //     const fetchPayouts = async () => {
  //       try {
  //         const response = await getPayouts(pagination.currentPage, pagination.itemsPerPage);

  //         if (response.success) {
  //           let payoutsData = [];
  //           if (response.data && response.data.docs && Array.isArray(response.data.docs)) {
  //             payoutsData = response.data.docs;
  //           } else if (Array.isArray(response.data)) {
  //             payoutsData = response.data;
  //           } else if (Array.isArray(response.result)) {
  //             payoutsData = response.result;
  //           } else {
  //             console.warn('No valid payouts array found in response:', response);
  //             payoutsData = [];
  //           }

  //           setPayouts(payoutsData);
  //           setPagination(prev => ({
  //             ...prev,
  //             totalPages: response.data?.totalPages || 1,
  //             totalItems: response.data?.totalDocs || 0,
  //           }));
  //         } else {
  //           message.error(response.message || "Failed to fetch payouts");
  //         }
  //       } catch (error) {
  //         message.error("Error fetching payouts");
  //         console.error("Error fetching payouts:", error);
  //       }
  //     };

  //     fetchPayouts();
  //   }, [pagination.currentPage, pagination.itemsPerPage, getPayouts]);

  useEffect(() => {
    setPayouts(dummyPayouts);
    setPagination((prev) => ({
      ...prev,
      totalPages: Math.ceil(dummyPayouts.length / pagination.itemsPerPage),
      totalItems: dummyPayouts.length,
    }));
  }, [dummyPayouts, pagination.itemsPerPage]);

  // Handler for opening modal with row data
  const handleView = (row) => {
    setSelectedPayout(row);
    setModalOpen(true);
  };

  // Handler for select change
  // const handleSelectChange = (e) => {
  //   setSelectedAction(e.target.value);
  // };

  // Handler for releasing a payout
  //   const handleRelease = async (payoutId) => {
  //     try {
  //       const response = await releasePayout(payoutId);

  //       if (response.success) {
  //         message.success("Payout released successfully!");

  //         // Update the specific payout in the payouts array
  //         setPayouts(prevPayouts =>
  //           prevPayouts.map(payout =>
  //             payout._id === payoutId
  //               ? { ...payout, status: 'released' }
  //               : payout
  //           )
  //         );

  //         // If the modal is open and we're releasing the selected payout, update it too
  //         if (selectedPayout && selectedPayout._id === payoutId) {
  //           setSelectedPayout(prev => ({ ...prev, status: 'released' }));
  //         }
  //       } else {
  //         message.error(response.message || "Failed to release payout");
  //       }
  //     } catch (error) {
  //       message.error("Error releasing payout");
  //       console.error("Error releasing payout:", error);
  //     }
  //   };

  // Handler for holding a payout
  //   const handleHold = async (payoutId) => {
  //     try {
  //       const response = await holdPayout(payoutId);

  //       if (response.success) {
  //         message.success("Payout put on hold successfully!");

  //         // Update the specific payout in the payouts array
  //         setPayouts(prevPayouts =>
  //           prevPayouts.map(payout =>
  //             payout._id === payoutId
  //               ? { ...payout, status: 'hold' }
  //               : payout
  //           )
  //         );

  //         // If the modal is open and we're holding the selected payout, update it too
  //         if (selectedPayout && selectedPayout._id === payoutId) {
  //           setSelectedPayout(prev => ({ ...prev, status: 'hold' }));
  //         }
  //       } else {
  //         message.error(response.message || "Failed to hold payout");
  //       }
  //     } catch (error) {
  //       message.error("Error holding payout");
  //       console.error("Error holding payout:", error);
  //     }
  //   };

  // Pagination handlers
  const handlePageChange = (page) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    // Reset to first page when searching
    setPagination((prev) => ({
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
      case "orderId":
        return t("search.byOrderId");
      case "provider":
        return t("search.byProvider");
      case "status":
        return t("search.byStatus");
      default:
        return t("search.byOrderId");
    }
  };

  // Filter payouts based on search term and selected option
  const filteredPayouts = Array.isArray(payouts)
    ? payouts.filter((payout) => {
        if (!searchTerm) return true;

        const searchValue = searchTerm.toLowerCase();

        switch (searchOption) {
          case "orderId":
            return payout.orderId?.toLowerCase().includes(searchValue) || false;
          case "provider":
            return (
              payout.provider?.toLowerCase().includes(searchValue) || false
            );
          case "status":
            const statusText = payout.status || "unknown";
            return statusText.toLowerCase().includes(searchValue);
          default:
            return (
              payout.orderId?.toLowerCase().includes(searchValue) ||
              false ||
              payout.provider?.toLowerCase().includes(searchValue) ||
              false
            );
        }
      })
    : [];

  // Columns with updated action buttons
  const columnsWithActions = columns.map((col) => {
    if (col.key === "action") {
      return {
        ...col,
        render: (_, row) => (
          <div className="flex gap-4 items-center">
            {/* View button - always visible */}
            <button
              className="text-text-tableactionbtn hover:underline"
              onClick={() => handleView(row)}
            >
              {t("table.view")}
            </button>
            
            {/* Release button - show when status is 'hold' or 'eligible' */}
            {(row.status === 'hold' || row.status === 'eligible') && (
            <button
              className="text-[#00B050] hover:underline"
              //   onClick={() => handleRelease(row._id)}
            >
              {t("table.release")}
            </button>
            )}
            
            {/* Hold button - show only when status is 'eligible' */}
            {row.status === 'eligible' && (
            <button
              className="text-[#FFBC34] hover:underline"
              //   onClick={() => handleHold(row._id)}
            >
              {t("table.hold")}
            </button>
            )}
          </div>
        ),
      };
    }
    return col;
  });

  return (
    <div className="min-h-screen bg-background-main">
      <Navbar 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMenuOpen={isMobileMenuOpen}
      />
      <div className="flex flex-col lg:flex-row">
        <Sidebar 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
        <main className="flex-1 p-4 lg:p-6 xl:p-8 pt-4 w-full overflow-x-auto">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row justify-start mb-4">
            <div className="flex items-center bg-background-search rounded-l-full px-4 py-2 w-full sm:max-w-sm border border-border-search">
              <FaSearch className="text-[#81879D] mr-2" />
              <input
                type="text"
                placeholder={(() => {
                  switch (searchOption) {
                    case "orderId":
                      return t("search.searchOrderId");
                    case "provider":
                      return t("search.searchProvider");
                    case "status":
                      return t("search.searchStatus");
                    default:
                      return t("search.searchOrderId");
                  }
                })()}
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="bg-transparent outline-none flex-1 text-input-text placeholder-[#81879D]"
              />
            </div>
            <div
              className="relative flex items-center bg-background-search rounded-r-full px-4 py-2 w-full sm:w-auto sm:min-w-[120px] border-l border-l-searchbar-divider border-r border-r-border-search border-y border-y-border-search cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="text-[#A9AEBC] mr-2">
                {getSearchOptionLabel(searchOption)}
              </span>
              <FaChevronDown
                className={`text-[#81879D] ml-auto transition-transform ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />

              {/* Dropdown Options */}
              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-background-search text-[#A9AEBC] rounded-b-lg shadow-lg z-10 mt-1">
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleSearchOptionChange("orderId")}
                  >
                    {t("search.byOrderId")}
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleSearchOptionChange("provider")}
                  >
                    {t("search.byProvider")}
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleSearchOptionChange("status")}
                  >
                    {t("search.byStatus")}
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
            <DataTable columns={columnsWithActions} data={filteredPayouts} />
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 text-text-primary text-sm">
            <span>
            {t("pagination.showing")}{" "}
              {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}-
              {Math.min(
                pagination.currentPage * pagination.itemsPerPage,
                pagination.totalItems
              )}{" "}
              {t("pagination.of")} {pagination.totalItems}
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
                {t("pagination.first")}
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
                {t("pagination.back")}
              </button>

              {/* Page numbers */}
              {Array.from(
                { length: Math.min(5, pagination.totalPages) },
                (_, i) => {
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
                }
              )}

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
                {t("pagination.next")}
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
                {t("pagination.last")}
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Side Modal for Payout Details */}
      <SideModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t("payoutDetail.title")}
        actions={
          selectedPayout && (
            <button
              className="w-full py-3 rounded-xl bg-accent text-white font-semibold text-lg"
              onClick={() => {
                message.success("Payout details saved successfully!");
                setModalOpen(false);
              }}
            >
              {t("payoutDetail.save")}
            </button>
          )
        }
      >
        {selectedPayout && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="font-medium text-text-primary">{t("payoutDetail.orderId")} :</div>
                <div className="text-text-secondary">
                  {selectedPayout.orderId || "Order ID here"}
                </div>
              </div>
              <div>
                <div className="font-medium text-text-primary">{t("payoutDetail.userName")} :</div>
                <div className="text-text-secondary">
                  {selectedPayout.userName || "User Name"}
                </div>
              </div>
              <div>
                <div className="font-medium text-text-primary">
                {t("payoutDetail.providerName")} :
                </div>
                <div className="text-text-secondary">
                  {selectedPayout.provider || "Provider Name"}
                </div>
              </div>
              <div>
                <div className="font-medium text-text-primary">
                {t("payoutDetail.serviceName")} :
                </div>
                <div className="text-text-secondary">
                  {selectedPayout.serviceName || "Service Name"}
                </div>
              </div>
              <div>
                <div className="font-medium text-text-primary">{t("payoutDetail.category")} :</div>
                <div className="text-text-secondary">
                  {selectedPayout.category || "Home Services"}
                </div>
              </div>
              <div>
                <div className="font-medium text-text-primary">
                {t("payoutDetail.orderCompletionDate")} :
                </div>
                <div className="text-text-secondary">
                  {selectedPayout.orderCompletionDate || "08/05/2025"}
                </div>
              </div>
              <div>
                <div className="font-medium text-text-primary">
                {t("payoutDetail.orderAmount")} :
                </div>
                <div className="text-text-secondary">
                  {selectedPayout.orderAmount
                    ? `${selectedPayout.orderAmount} Sar`
                    : "150 Sar"}
                </div>
              </div>
              <div>
                <div className="font-medium text-text-primary">
                {t("payoutDetail.fusatyCommission")} (20%) :
                </div>
                <div className="text-text-secondary">
                  {selectedPayout.commission
                    ? `${selectedPayout.commission} SAR`
                    : "7.5 SAR"}
                </div>
              </div>
              <div>
                <div className="font-medium text-text-primary">
                {t("payoutDetail.payoutAmount")} :
                </div>
                <div className="text-text-secondary">
                  {selectedPayout.payoutAmount
                    ? `${selectedPayout.payoutAmount} Sar`
                    : "120 Sar"}
                </div>
              </div>
              <div>
                <div className="font-medium text-text-primary">{t("payoutDetail.status")} :</div>
                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
                      selectedPayout.status === "released"
                        ? "bg-[#55CE631A] text-[#55CE63]"
                        : selectedPayout.status === "eligible"
                        ? "bg-[#007BFF1A] text-[#007BFF]"
                        : selectedPayout.status === "hold"
                        ? "bg-[#FFBC341A] text-[#FFBC34]"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {selectedPayout.status === "released"
                      ? "Released"
                      : selectedPayout.status === "eligible"
                      ? "Eligible"
                      : selectedPayout.status === "hold"
                      ? "Hold"
                      : "Unknown"}
                  </span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-6"></div>

            <h3 className="text-lg font-semibold mb-4 text-text-primary">
            {t("payoutDetail.payoutTimingInfo")}
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="font-medium text-text-primary">
                {t("payoutDetail.orderCompletionTime")} :
                </div>
                <div className="text-text-secondary">
                  {selectedPayout.orderCompletionTime || "02:12 pm"}
                </div>
              </div>
              <div>
                <div className="font-medium text-text-primary">
                {t("payoutDetail.eligibleForPayout")} :
                </div>
                <div className="text-text-secondary">
                  {selectedPayout.eligibleForPayout || "08/05/2025"}
                </div>
              </div>
            </div>
                         <div className="mb-4">
               <label className="block text-sm font-medium text-text-primary mb-2">
               {t("payoutDetail.action")}
               </label>
               <div className="relative action-dropdown">
                 {/* Custom Dropdown Button */}
                 <button
                   type="button"
                   className={`w-full p-3 pr-12 rounded-lg appearance-none cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 text-left ${
                     selectedAction === 'autoRelease' 
                       ? 'bg-[#E6F3FF] text-[#007BFF]' 
                       : selectedAction === 'releaseNow' 
                       ? 'bg-[#E6FFE6] text-[#00B050]' 
                       : 'bg-[#FFF2E6] text-[#FF8A00]'
                   }`}
                   style={{
                     backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23A9AEBC' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                     backgroundPosition: 'right 16px center',
                     backgroundRepeat: 'no-repeat',
                     backgroundSize: '16px'
                   }}
                   onClick={() => setActionDropdownOpen(!actionDropdownOpen)}
                 >
                   {selectedAction === 'autoRelease' 
                     ? t("payoutDetail.autoRelease")
                     : selectedAction === 'releaseNow' 
                     ? t("payoutDetail.releaseNow")
                     : t("payoutDetail.hold")
                   }
                 </button>
                 
                 {/* Dynamic border based on selected value */}
                 <div 
                   className={`absolute inset-0 pointer-events-none rounded-lg border-2 transition-all duration-200 ${
                     selectedAction === 'autoRelease' 
                       ? 'border-[#007BFF]' 
                       : selectedAction === 'releaseNow' 
                       ? 'border-[#00B050]' 
                       : 'border-[#FF8A00]'
                   }`}
                 ></div>

                 {/* Custom Dropdown Options */}
                 {actionDropdownOpen && (
                   <div className="absolute top-full left-0 right-0 bg-white text-black rounded-lg shadow-lg z-20 mt-1 border border-gray-200">
                     <div
                       className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm text-black border-b border-gray-100"
                       onClick={() => {
                         setSelectedAction('autoRelease');
                         setActionDropdownOpen(false);
                       }}
                     >
                       {t("payoutDetail.autoRelease")}
                     </div>
                     <div
                       className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm text-black border-b border-gray-100"
                       onClick={() => {
                         setSelectedAction('releaseNow');
                         setActionDropdownOpen(false);
                       }}
                     >
                       {t("payoutDetail.releaseNow")}
                     </div>
                     <div
                       className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm text-black"
                       onClick={() => {
                         setSelectedAction('hold');
                         setActionDropdownOpen(false);
                       }}
                     >
                       {t("payoutDetail.hold")}
                     </div>
                   </div>
                 )}
               </div>
             </div>
          </div>
        )}
      </SideModal>
    </div>
  );
};

export default ProviderPayout;
