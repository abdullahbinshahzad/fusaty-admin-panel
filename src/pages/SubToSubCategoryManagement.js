import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { applyTheme } from "../utils/theme";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";
import DataTable from "../components/common/DataTable";
import { FaSearch, FaChevronDown, FaUpload } from "react-icons/fa";
import SideModal from "../components/common/SideModal";
import { useApi } from "../hooks/useApi";
import { message, Select } from "antd";

const SubToSubCategoryManagement = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  //   const [selectedSubSubCategory, setSelectedSubSubCategory] = useState(null);
  const [selectedSubToSubCategory, setSelectedSubToSubCategory] = useState(null);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
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
    subCategoryName: "",
    subSubCategoryName: "",
    status: "",
    subSubCategoryIcon: null,
    description: "",
  });
  const fileInputRef = useRef(null);
  const { getCategories, uploadFile, createSubToSubCategory, updateSubToSubCategory, deleteSubToSubCategory } = useApi();
  const mode = useSelector((state) => state.theme.mode);

  // Define tabs inside component to access translation function
  const tabs = [t("tabs.all"), t("tabs.active"), t("tabs.inactive")];

  // Define columns inside component to access translation function
  const columns = [
    {
      key: "name",
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
      key: "updatedAt",
      title: t("table.lastUpdated"),
      render: (val) => (
        <span className="text-text-tablebody">
          {val ? new Date(val).toLocaleDateString() : "N/A"}
        </span>
      ),
    },
    {
      key: "isActive",
      title: t("table.status"),
      render: (val) => (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            val === true
              ? "bg-[#55CE631A] text-[#55CE63]"
              : val === false
              ? "bg-[#FFBC341A] text-[#FFBC34]"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {val === true
            ? "Active"
            : val === false
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

  // Fetch categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories(1, 100, 1, true); // Get all sub-categories
        if (response.data && Array.isArray(response.data)) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories for dropdown:", error);
      }
    };

    fetchCategories();
  }, [getCategories]);

  // Fetch subSubCategories on component mount and when pagination changes
  useEffect(() => {
    const fetchSubSubCategories = async () => {
      try {
        const response = await getCategories(pagination.currentPage, pagination.itemsPerPage, 2, true);

        console.log('SubSubCategories API response:', response);

        if (response.data && Array.isArray(response.data)) {
          console.log('Setting subSubCategories to:', response.data);
          setSubSubCategories(response.data);
          setPagination(prev => ({
            ...prev,
            totalPages: response.meta?.totalPages || 1,
            totalItems: response.meta?.total || 0,
          }));
        } else {
          message.error("Failed to fetch subSubCategories");
        }
      } catch (error) {
        message.error("Error fetching subSubCategories");
        console.error("Error fetching subSubCategories:", error);
      }
    };

    fetchSubSubCategories();
  }, [pagination.currentPage, pagination.itemsPerPage, getCategories]);

  // Handler for deleting a subToSubCategory
  const handleDelete = async (subToSubCategoryId) => {
    try {
      const response = await deleteSubToSubCategory(subToSubCategoryId);

      if (response.success) {
        message.success("Sub-to-sub-category deleted successfully!");

        // Remove the sub-to-sub-category from the subSubCategories array
        setSubSubCategories((prevSubSubCategories) =>
          prevSubSubCategories.filter((subToSubCategory) => subToSubCategory._id !== subToSubCategoryId)
        );
      } else {
        message.error(response.message || "Failed to delete sub-to-sub-category");
      }
    } catch (error) {
      message.error("Error deleting sub-to-sub-category");
      console.error("Error deleting sub-to-sub-category:", error);
    }
  };

  // Handler for opening modal with row data
  const handleEdit = (row) => {
    console.log('=== EDIT SUB-TO-SUB-CATEGORY STARTED ===');
    console.log('Row data:', row);
    console.log('Row parent:', row.parent);
    console.log('Available sub-categories:', categories);
    
    // Find the sub-category name using the parent ID
    const parentSubCategory = categories.find(cat => cat._id === row.parent);
    const subCategoryName = parentSubCategory ? parentSubCategory.name : "";
    
    console.log('Parent sub-category found:', parentSubCategory);
    console.log('Sub-category name to set:', subCategoryName);
    
    setSelectedSubToSubCategory(row);
    setFormData({
      categoryName: row.categoryName || "",
      subCategoryName: subCategoryName,
      subSubCategoryName: row.name || row.subSubCategoryName || "",
      description: row.description || "",
      status: row.isActive ? "active" : "inactive",
      subSubCategoryIcon: row.imageUrl,
    });
    
    console.log('Form data after setFormData:', {
      categoryName: row.categoryName || "",
      subCategoryName: subCategoryName,
      subSubCategoryName: row.name || row.subSubCategoryName || "",
      description: row.description || "",
      status: row.isActive ? "active" : "inactive",
      subSubCategoryIcon: row.imageUrl,
    });
    
    setIsEditing(true);
    setModalOpen(true);
  };

  // Handler for saving subToSubCategory (create or update)
  const handleSaveSubToSubCategory = async () => {
    try {
      // Validate required fields
      if (!formData.subCategoryName) {
        message.error("Please select a sub-category");
        return;
      }
      if (!formData.subSubCategoryName.trim()) {
        message.error("Sub-to-sub-category name is required");
        return;
      }
      if (!formData.description.trim()) {
        message.error("Description is required");
        return;
      }
      if (!formData.subSubCategoryIcon) {
        message.error("Sub-to-sub-category icon is required");
        return;
      }

      let response;

      if (isEditing && selectedSubToSubCategory) {
        // Update existing sub-to-sub-category
        const subToSubCategoryData = {
          name: formData.subSubCategoryName.trim(),
          description: formData.description.trim(),
          imageUrl: formData.subSubCategoryIcon,
        };

        response = await updateSubToSubCategory(selectedSubToSubCategory._id, subToSubCategoryData);
        
        if (response.success || response.data) {
          message.success("Sub-to-sub-category updated successfully!");

          // Update the sub-to-sub-category in the subSubCategories array
          setSubSubCategories((prevSubSubCategories) =>
            prevSubSubCategories.map((subToSubCategory) =>
              subToSubCategory._id === selectedSubToSubCategory._id
                ? { ...subToSubCategory, ...subToSubCategoryData }
                : subToSubCategory
            )
          );
        }
      } else {
        // Find the selected sub-category to get its ID
        const selectedSubCategory = categories.find(cat => cat.name === formData.subCategoryName);
        if (!selectedSubCategory) {
          message.error("Selected sub-category not found");
          return;
        }

        // Create new sub-to-sub-category
        const subToSubCategoryData = {
          name: formData.subSubCategoryName.trim(),
          description: formData.description.trim(),
          imageUrl: formData.subSubCategoryIcon,
        };

        response = await createSubToSubCategory(selectedSubCategory._id, subToSubCategoryData);
        
        if (response.success || response.data) {
          message.success("Sub-to-sub-category created successfully!");

          // Add the new sub-to-sub-category to the subSubCategories array
          const newSubToSubCategory = {
            _id: response.data?._id || response._id || Date.now().toString(),
            name: formData.subSubCategoryName,
            description: formData.description,
            imageUrl: formData.subSubCategoryIcon,
            subCategoryName: formData.subCategoryName,
            isActive: true,
            createdAt: new Date().toISOString(),
          };
          setSubSubCategories((prevSubSubCategories) => [newSubToSubCategory, ...prevSubSubCategories]);
        }
      }

      if (response && !response?.message) {
        setModalOpen(false);
        setIsEditing(false);
        setSelectedSubToSubCategory(null);
        setFormData({
          categoryName: "",
          subCategoryName: "",
          subSubCategoryName: "",
          status: "",
          subSubCategoryIcon: null,
          description: "",
        });
        // Refresh the sub-to-sub-categories list
        const fetchSubSubCategories = async () => {
          try {
            const response = await getCategories(pagination.currentPage, pagination.itemsPerPage, 2, true);
            if (response.data && Array.isArray(response.data)) {
              setSubSubCategories(response.data);
            }
          } catch (error) {
            console.error("Error refreshing sub-to-sub-categories:", error);
          }
        };
        fetchSubSubCategories();
      } else {
        message.error(response?.message || "Failed to save sub-to-sub-category");
      }
    } catch (error) {
      message.error("Error saving sub-to-sub-category");
      console.error("Error saving sub-to-sub-category:", error);
    }
  };

  // Handler for opening add new subSubCategory modal
  const handleAddNew = () => {
    // setSelectedSubSubCategory(null);
    setSelectedSubToSubCategory(null);
    setIsEditing(false);
    setFormData({
      categoryName: "",
      subCategoryName: "",
      subSubCategoryName: "",
      status: "",
      subSubCategoryIcon: null,
      description: "",
    });
    setModalOpen(true);
  };

  const handleImageSelect = async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    
    // Accept only image files
    if (!file.type.startsWith("image/")) {
      message.error("Please select an image file");
      return;
    }

    try {
      // Show loading message
      message.loading("Uploading image...", 0);
      
      // Upload the file
      const response = await uploadFile(file);
      
      // Hide loading message
      message.destroy();
      
      if (response.success || response.data) {
        // Get the URL from response
        const imageUrl = response.file?.fileUrl || response.url || response.data;
        
        // Update form data with the uploaded image URL
        setFormData((prev) => ({ 
          ...prev, 
          subSubCategoryIcon: imageUrl,
          uploadedFile: file // Keep reference to original file for display
        }));
        
        message.success("Image uploaded successfully!");
        console.log('Upload response:', response);
        console.log('Image URL:', imageUrl);
      } else {
        message.error("Failed to upload image");
        console.error('Upload failed:', response);
      }
    } catch (error) {
      message.destroy();
      message.error("Error uploading image");
      console.error("Error uploading image:", error);
    }
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

  // Filter subSubCategories based on search term and selected option
  const filteredSubSubCategories = Array.isArray(subSubCategories)
    ? subSubCategories.filter((subSubCategory) => {
        if (!searchTerm) return true;

        const searchValue = searchTerm.toLowerCase();

        switch (searchOption) {
          case "name":
            return (
              subSubCategory.name?.toLowerCase().includes(searchValue) ||
              false
            );
          case "subCategory":
            return (
              subSubCategory.subCategoryName?.toLowerCase().includes(searchValue) ||
              false
            );
          case "status":
            return (
              (subSubCategory.isActive ? "active" : "inactive")?.toLowerCase().includes(searchValue) || false
            );
          default:
            return (
              subSubCategory.name?.toLowerCase().includes(searchValue) ||
              false ||
              subSubCategory.subCategoryName?.toLowerCase().includes(searchValue) ||
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
              onClick={() => handleDelete(row._id)}
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
          {/* Add SubSubCategory Button - positioned to the right */}
          <div className="flex justify-end -mb-10">
            <button
              onClick={handleAddNew}
              className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-semibold"
            >
              {t("buttons.addNewSubToSubCategory")}
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
            <DataTable columns={columnsWithActions} data={filteredSubSubCategories} />
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
      {/* Side Modal for SubSubCategory Details */}
      <SideModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          isEditing
            ? t("subToSubCategoryDetail.editTitle")
            : t("subToSubCategoryDetail.addTitle")
        }
        actions={
          <div className="flex gap-4 items-center">
            <button
              className="w-full py-3 rounded-xl bg-accent text-white font-semibold text-lg"
              onClick={handleSaveSubToSubCategory}
            >
              {isEditing
                ? t("subToSubCategoryDetail.update")
                : t("subToSubCategoryDetail.save")}
            </button>
            <button
              className="w-full py-3 rounded-xl text-text-primary font-semibold text-lg bg-transparent mt-2"
              onClick={() => setModalOpen(false)}
            >
              {t("subToSubCategoryDetail.cancel")}
            </button>
          </div>
        }
      >
        <div>
          {/* SubSubCategory Icon Upload */}
          <div className="mb-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-accent transition-colors"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              <FaUpload className="mx-auto text-3xl text-gray-400 mb-2" />
              <p className="text-gray-600">{t("subToSubCategoryDetail.upload")}</p>
              <p className="text-sm text-gray-500 mt-1">
                {t("subToSubCategoryDetail.uploadTagline")}
              </p>
              {formData.uploadedFile && (
                <p className="text-xs text-gray-500 mt-2 truncate">
                  {formData.uploadedFile.name}
                </p>
              )}
              {formData.subSubCategoryIcon && !formData.uploadedFile && (
                <p className="text-xs text-green-500 mt-2">
                  ✓ Image uploaded
                </p>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {t("subToSubCategoryDetail.subCategoryName")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Select
                  value={formData.subCategoryName || undefined}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      subCategoryName: value,
                    }))
                  }
                  placeholder="Choose Sub-Category"
                  className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  disabled={isEditing}
                >
                  {categories.map((category) => (
                    <Select.Option key={category._id} value={category.name}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
                {isEditing && (
                  <div className="absolute inset-0 bg-gray-100 bg-opacity-50 cursor-not-allowed rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded shadow-lg">
                      To change sub-category, delete this item and create new
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                {t("subToSubCategoryDetail.sub_to_subCategoryName")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Sub-SubCategory Name"
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
                {t("subToSubCategoryDetail.description")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </SideModal>
    </div>
  );
};

export default SubToSubCategoryManagement;
