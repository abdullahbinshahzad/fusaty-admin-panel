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
import { message, Select, Tooltip } from "antd";

const SubCategoryManagement = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  //   const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
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
    categoryName: "",
    subCategoryName: "",
    description: "",
    status: "",
    subCategoryIcon: null,
  });
  const fileInputRef = useRef(null);
  const { getCategories, uploadFile, createSubCategory, updateSubCategory, deleteSubCategory } = useApi();
  const mode = useSelector((state) => state.theme.mode);

  // Define tabs inside component to access translation function
  const tabs = [t("tabs.all"), t("tabs.active"), t("tabs.inactive")];

  // Define columns inside component to access translation function
  const columns = [
    
    {
      key: "name",
      title: t("table.subCategory"),
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
        const response = await getCategories(1, 100, 0, true); // Get all categories
        if (response.data && Array.isArray(response.data)) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error("Error fetching categories for dropdown:", error);
      }
    };

    fetchCategories();
  }, [getCategories]);

  // Fetch subCategories on component mount and when pagination changes
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await getCategories(pagination.currentPage, pagination.itemsPerPage, 1, true);

        console.log('SubCategories API response:', response);

        if (response.data && Array.isArray(response.data)) {
          console.log('Setting subCategories to:', response.data);
          setSubCategories(response.data);
          setPagination(prev => ({
            ...prev,
            totalPages: response.meta?.totalPages || 1,
            totalItems: response.meta?.total || 0,
          }));
        } else {
          message.error("Failed to fetch subCategories");
        }
      } catch (error) {
        message.error("Error fetching subCategories");
        console.error("Error fetching subCategories:", error);
      }
    };

    fetchSubCategories();
  }, [pagination.currentPage, pagination.itemsPerPage, getCategories]);

  // Handler for opening modal with row data
  const handleEdit = (row) => {
    console.log('=== EDIT SUB-CATEGORY STARTED ===');
    console.log('Row data:', row);
    console.log('Row parent:', row.parent);
    console.log('Available categories:', categories);
    
    // Find the category name using the parent ID
    const parentCategory = categories.find(cat => cat._id === row.parent);
    const categoryName = parentCategory ? parentCategory.name : "";
    
    console.log('Parent category found:', parentCategory);
    console.log('Category name to set:', categoryName);
    
    setSelectedSubCategory(row);
    setFormData({
      categoryName: categoryName,
      subCategoryName: row.name || row.subCategoryName || "",
      description: row.description || "",
      status: row.isActive ? "active" : "inactive",
      subCategoryIcon: row.imageUrl,
    });
    
    console.log('Form data after setFormData:', {
      categoryName: categoryName,
      subCategoryName: row.name || row.subCategoryName || "",
      description: row.description || "",
      status: row.isActive ? "active" : "inactive",
      subCategoryIcon: row.imageUrl,
    });
    
    setIsEditing(true);
    setModalOpen(true);
  };

  // Handler for deleting a subCategory
  const handleDelete = async (subCategoryId) => {
    try {
      const response = await deleteSubCategory(subCategoryId);

      if (response.success) {
        message.success("SubCategory deleted successfully!");

        // Remove the subCategory from the subCategories array
        setSubCategories((prevSubCategories) =>
          prevSubCategories.filter((subCategory) => subCategory._id !== subCategoryId)
        );
      } else {
        message.error(response.message || "Failed to delete subCategory");
      }
    } catch (error) {
      message.error("Error deleting subCategory");
      console.error("Error deleting subCategory:", error);
    }
  };

  // Handler for saving subCategory (create or update)
  const handleSaveSubCategory = async () => {
    try {
      // Validate required fields
      if (!formData.categoryName) {
        message.error("Please select a category");
        return;
      }
      if (!formData.subCategoryName.trim()) {
        message.error("Sub-category name is required");
        return;
      }
      if (!formData.description.trim()) {
        message.error("Description is required");
        return;
      }
      if (!formData.subCategoryIcon) {
        message.error("Sub-category icon is required");
        return;
      }

      let response;

      if (isEditing && selectedSubCategory) {
        // Update existing sub-category
        const subCategoryData = {
          name: formData.subCategoryName.trim(),
          description: formData.description.trim(),
          imageUrl: formData.subCategoryIcon,
        };

        response = await updateSubCategory(selectedSubCategory._id, subCategoryData);
        
        if (response.success || response.data) {
          message.success("Sub-category updated successfully!");

          // Update the sub-category in the subCategories array
          setSubCategories((prevSubCategories) =>
            prevSubCategories.map((subCategory) =>
              subCategory._id === selectedSubCategory._id
                ? { ...subCategory, ...subCategoryData }
                : subCategory
            )
          );
        }
      } else {
        // Find the selected category to get its ID
        const selectedCategory = categories.find(cat => cat.name === formData.categoryName);
        if (!selectedCategory) {
          message.error("Selected category not found");
          return;
        }

        // Create new sub-category
        const subCategoryData = {
          name: formData.subCategoryName.trim(),
          description: formData.description.trim(),
          imageUrl: formData.subCategoryIcon,
        };

        response = await createSubCategory(selectedCategory._id, subCategoryData);
        
        if (response.success || response.data) {
          message.success("Sub-category created successfully!");

          // Add the new sub-category to the subCategories array
          const newSubCategory = {
            _id: response.data?._id || response._id || Date.now().toString(),
            name: formData.subCategoryName,
            description: formData.description,
            imageUrl: formData.subCategoryIcon,
            categoryName: formData.categoryName,
            isActive: true,
            createdAt: new Date().toISOString(),
          };
          setSubCategories((prevSubCategories) => [newSubCategory, ...prevSubCategories]);
        }
      }

      if (response && !response?.message) {
        setModalOpen(false);
        setIsEditing(false);
        setFormData({
          categoryName: "",
          subCategoryName: "",
          description: "",
          status: "",
          subCategoryIcon: null,
        });
        // Refresh the sub-categories list
        const fetchSubCategories = async () => {
          try {
            const response = await getCategories(pagination.currentPage, pagination.itemsPerPage, 1, true);
            if (response.data && Array.isArray(response.data)) {
              setSubCategories(response.data);
            }
          } catch (error) {
            console.error("Error refreshing sub-categories:", error);
          }
        };
        fetchSubCategories();
      } else {
        message.error(response?.message || "Failed to save sub-category");
      }
    } catch (error) {
      message.error("Error saving sub-category");
      console.error("Error saving sub-category:", error);
    }
  };

  // Handler for opening add new subCategory modal
  const handleAddNew = () => {
    // setSelectedSubCategory(null);
    setSelectedSubCategory(null);
    setIsEditing(false);
    setFormData({
      categoryName: "",
      subCategoryName: "",
      description: "",
      status: "",
      subCategoryIcon: null,
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
        const imageUrl = response?.file?.fileUrl || response.url || response.data;
        
        // Update form data with the uploaded image URL
        setFormData((prev) => ({ 
          ...prev, 
          subCategoryIcon: imageUrl,
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

  // Filter subCategories based on search term and selected option
  const filteredSubCategories = Array.isArray(subCategories)
    ? subCategories.filter((subCategory) => {
        if (!searchTerm) return true;

        const searchValue = searchTerm.toLowerCase();

        switch (searchOption) {
          case "name":
            return (
              subCategory.name?.toLowerCase().includes(searchValue) ||
              false
            );
          case "subCategory":
            return (
              subCategory.subCategoryName?.toLowerCase().includes(searchValue) ||
              false
            );
          case "status":
            return (
              (subCategory.isActive ? "active" : "inactive")?.toLowerCase().includes(searchValue) || false
            );
          default:
            return (
              subCategory.name?.toLowerCase().includes(searchValue) ||
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
          <div className="flex flex-col sm:flex-row justify-start mb-4">
            <div className="flex items-center bg-background-search rounded-l-full px-4 py-2 w-full sm:max-w-sm border border-border-search">
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
              onClick={handleSaveSubCategory}
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
              <p className="text-gray-600">{t("subCategoryDetail.upload")}</p>
              <p className="text-sm text-gray-500 mt-1">
                {t("subCategoryDetail.uploadTagline")}
              </p>
              {formData.uploadedFile && (
                <p className="text-xs text-gray-500 mt-2 truncate">
                  {formData.uploadedFile.name}
                </p>
              )}
              {formData.subCategoryIcon && !formData.uploadedFile && (
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
                {t("subCategoryDetail.categoryName")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Tooltip
                  title={isEditing ? "To change category, delete this sub-category and create new" : ""}
                  placement="top"
                >
                  <Select
                    value={formData.categoryName || undefined}
                    onChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        categoryName: value,
                      }))
                    }
                    placeholder="Choose Category"
                    className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    disabled={isEditing} // Disable dropdown when editing
                  >
                    {/* <Select.Option value="">{t("subCategoryDetail.chooseCategory")}</Select.Option> */}
                    {categories.map((category) => (
                      <Select.Option key={category._id} value={category.name}>
                        {category.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Tooltip>
              </div>
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
                {t("subCategoryDetail.description")}{" "}
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

export default SubCategoryManagement;
