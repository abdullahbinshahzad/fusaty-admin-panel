import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { applyTheme } from "../utils/theme";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import DataTable from "../components/common/DataTable";
import { FaSearch, FaChevronDown, FaUpload } from "react-icons/fa";
import SideModal from "../components/common/SideModal";
// import { useApi } from "../hooks/useApi";
// import { message } from "antd";

const SubCategoryManagement = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  //   const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("name");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: "",
    subCategoryName: "",
    subSubCategoryName: "",
    status: "",
    subCategoryIcon: null,
  });
  //   const { getSubCategories, createSubCategory, updateSubCategory, deleteSubCategory } = useApi();
  const mode = useSelector((state) => state.theme.mode);

  // Define tabs inside component to access translation function
  const tabs = [t("tabs.all"), t("tabs.active"), t("tabs.inactive")];

  //   Use dummy data for development
  const subCategoriesData = useMemo(
    () => [
      {
        _id: "1",
        categoryName: "Home Services",
        subCategoryName: "Cleaning",
        subSubCategoryName: "House Cleaning",
        totalProviders: 25,
        totalOrders: 150,
        lastUpdated: "2024-01-15T10:30:00Z",
        status: "active",
        subCategoryIcon: null,
      },
      {
        _id: "2",
        categoryName: "Home Services",
        subCategoryName: "Repair",
        subSubCategoryName: "Plumbing",
        totalProviders: 18,
        totalOrders: 89,
        lastUpdated: "2024-01-10T14:20:00Z",
        status: "inactive",
        subCategoryIcon: null,
      },
      {
        _id: "3",
        categoryName: "Kitchen Services",
        subCategoryName: "Cooking",
        subSubCategoryName: "Meal Preparation",
        totalProviders: 10,
        totalOrders: 100,
        lastUpdated: "2024-01-20T09:15:00Z",
        status: "active",
        subCategoryIcon: null,
      },
      {
        _id: "4",
        categoryName: "Beauty & Wellness",
        subCategoryName: "Hair Care",
        subSubCategoryName: "Hair Styling",
        totalProviders: 32,
        totalOrders: 234,
        lastUpdated: "2024-01-20T09:15:00Z",
        status: "inactive",
        subCategoryIcon: null,
      },
    ],
    []
  );

  // Define columns inside component to access translation function
  const columns = [
    {
      key: "categoryName",
      title: t("table.categoryName"),
      render: (val) => (
        <span className="text-text-tablebody font-semibold">{val}</span>
      ),
    },
    {
      key: "subCategoryName",
      title: t("table.subCategory"),
      render: (val) => (
        <span className="text-text-tablebody">{val || "N/A"}</span>
      ),
    },
    {
      key: "subSubCategoryName",
      title: t("table.sub_to_subCategory"),
      render: (val) => (
        <span className="text-text-tablebody">{val || "N/A"}</span>
      ),
    },
    {
      key: "totalProviders",
      title: t("table.totalProviders"),
      render: (val) => <span className="text-text-tablebody">{val || 0}</span>,
    },
    {
      key: "totalOrders",
      title: t("table.totalOrders"),
      render: (val) => <span className="text-text-tablebody">{val || 0}</span>,
    },
    {
      key: "lastUpdated",
      title: t("table.lastUpdated"),
      render: (val) => (
        <span className="text-text-tablebody">
          {val ? new Date(val).toLocaleDateString() : "N/A"}
        </span>
      ),
    },
    {
      key: "status",
      title: t("table.status"),
      render: (val) => (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            val === "active"
              ? "bg-[#55CE631A] text-[#55CE63]"
              : val === "inactive"
              ? "bg-[#FFBC341A] text-[#FFBC34]"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {val === "active"
            ? "Active"
            : val === "inactive"
            ? "Inactive"
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

  // Fetch subCategories on component mount and when pagination changes
  //   useEffect(() => {
  //     const fetchSubCategories = async () => {
  //       try {
  //         const response = await getSubCategories(pagination.currentPage, pagination.itemsPerPage);

  //         console.log('SubCategories API response:', response);

  //         if (response.success) {
  //           // Handle the actual API response structure
  //           let subCategoriesData = [];
  //           if (response.data && response.data.docs && Array.isArray(response.data.docs)) {
  //             subCategoriesData = response.data.docs;
  //           } else if (Array.isArray(response.data)) {
  //             subCategoriesData = response.data;
  //           } else if (Array.isArray(response.result)) {
  //             subCategoriesData = response.result;
  //           } else {
  //             console.warn('No valid subCategories array found in response:', response);
  //           }

  //           console.log('Setting subCategories to:', subCategoriesData);
  //           setSubCategories(subCategoriesData);
  //           setPagination(prev => ({
  //             ...prev,
  //             totalPages: response.data?.totalPages || 1,
  //             totalItems: response.data?.totalDocs || subCategoriesData.length,
  //           }));
  //         } else {
  //           message.error(response.message || "Failed to fetch subCategories");
  //         }
  //       } catch (error) {
  //         message.error("Error fetching subCategories");
  //         console.error("Error fetching subCategories:", error);
  //       }
  //     };

  //     fetchSubCategories();
  //   }, [pagination.currentPage, pagination.itemsPerPage, getSubCategories]);

  // Set dummy data on component mount
  useEffect(() => {
    setSubCategories(subCategoriesData);
    setPagination((prev) => ({
      ...prev,
      totalPages: Math.ceil(subCategoriesData.length / pagination.itemsPerPage),
      totalItems: subCategoriesData.length,
    }));
  }, [subCategoriesData, pagination.itemsPerPage]);

  // Handler for opening modal with row data
  const handleEdit = (row) => {
    // setSelectedSubCategory(row);
    setFormData({
      categoryName: row.categoryName || "",
      subCategoryName: row.subCategoryName || "",
      subSubCategoryName: row.subSubCategoryName || "",
      status: row.status || "",
      subCategoryIcon: row.subCategoryIcon,
    });
    setIsEditing(true);
    setModalOpen(true);
  };

  // Handler for deleting a subCategory
  //   const handleDelete = async (subCategoryId) => {
  //     try {
  //       const response = await deleteSubCategory(subCategoryId);

  //       if (response.success) {
  //         message.success("SubCategory deleted successfully!");

  //         // Remove the subCategory from the subCategories array
  //         setSubCategories((prevSubCategories) =>
  //           prevSubCategories.filter((subCategory) => subCategory._id !== subCategoryId)
  //         );
  //       } else {
  //         message.error(response.message || "Failed to delete subCategory");
  //       }
  //     } catch (error) {
  //       message.error("Error deleting subCategory");
  //       console.error("Error deleting subCategory:", error);
  //     }
  //   };

  // Handler for saving subCategory (create or update)
  //   const handleSaveSubCategory = async () => {
  //     try {
  //       let response;

  //       if (isEditing && selectedSubCategory) {
  //         response = await updateSubCategory(selectedSubCategory._id, formData);
  //         if (response.success) {
  //           message.success("SubCategory updated successfully!");

  //           // Update the subCategory in the subCategories array
  //           setSubCategories((prevSubCategories) =>
  //             prevSubCategories.map((subCategory) =>
  //               subCategory._id === selectedSubCategory._id
  //                 ? { ...subCategory, ...formData }
  //                 : subCategory
  //             )
  //           );
  //         }
  //       } else {
  //         response = await createSubCategory(formData);
  //         if (response.success) {
  //           message.success("SubCategory created successfully!");

  //           // Add the new subCategory to the subCategories array
  //           const newSubCategory = {
  //             _id: response.data?._id || Date.now().toString(),
  //             ...formData,
  //           };
  //           setSubCategories((prevSubCategories) => [newSubCategory, ...prevSubCategories]);
  //         }
  //       }

  //       if (response.success) {
  //         setModalOpen(false);
  //         setSelectedSubCategory(null);
  //         setIsEditing(false);
  //         setFormData({
  //           categoryName: "",
  //           subCategoryName: "",
  //           subSubCategoryName: "",
  //           status: "",
  //           subCategoryIcon: null,
  //         });
  //       } else {
  //         message.error(response.message || "Failed to save subCategory");
  //       }
  //     } catch (error) {
  //       message.error("Error saving subCategory");
  //       console.error("Error saving subCategory:", error);
  //     }
  //   };

  // Handler for opening add new subCategory modal
  const handleAddNew = () => {
    // setSelectedSubCategory(null);
    setIsEditing(false);
    setFormData({
      categoryName: "",
      subCategoryName: "",
      subSubCategoryName: "",
      status: "",
      subCategoryIcon: null,
    });
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
      case "name":
        return t("search.byCategory");
      case "subCategory":
        return t("search.bySubCategory");
      case "status":
        return t("search.byStatus");
      default:
        return t("search.byCategory");
    }
  };

  // Filter subCategories based on search term and selected option
  const filteredSubCategories = Array.isArray(subCategories)
    ? subCategories.filter((subCategory) => {
        if (!searchTerm) return true;

        const searchValue = searchTerm.toLowerCase();

        switch (searchOption) {
          case "name":
            return (
              subCategory.categoryName?.toLowerCase().includes(searchValue) ||
              false
            );
          case "subCategory":
            return (
              subCategory.subCategoryName?.toLowerCase().includes(searchValue) ||
              false
            );
          case "status":
            return (
              subCategory.status?.toLowerCase().includes(searchValue) || false
            );
          default:
            return (
              subCategory.categoryName?.toLowerCase().includes(searchValue) ||
              false ||
              subCategory.subCategoryName?.toLowerCase().includes(searchValue) ||
              false
            );
        }
      })
    : [];

  // Columns with updated Edit/Delete buttons
  const columnsWithActions = columns.map((col) => {
    if (col.key === "action") {
      return {
        ...col,
        render: (_, row) => (
          <div className="flex gap-4 items-center">
            <button
              className="text-text-tableactionbtn hover:underline"
              onClick={() => handleEdit(row)}
            >
              {t("table.edit")}
            </button>
            <button
              className="text-red-600 hover:underline"
              // onClick={() => handleDelete(row._id)}
            >
              {t("table.delete")}
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
          {/* Add SubCategory Button - positioned to the right */}
          <div className="flex justify-end -mb-10">
            <button
              onClick={handleAddNew}
              className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-semibold"
            >
              {t("buttons.addNewSubCategory")}
            </button>
          </div>
          {/* Header and Filters */}
          <div className="flex justify-start mb-4">
            <div className="flex items-center bg-background-search rounded-l-full px-4 py-2 w-full max-w-sm sm:max-w-sm md:max-w-sm border border-border-search">
              <FaSearch className="text-[#81879D] mr-2" />
              <input
                type="text"
                placeholder={(() => {
                  switch (searchOption) {
                    case "name":
                      return t("search.searchCategory");
                    case "subCategory":
                      return t("search.searchSubCategory");
                    case "status":
                      return t("search.searchStatus");
                    default:
                      return t("search.searchCategory");
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
                    onClick={() => handleSearchOptionChange("name")}
                  >
                    {t("search.byCategory")}
                  </div>
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleSearchOptionChange("subCategory")}
                  >
                    {t("search.bySubCategory")}
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
            <DataTable columns={columnsWithActions} data={filteredSubCategories} />
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
      {/* Side Modal for SubCategory Details */}
      <SideModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          isEditing
            ? t("subCategoryDetail.editTitle")
            : t("subCategoryDetail.addTitle")
        }
        actions={
          <div className="flex gap-4 items-center">
            <button
              className="w-full py-3 rounded-xl bg-accent text-white font-semibold text-lg"
              // onClick={handleSaveSubCategory}
            >
              {isEditing
                ? t("subCategoryDetail.update")
                : t("subCategoryDetail.save")}
            </button>
            <button
              className="w-full py-3 rounded-xl text-text-primary font-semibold text-lg bg-transparent mt-2"
              onClick={() => setModalOpen(false)}
            >
              {t("subCategoryDetail.cancel")}
            </button>
          </div>
        }
      >
        <div>
          {/* SubCategory Icon Upload */}
          <div className="mb-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-accent transition-colors">
              <FaUpload className="mx-auto text-3xl text-gray-400 mb-2" />
              <p className="text-gray-600">{t("subCategoryDetail.upload")}</p>
              <p className="text-sm text-gray-500 mt-1">
                {t("subCategoryDetail.uploadTagline")}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {t("subCategoryDetail.categoryName")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Category Name"
                value={formData.categoryName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    categoryName: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {t("subCategoryDetail.subCategoryName")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter SubCategory Name"
                value={formData.subCategoryName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    subCategoryName: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {t("subCategoryDetail.sub_to_subCategoryName")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Sub-To-SubCategory Name"
                value={formData.subSubCategoryName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    subSubCategoryName: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {t("subCategoryDetail.status")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, status: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="">{t("subCategoryDetail.chooseStatus")}</option>
                <option value="active">{t("subCategoryDetail.active")}</option>
                <option value="inactive">{t("subCategoryDetail.inActive")}</option>
              </select>
            </div>
          </div>
        </div>
      </SideModal>
    </div>
  );
};

export default SubCategoryManagement;
