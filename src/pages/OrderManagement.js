import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { applyTheme } from "../utils/theme";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import DataTable from "../components/common/DataTable";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import SideModal from "../components/common/SideModal";
// import { useApi } from "../hooks/useApi";
// import { message } from "antd";

const OrderManagement = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("orderId");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  //   const { getOrders } = useApi();
  const dropdownRef = useRef(null);
  const mode = useSelector((state) => state.theme.mode);

  // Define tabs inside component to access translation function
  const tabs = [
    t("tabs.all"),
    t("tabs.completed"),
    t("tabs.inProgress"),
    t("tabs.cancelled"),
  ];

  const dummyOrders = useMemo(
    () => [
      {
        _id: "1",
        orderId: "1234567890",
        userName: "John Doe",
        providerName: "Provider 1",
        category: "Category 1",
        date: "2024-01-15T10:30:00Z",
        status: "completed",
        amount: 100,
        createdAt: "2024-01-15T10:30:00Z",
      },
      {
        _id: "2",
        orderId: "1234567891",
        userName: "Jane Smith",
        providerName: "Provider 2",
        category: "Category 2",
        date: "2024-01-10T14:20:00Z",
        status: "inProgress",
        amount: 200,
        createdAt: "2024-01-10T14:20:00Z",
      },
      {
        _id: "3",
        orderId: "1234567892",
        userName: "Mike Johnson",
        providerName: "Provider 3",
        category: "Category 3",
        date: "2024-01-20T09:15:00Z",
        status: "cancelled",
        amount: 300,
        createdAt: "2024-01-20T09:15:00Z",
      },
      {
        _id: "4",
        orderId: "1234567893",
        userName: "Sarah Wilson",
        providerName: "Provider 4",
        category: "Category 4",
        date: "2024-01-05T16:45:00Z",
        status: "completed",
        amount: 400,
        createdAt: "2024-01-05T16:45:00Z",
      },
      {
        _id: "5",
        orderId: "1234567894",
        userName: "David Brown",
        providerName: "Provider 5",
        category: "Category 5",
        date: "2024-01-12T11:30:00Z",
        status: "inProgress",
        amount: 500,
        createdAt: "2024-01-12T11:30:00Z",
      },
      {
        _id: "6",
        orderId: "1234567895",
        userName: "Emily Davis",
        providerName: "Provider 6",
        category: "Category 6",
        date: "2024-01-18T13:20:00Z",
        status: "completed",
        amount: 600,
        createdAt: "2024-01-18T13:20:00Z",
      },
      {
        _id: "7",
        orderId: "1234567896",
        userName: "Robert Miller",
        providerName: "Provider 7",
        category: "Category 7",
        date: "2024-01-08T15:10:00Z",
        status: "inProgress",
        amount: 700,
        createdAt: "2024-01-08T15:10:00Z",
      },
      {
        _id: "8",
        orderId: "1234567897",
        userName: "Lisa Garcia",
        providerName: "Provider 8",
        category: "Category 8",
        date: "2024-01-25T10:00:00Z",
        status: "cancelled",
        amount: 800,
        createdAt: "2024-01-25T10:00:00Z",
      },
      {
        _id: "9",
        orderId: "1234567898",
        userName: "James Taylor",
        providerName: "Provider 9",
        category: "Category 9",
        date: "2024-01-14T12:30:00Z",
        status: "completed",
        amount: 900,
        createdAt: "2024-01-14T12:30:00Z",
      },
      {
        _id: "10",
        orderId: "1234567899",
        userName: "Maria Rodriguez",
        providerName: "Provider 10",
        category: "Category 10",
        date: "2024-01-22T08:45:00Z",
        status: "completed",
        amount: 1000,
        createdAt: "2024-01-22T08:45:00Z",
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
      key: "userName",
      title: t("table.userName"),
      render: (val) => <span className="text-text-tablebody">{val}</span>,
    },
    {
      key: "providerName",
      title: t("table.providerName"),
      render: (val) => <span className="text-text-tablebody">{val}</span>,
    },
    {
      key: "category",
      title: t("table.category"),
      render: (val) => (
        <span className="text-text-tablebody">{val || "N/A"}</span>
      ),
    },
    {
      key: "date",
      title: t("table.date"),
      render: (val) => (
        <span className="text-text-tablebody">
          {new Date(val).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "status",
      title: t("table.status"),
      render: (val) => (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            val === "completed"
              ? "bg-[#55CE631A] text-[#55CE63]"
              : val === "inProgress"
              ? "bg-[#FFBC341A] text-[#FFBC34]"
              : val === "cancelled"
              ? "bg-[#F62D511A] text-[#F62D51]"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {val === "completed"
            ? "Completed"
            : val === "inProgress"
            ? "In Progress"
            : val === "cancelled"
            ? "Cancelled"
            : "Unknown"}
        </span>
      ),
    },
    {
      key: "amount",
      title: t("table.amount"),
      render: (val) => (
        <span className="text-text-tablebody font-semibold">{val} SAR</span>
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch orders on component mount and when pagination changes
  //   useEffect(() => {
  //     const fetchOrders = async () => {
  //       try {
  //         const response = await getOrders(pagination.currentPage, pagination.itemsPerPage);

  //         console.log('Orders API response:', response);

  //         if (response.success) {
  //           // Handle the actual API response structure
  //           let ordersData = [];
  //           if (response.data && response.data.docs && Array.isArray(response.data.docs)) {
  //             ordersData = response.data.docs;
  //           } else if (Array.isArray(response.data)) {
  //             ordersData = response.data;
  //           } else if (Array.isArray(response.result)) {
  //             ordersData = response.result;
  //           } else {
  //             console.warn('No valid orders array found in response:', response);
  //             ordersData = [];
  //           }

  //           console.log('Setting orders to:', ordersData);
  //           setOrders(ordersData);
  //           setPagination(prev => ({
  //             ...prev,
  //             totalPages: response.data?.totalPages || 1,
  //             totalItems: response.data?.totalDocs || 0,
  //           }));
  //         } else {
  //           message.error(response.message || "Failed to fetch orders");
  //         }
  //       } catch (error) {
  //         message.error("Error fetching orders");
  //         console.error("Error fetching orders:", error);
  //       }
  //     };

  //     fetchOrders();
  //   }, [pagination.currentPage, pagination.itemsPerPage, getOrders]);

  // Set dummy data on component mount
  useEffect(() => {
    setOrders(dummyOrders);
    setPagination((prev) => ({
      ...prev,
      totalPages: Math.ceil(dummyOrders.length / pagination.itemsPerPage),
      totalItems: dummyOrders.length,
    }));
  }, [dummyOrders, pagination.itemsPerPage]);

  // Handler for opening modal with row data
  const handleView = (row) => {
    setSelectedOrder(row);
    setModalOpen(true);
  };

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
      case "userName":
        return t("search.byUserName");
      case "providerName":
        return t("search.byProviderName");
      case "category":
        return t("search.byCategory");
      default:
        return t("search.byOrderId");
    }
  };

  // Filter orders based on search term and selected option
  const filteredOrders = Array.isArray(orders)
    ? orders.filter((order) => {
        if (!searchTerm) return true;

        const searchValue = searchTerm.toLowerCase();

        switch (searchOption) {
          case "orderId":
            return order.orderId?.toLowerCase().includes(searchValue) || false;
          case "userName":
            return order.userName?.toLowerCase().includes(searchValue) || false;
          case "providerName":
            return (
              order.providerName?.toLowerCase().includes(searchValue) || false
            );
          case "category":
            return order.category?.toLowerCase().includes(searchValue) || false;
          default:
            return (
              order.orderId?.toLowerCase().includes(searchValue) ||
              false ||
              order.userName?.toLowerCase().includes(searchValue) ||
              false ||
              order.providerName?.toLowerCase().includes(searchValue) ||
              false
            );
        }
      })
    : [];

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
              {t("table.view")}
            </button>
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
          {/* Header and Filters */}
          <div className="flex flex-col sm:flex-row justify-start mb-4">
            <div className="flex items-center bg-background-search rounded-l-full px-4 py-2 w-full sm:max-w-sm border border-border-search">
              <FaSearch className="text-[#81879D] mr-2" />
              <input
                type="text"
                placeholder={(() => {
                  switch (searchOption) {
                    case "orderId":
                      return t("search.searchOrderId");
                    case "userName":
                      return t("search.searchUserName");
                    case "providerName":
                      return t("search.searchProviderName");
                    case "category":
                      return t("search.searchCategory");
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
                    onClick={() => handleSearchOptionChange("userName")}
                  >
                    {t("search.byUserName")}
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleSearchOptionChange("providerName")}
                  >
                    {t("search.byProviderName")}
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleSearchOptionChange("category")}
                  >
                    {t("search.byCategory")}
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
            <DataTable columns={columnsWithView} data={filteredOrders} />
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
      {/* Side Modal for Order Details */}
      <SideModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t("orderDetail.title")}
        actions={
          <button
            className="w-full py-3 rounded-xl bg-accent text-white font-semibold text-lg"
            onClick={() => alert("Export functionality")}
          >
            {t("orderDetail.export")}
          </button>
        }
      >
        {selectedOrder && (
          <div>
            {/* Order Info Section */}
            <h3 className="text-lg font-semibold mb-4 text-text-primary">
              {t("orderDetail.orderInfo")}
            </h3>
            <div className="grid grid-cols-1 gap-4 mb-4 border-b pb-4">
              {/* Order ID and Order Date in same row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium text-text-primary">
                    {t("orderDetail.orderId")}:
                  </span>
                  <div className="text-text-secondary mt-1">
                    {selectedOrder.orderId}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-text-primary">
                    {t("orderDetail.orderDate")}
                  </span>
                  <div className="text-text-secondary mt-1">
                    {new Date(selectedOrder.date).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Address on its own row */}
              <div>
                <span className="font-medium text-text-primary">
                  {t("orderDetail.address")}:
                </span>
                <div className="text-text-secondary mt-1">
                  {selectedOrder.address ||
                    "House no 53, Street no 1, Area, City"}
                </div>
              </div>

              {/* Provider Name and Provider Contact Num in same row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium text-text-primary">
                    {t("orderDetail.providerName")}:
                  </span>
                  <div className="text-text-secondary mt-1">
                    {selectedOrder.providerName}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-text-primary">
                    {t("orderDetail.providerContactNum")}:
                  </span>
                  <div className="text-text-secondary mt-1">
                    {selectedOrder.providerContact || "+996 5xxxxxxxxxx"}
                  </div>
                </div>
              </div>

              {/* User Name and User Contact Num in same row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium text-text-primary">
                    {t("orderDetail.userName")}:
                  </span>
                  <div className="text-text-secondary mt-1">
                    {selectedOrder.userName}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-text-primary">
                    {t("orderDetail.userContactNum")}:
                  </span>
                  <div className="text-text-secondary mt-1">
                    {selectedOrder.userContact || "+996 5xxxxxxxxxx"}
                  </div>
                </div>
              </div>

              {/* Category and Status in same row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-medium text-text-primary">
                    {t("orderDetail.category")}:
                  </span>
                  <div className="text-text-secondary mt-1">
                    {selectedOrder.category}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-text-primary">
                    {t("orderDetail.status")}:
                  </span>
                  <div className="mt-1">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedOrder.status === "completed"
                          ? "bg-[#55CE631A] text-[#55CE63]"
                          : selectedOrder.status === "inProgress"
                          ? "bg-[#FFBC341A] text-[#FFBC34]"
                          : selectedOrder.status === "cancelled"
                          ? "bg-[#F62D511A] text-[#F62D51]"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {selectedOrder.status === "completed"
                        ? t("orderDetail.completed")
                        : selectedOrder.status === "inProgress"
                        ? t("orderDetail.inProgress")
                        : selectedOrder.status === "cancelled"
                        ? t("orderDetail.cancelled")
                        : t("orderDetail.unknown")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Info Section */}
            <h3 className="text-lg font-semibold mb-4 text-text-primary">
              {t("orderDetail.paymentInfo")}
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">Service Name:</span>
                <span className="text-text-secondary">50 SAR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Service Name:</span>
                <span className="text-text-secondary">50 SAR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Service Name:</span>
                <span className="text-text-secondary">50 SAR</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold text-text-primary">
                  {t("orderDetail.subTotal")}:
                </span>
                <span className="font-semibold text-text-primary">150 SAR</span>
              </div>
            </div>
          </div>
        )}
      </SideModal>
    </div>
  );
};

export default OrderManagement;
