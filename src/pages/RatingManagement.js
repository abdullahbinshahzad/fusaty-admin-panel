import { useMemo, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { applyTheme } from "../utils/theme";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import DataTable from "../components/common/DataTable";
import { FaSearch, FaChevronDown, FaStar } from "react-icons/fa";
import SideModal from "../components/common/SideModal";
// import { useApi } from "../hooks/useApi";
import { message } from "antd";

const RatingManagement = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("user");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [ratingFilter, setRatingFilter] = useState("all");
  const [ratingDropdownOpen, setRatingDropdownOpen] = useState(false);
  //   const { getRatings, approveRating, rejectRating } = useApi();
  const mode = useSelector((state) => state.theme.mode);
  const ratingDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ratingDropdownRef.current &&
        !ratingDropdownRef.current.contains(event.target)
      ) {
        setRatingDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Define tabs inside component to access translation function
  const tabs = [
    t("tabs.all"),
    t("tabs.approved"),
    t("tabs.pending"),
    t("tabs.rejected"),
  ];

  // Rating filter options
  const ratingOptions = [
    { value: "all", label: t("rating.all") },
    { value: "5", label: t("rating.fiveStars") },
    { value: "4", label: t("rating.fourStars") },
    { value: "3", label: t("rating.threeStars") },
    { value: "2", label: t("rating.twoStars") },
    { value: "1", label: t("rating.oneStar") },
  ];

  const ratingsData = useMemo(
    () => [
      {
        _id: "1",
        userName: "John Doe",
        providerName: "Mike Smith",
        rating: 5,
        date: "2024-01-15T10:30:00Z",
        status: "Approved",
        review:
          "The electrician arrived on time and was very professional. He completed the job quickly and cleaned up afterward. Highly recommend!",
      },
      {
        _id: "2",
        userName: "Jane Wilson",
        providerName: "Sarah Johnson",
        rating: 4,
        date: "2024-01-10T14:20:00Z",
        status: "Pending",
        review:
          "Good service but took longer than expected. The quality was satisfactory.",
      },
      {
        _id: "3",
        userName: "Bob Brown",
        providerName: "David Lee",
        rating: 3,
        date: "2024-01-20T09:15:00Z",
        status: "Rejected",
        review:
          "Service was okay but not worth the price. Would not recommend.",
      },
    ],
    []
  );

  // Helper function to render stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-[#FDB022] w-4 h-4" />);
      } else {
        stars.push(<FaStar key={i} className="text-[#F5F5F5] w-4 h-4" />);
      }
    }
    return <div className="flex gap-0.5">{stars}</div>;
  };

  // Define columns inside component to access translation function
  const columns = [
    {
      key: "userName",
      title: t("table.user"),
      render: (val) => (
        <span className="text-text-tablebody font-semibold">{val}</span>
      ),
    },
    {
      key: "providerName",
      title: t("table.provider"),
      render: (val) => (
        <span className="text-text-tablebody font-semibold">{val}</span>
      ),
    },
    {
      key: "rating",
      title: t("table.rating"),
      render: (val) => (
        <div className="flex items-center gap-2">
          {renderStars(val)}
          <span className="text-text-tablebody text-sm">({val})</span>
        </div>
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
            val === "Approved"
              ? "bg-[#55CE631A] text-[#55CE63]"
              : val === "Pending"
              ? "bg-[#FFBC341A] text-[#FFBC34]"
              : val === "Rejected"
              ? "bg-[#F62D511A] text-[#F62D51]"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {val}
        </span>
      ),
    },
    {
      key: "review",
      title: t("table.review"),
      render: (val) => (
        <span className="text-text-tablebody text-sm">
          {val && val.length > 50 ? `${val.substring(0, 50)}...` : val}
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

  // Fetch ratings on component mount and when pagination changes
  //   useEffect(() => {
  //     const fetchRatings = async () => {
  //       try {
  //         const response = await getRatings(pagination.currentPage, pagination.itemsPerPage);

  //         console.log('Ratings API response:', response);

  //         if (response.success) {
  //           // Handle the actual API response structure
  //           let ratingsData = [];
  //           if (response.data && response.data.docs && Array.isArray(response.data.docs)) {
  //             ratingsData = response.data.docs;
  //           } else if (Array.isArray(response.data)) {
  //             ratingsData = response.data;
  //           } else if (Array.isArray(response.result)) {
  //             ratingsData = response.result;
  //           } else {
  //             console.warn('No valid ratings array found in response:', response);
  //           }

  //           console.log('Setting ratings to:', ratingsData);
  //           setRatings(ratingsData);
  //           setPagination(prev => ({
  //             ...prev,
  //             totalPages: response.data?.totalPages || 1,
  //             totalItems: response.data?.totalDocs || ratingsData.length,
  //           }));
  //         } else {
  //           message.error(response.message || "Failed to fetch ratings");
  //         }
  //       } catch (error) {
  //         message.error("Error fetching ratings");
  //         console.error("Error fetching ratings:", error);
  //       }
  //     };

  //     fetchRatings();
  //   }, [pagination.currentPage, pagination.itemsPerPage, getRatings]);

  // Set dummy data on component mount
  useEffect(() => {
    setRatings(ratingsData);
    setPagination((prev) => ({
      ...prev,
      totalPages: Math.ceil(ratingsData.length / pagination.itemsPerPage),
      totalItems: ratingsData.length,
    }));
  }, [ratingsData, pagination.itemsPerPage]);

  // Handler for opening modal with row data
  const handleView = (row) => {
    setSelectedRating(row);
    setModalOpen(true);
  };

  // Handler for approving a rating
  const handleApprove = async (ratingId) => {
    message.success("Rating approved successfully!");
    //     try {
    //       const response = await approveRating(ratingId);

    //       if (response.success) {
    //         message.success("Rating approved successfully!");

    //         // Update the specific rating in the ratings array
    //         setRatings(prevRatings =>
    //           prevRatings.map(rating =>
    //             rating._id === ratingId
    //               ? { ...rating, status: "Approved" }
    //               : rating
    //           )
    //         );

    //         // If the modal is open and we're approving the selected rating, update it too
    //         if (selectedRating && selectedRating._id === ratingId) {
    //           setSelectedRating(prev => ({ ...prev, status: "Approved" }));
    //         }
    //       } else {
    //         message.error(response.message || "Failed to approve rating");
    //       }
    //     } catch (error) {
    //       message.error("Error approving rating");
    //       console.error("Error approving rating:", error);
    //     }
  };

  // Handler for rejecting a rating
  const handleReject = async (ratingId) => {
    message.success("Rating rejected successfully!");
    //     try {
    //       const response = await rejectRating(ratingId);

    //       if (response.success) {
    //         message.success("Rating rejected successfully!");

    //         // Update the specific rating in the ratings array
    //         setRatings(prevRatings =>
    //           prevRatings.map(rating =>
    //             rating._id === ratingId
    //               ? { ...rating, status: "Rejected" }
    //               : rating
    //           )
    //         );

    //         // If the modal is open and we're rejecting the selected rating, update it too
    //         if (selectedRating && selectedRating._id === ratingId) {
    //           setSelectedRating(prev => ({ ...prev, status: "Rejected" }));
    //         }
    //       } else {
    //         message.error(response.message || "Failed to reject rating");
    //       }
    //     } catch (error) {
    //       message.error("Error rejecting rating");
    //       console.error("Error rejecting rating:", error);
    //     }
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
      case "rating":
        return t("search.byRating");
      case "status":
        return t("search.byStatus");
      default:
        return t("search.byUser");
    }
  };

  // Filter ratings based on search term and selected option
  const filteredRatings = Array.isArray(ratings)
    ? ratings.filter((rating) => {
        if (!searchTerm) return true;

        const searchValue = searchTerm.toLowerCase();

        switch (searchOption) {
          case "user":
            return (
              rating.userName?.toLowerCase().includes(searchValue) || false
            );
          case "provider":
            return (
              rating.providerName?.toLowerCase().includes(searchValue) || false
            );
          case "rating":
            return rating.rating?.toString().includes(searchValue) || false;
          case "status":
            return rating.status?.toLowerCase().includes(searchValue) || false;
          default:
            return (
              rating.userName?.toLowerCase().includes(searchValue) ||
              false ||
              rating.providerName?.toLowerCase().includes(searchValue) ||
              false ||
              rating.review?.toLowerCase().includes(searchValue) ||
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
            <button
              className="text-text-tableactionbtn hover:underline"
              onClick={() => handleView(row)}
            >
              {t("table.view")}
            </button>
            <button
              className="text-[#00B050] hover:underline"
              onClick={() => handleApprove(row._id)}
            >
              {t("table.approve")}
            </button>
            <button
              className="text-[#FF0000] hover:underline"
              onClick={() => handleReject(row._id)}
            >
              {t("table.reject")}
            </button>
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
          <div className="flex justify-start mb-4">
            <div className="flex items-center bg-background-search rounded-l-full px-4 py-2 w-full max-w-sm sm:max-w-sm md:max-w-sm border border-border-search">
              <FaSearch className="text-[#81879D] mr-2" />
              <input
                type="text"
                placeholder={(() => {
                  switch (searchOption) {
                    case "user":
                      return t("search.searchUser");
                    case "provider":
                      return t("search.searchProvider");
                    case "rating":
                      return t("search.searchRating");
                    case "status":
                      return t("search.searchStatus");
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
              className="relative flex items-center bg-background-search rounded-r-full px-4 py-2 w-full md:w-1/6 border-l border-l-searchbar-divider border-r border-r-border-search border-y border-y-border-search cursor-pointer"
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
                    onClick={() => handleSearchOptionChange("rating")}
                  >
                    {t("search.byRating")}
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

          {/* Rating Dropdown */}
          <div className="flex justify-end -mt-[14px] -mb-8">
            <div className="relative" ref={ratingDropdownRef}>
              <button
                onClick={() => setRatingDropdownOpen(!ratingDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-[#ffffff00] border border-border-input rounded-full text-sm font-medium text-text-primary hover:bg-background-card transition-colors duration-200"
              >
                <FaStar className="text-[#FDB022] w-4 h-4" />
                <span className="hidden sm:inline">
                  {ratingOptions.find((option) => option.value === ratingFilter)
                    ?.label || "Rating"}
                </span>
                <span className="sm:hidden">Rating</span>
                <FaChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    ratingDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {ratingDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-background-card border border-border-input rounded-lg shadow-lg z-10">
                  {ratingOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setRatingFilter(option.value);
                        setRatingDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-background-filter transition-colors duration-200 ${
                        ratingFilter === option.value
                          ? "text-accent bg-background-filter"
                          : "text-text-primary"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
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
            <DataTable columns={columnsWithActions} data={filteredRatings} />
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
      {/* Side Modal for Rating Details */}
      <SideModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={t("modal.reviewDetail")}
        actions={
          selectedRating && (
            <>
              <button
                className="w-full py-3 rounded-xl bg-[#02B856] text-white font-semibold text-lg"
                onClick={() => handleApprove(selectedRating._id)}
              >
                {t("modal.approve")}
              </button>
              <div className="flex gap-3 mt-2">
                <button
                  className="w-1/2 py-3 rounded-xl text-text-primary font-semibold text-lg bg-transparent"
                  onClick={() =>
                    alert("Delete functionality to be implemented")
                  }
                >
                  {t("modal.delete")}
                </button>
                <button
                  className="w-1/2 py-3 rounded-xl border border-[#FF4D4F] text-[#FF4D4F] font-semibold text-lg bg-transparent"
                  onClick={() => handleReject(selectedRating._id)}
                >
                  {t("modal.reject")}
                </button>
              </div>
            </>
          )
        }
      >
        {selectedRating && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="font-medium text-text-primary">{t("modal.userName")} :</div>
                <div className="text-text-secondary">
                  {selectedRating.userName}
                </div>
              </div>
              <div>
                <div className="font-medium text-text-primary">
                  {t("modal.providerName")} :
                </div>
                <div className="text-text-secondary">
                  {selectedRating.providerName}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <div className="font-medium text-text-primary mb-2">{t("modal.review")} :</div>
              <div className="text-text-secondary text-sm leading-relaxed">
                {selectedRating.review}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="mb-4">
                <div className="font-medium text-text-primary mb-2">
                  {t("modal.ratings")} :
                </div>
                <div className="flex items-center gap-2">
                  {renderStars(selectedRating.rating)}
                  <span className="text-text-secondary text-sm">
                    ({selectedRating.rating})
                  </span>
                </div>
              </div>
              <div>
                <div className="font-medium text-text-primary mb-2">
                  {t("modal.status")} :
                </div>
                <div>
                  <span
                    className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
                      selectedRating.status === "Approved"
                        ? "bg-[#55CE631A] text-[#55CE63]"
                        : selectedRating.status === "Pending"
                        ? "bg-[#FFBC341A] text-[#FFBC34]"
                        : selectedRating.status === "Rejected"
                        ? "bg-[#F62D511A] text-[#F62D51]"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {selectedRating.status}
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

export default RatingManagement;
