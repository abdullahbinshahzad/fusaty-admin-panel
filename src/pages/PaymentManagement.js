import React, { useState, useEffect } from "react";
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

const PaymentManagement = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [payments, setPayments] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("user");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  //   const { getPayments } = useApi();
  const mode = useSelector((state) => state.theme.mode);

  // Define tabs inside component to access translation function
  const tabs = [t("tabs.all"), t("tabs.paid"), t("tabs.pending")];

  // Define columns inside component to access translation function
  const columns = [
    {
      key: "transactionId",
      title: t("table.transactionId"),
      render: (val) => (
        <span className="text-text-tablebody font-semibold">{val}</span>
      ),
    },
    {
      key: "orderId",
      title: t("table.orderId"),
      render: (val) => <span className="text-text-tablebody">{val}</span>,
    },
    {
      key: "user",
      title: t("table.user"),
      render: (val) => <span className="text-text-tablebody">{val}</span>,
    },
    {
      key: "provider",
      title: t("table.provider"),
      render: (val) => <span className="text-text-tablebody">{val}</span>,
    },
    {
      key: "method",
      title: t("table.method"),
      render: (val) => <span className="text-text-tablebody">{val}</span>,
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
      key: "amount",
      title: t("table.amount"),
      render: (val) => (
        <span className="text-text-tablebody font-semibold">{val} SAR</span>
      ),
    },
    {
      key: "status",
      title: t("table.status"),
      render: (val) => (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            val === "Successful"
              ? "bg-[#55CE631A] text-[#55CE63]"
              : val === "Pending"
              ? "bg-[#FFBC341A] text-[#FFBC34]"
              : val === "Failed"
              ? "bg-[#F62D511A] text-[#F62D51]"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {val}
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

  // Mock data for payments - replace with actual API call
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        // Mock data - replace with actual API call
        const mockPayments = [
          {
            _id: "1",
            transactionId: "TXN001",
            orderId: "ORD001",
            user: "John Doe",
            provider: "Mike Smith",
            method: "Payment via (8245)",
            date: "2024-01-15T10:30:00Z",
            amount: 50,
            status: "Successful",
            userEmail: "john@example.com",
            providerEmail: "mike@example.com",
            providerId: "PROV001",
            orderDate: "2024-01-15",
            category: "Home Services",
            serviceAmount: 50,
            commission: 5,
            transactionTime: "02:12 pm",
          },
          {
            _id: "2",
            transactionId: "TXN002",
            orderId: "ORD002",
            user: "Jane Wilson",
            provider: "Sarah Johnson",
            method: "Payment via (1234)",
            date: "2024-01-10T14:20:00Z",
            amount: 75,
            status: "Pending",
            userEmail: "jane@example.com",
            providerEmail: "sarah@example.com",
            providerId: "PROV002",
            orderDate: "2024-01-10",
            category: "Cleaning Services",
            serviceAmount: 75,
            commission: 7.5,
            transactionTime: "03:45 pm",
          },
          {
            _id: "3",
            transactionId: "TXN003",
            orderId: "ORD003",
            user: "Bob Brown",
            provider: "David Lee",
            method: "Payment via (5678)",
            date: "2024-01-20T09:15:00Z",
            amount: 120,
            status: "Failed",
            userEmail: "bob@example.com",
            providerEmail: "david@example.com",
            providerId: "PROV003",
            orderDate: "2024-01-20",
            category: "Plumbing",
            serviceAmount: 120,
            commission: 12,
            transactionTime: "11:30 am",
          },
        ];

        setPayments(mockPayments);
        setPagination((prev) => ({
          ...prev,
          totalPages: 1,
          totalItems: mockPayments.length,
        }));
      } catch (error) {
        message.error("Error fetching payments");
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  // Handler for opening modal with row data
  const handleView = (row) => {
    setSelectedPayment(row);
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
      case "user":
        return t("search.byUser");
      case "provider":
        return t("search.byProvider");
      case "orderId":
        return t("search.byOrderId");
      case "transactionId":
        return t("search.byTransactionId");
      default:
        return t("search.byUser");
    }
  };

  // Filter payments based on search term and selected option
  const filteredPayments = Array.isArray(payments)
    ? payments.filter((payment) => {
        if (!searchTerm) return true;

        const searchValue = searchTerm.toLowerCase();

        switch (searchOption) {
          case "user":
            return payment.user?.toLowerCase().includes(searchValue) || false;
          case "provider":
            return (
              payment.provider?.toLowerCase().includes(searchValue) || false
            );
          case "orderId":
            return (
              payment.orderId?.toLowerCase().includes(searchValue) || false
            );
          case "transactionId":
            return (
              payment.transactionId?.toLowerCase().includes(searchValue) ||
              false
            );
          default:
            return (
              payment.user?.toLowerCase().includes(searchValue) ||
              false ||
              payment.provider?.toLowerCase().includes(searchValue) ||
              false ||
              payment.orderId?.toLowerCase().includes(searchValue) ||
              false ||
              payment.transactionId?.toLowerCase().includes(searchValue) ||
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
                    case "user":
                      return t("search.searchUser");
                    case "provider":
                      return t("search.searchProvider");
                    case "orderId":
                      return t("search.searchOrderId");
                    case "transactionId":
                      return t("search.searchTransactionId");
                    default:
                      return t("search.searchUser");
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
                    onClick={() => handleSearchOptionChange("user")}
                  >
                    {t("search.byUser")}
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleSearchOptionChange("provider")}
                  >
                    {t("search.byProvider")}
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleSearchOptionChange("orderId")}
                  >
                    {t("search.byOrderId")}
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleSearchOptionChange("transactionId")}
                  >
                    {t("search.byTransactionId")}
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
            <DataTable columns={columnsWithView} data={filteredPayments} />
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
      {/* Side Modal for Payment Details */}
      <SideModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t("paymentDetail.title")}
        actions={
          <button
            className="w-full py-3 rounded-xl bg-accent text-white font-semibold text-lg"
            onClick={() =>
              alert("Export functionality would be implemented here")
            }
          >
            {t('paymentDetail.export')}
          </button>
        }
      >
        {selectedPayment && (
          <div>
            {/* User Info */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-text-primary">
              {t('paymentDetail.userInfo')}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-medium text-text-primary">
                  {t('paymentDetail.userName')} :
                  </div>
                  <div className="text-text-secondary">
                    {selectedPayment.user}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-text-primary">
                  {t('paymentDetail.userEmail')} :
                  </div>
                  <div className="text-text-secondary">
                    {selectedPayment.userEmail}
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-6"></div>

            {/* Provider Info */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-text-primary">
              {t('paymentDetail.providerInfo')}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-medium text-text-primary">
                  {t('paymentDetail.providerName')} :
                  </div>
                  <div className="text-text-secondary">
                    {selectedPayment.provider}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-text-primary">
                  {t('paymentDetail.providerEmail')} :
                  </div>
                  <div className="text-text-secondary">
                    {selectedPayment.providerEmail}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-text-primary">
                  {t('paymentDetail.providerId')} :
                  </div>
                  <div className="text-text-secondary">
                    {selectedPayment.providerId}
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-6"></div>

            {/* Order Info */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-text-primary">
              {t('paymentDetail.orderInfo')}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-medium text-text-primary">{t('paymentDetail.orderId')} :</div>
                  <div className="text-text-secondary">
                    {selectedPayment.orderId}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-text-primary">
                  {t('paymentDetail.orderDate')} :
                  </div>
                  <div className="text-text-secondary">
                    {selectedPayment.orderDate}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-text-primary">{t('paymentDetail.category')} :</div>
                  <div className="text-text-secondary">
                    {selectedPayment.category}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-text-primary">{t('paymentDetail.status')} :</div>
                  <div>
                    <span className="text-green-600 font-semibold">
                      Completed
                    </span>
                  </div>
                </div>
                <div>
                  <div className="font-medium text-text-primary">
                  {t('paymentDetail.paymentMethod')} :
                  </div>
                  <div className="text-text-secondary">
                    {selectedPayment.method}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-text-primary">
                  {t('paymentDetail.paymentDate')} :
                  </div>
                  <div className="text-text-secondary">
                    {selectedPayment.orderDate}
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 mb-6"></div>

            {/* Payment Summary */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-text-primary">
              {t('paymentDetail.paymentSummary')}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-medium text-text-primary">
                  {t('paymentDetail.serviceAmount')} :
                  </div>
                  <div className="text-text-secondary">
                    {selectedPayment.serviceAmount} SAR
                  </div>
                </div>
                <div>
                  <div className="font-medium text-text-primary">
                  {t('paymentDetail.fusatyCommission')} :
                  </div>
                  <div className="text-text-secondary">
                    {selectedPayment.commission} SAR
                  </div>
                </div>
                <div>
                  <div className="font-medium text-text-primary">
                  {t('paymentDetail.transactionTime')}:
                  </div>
                  <div className="text-text-secondary">
                    {selectedPayment.transactionTime}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-text-primary">
                  {t('paymentDetail.paymentStatus')}:
                  </div>
                  <div>
                    <span className="text-green-600 font-semibold">
                      {selectedPayment.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </SideModal>
    </div>
  );
};

export default PaymentManagement;
