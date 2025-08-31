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
import { message } from "antd";

const CategoryManagement = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  //   const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
    description: "",
    status: "",
    categoryIcon: null,
  });
  const fileInputRef = useRef(null);
  const { getCategories, uploadFile, createCategory, updateCategory, deleteCategory } = useApi();
  const mode = useSelector((state) => state.theme.mode);


  // Define tabs inside component to access translation function
  const tabs = [t("tabs.all"), t("tabs.active"), t("tabs.inactive")];



  // Define columns inside component to access translation function
  const columns = [
    {
      key: "name",
      title: t("table.categoryName"),
      render: (val) => (
        <span className="text-text-tablebody font-semibold">{val}</span>
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

  // Fetch categories on component mount and when pagination changes
  //   useEffect(() => {
  //     const fetchCategories = async () => {
  //       try {
  //         const response = await getCategories(pagination.currentPage, pagination.itemsPerPage);

  //         console.log('Categories API response:', response);

  //         if (response.success) {
  //           // Handle the actual API response structure
  //           let categoriesData = [];
  //           if (response.data && response.data.docs && Array.isArray(response.data.docs)) {
  //             categoriesData = response.data.docs;
  //           } else if (Array.isArray(response.data)) {
  //             categoriesData = response.data;
  //           } else if (Array.isArray(response.result)) {
  //             categoriesData = response.result;
  //           } else {
  //             console.warn('No valid categories array found in response:', response);
  //           }

  //           console.log('Setting categories to:', categoriesData);
  //           setCategories(categoriesData);
  //           setPagination(prev => ({
  //             ...prev,
  //             totalPages: response.data?.totalPages || 1,
  //             totalItems: response.data?.totalDocs || categoriesData.length,
  //           }));
  //         } else {
  //           message.error(response.message || "Failed to fetch categories");
  //         }
  //       } catch (error) {
  //         message.error("Error fetching categories");
  //         console.error("Error fetching categories:", error);
  //       }
  //     };

  //     fetchCategories();
  //   }, [pagination.currentPage, pagination.itemsPerPage, getCategories]);

  // Fetch categories on component mount and when pagination changes
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories(pagination.currentPage, pagination.itemsPerPage, 0, true);

        console.log('Categories API response:', response);

        if (response.data && Array.isArray(response.data)) {
          console.log('Setting categories to:', response.data);
          setCategories(response.data);
          setPagination(prev => ({
            ...prev,
            totalPages: response.meta?.totalPages || 1,
            totalItems: response.meta?.total || 0,
          }));
        } else {
          message.error("Failed to fetch categories");
        }
      } catch (error) {
        message.error("Error fetching categories");
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [pagination.currentPage, pagination.itemsPerPage, getCategories]);

  // Handler for opening modal with row data
  const handleEdit = (row) => {
    console.log('=== EDIT CATEGORY STARTED ===');
    console.log('Row data:', row);
    console.log('Row name:', row.name);
    console.log('Row description:', row.description);
    console.log('Row imageUrl:', row.imageUrl);
    
    setSelectedCategory(row);
    setFormData({
      categoryName: row.name || row.categoryName || "",
      description: row.description || "",
      status: row.isActive ? "active" : "inactive",
      categoryIcon: row.imageUrl,
    });
    
    console.log('Form data after setFormData:', {
      categoryName: row.name || row.categoryName || "",
      description: row.description || "",
      status: row.isActive ? "active" : "inactive",
      categoryIcon: row.imageUrl,
    });
    
    setIsEditing(true);
    setModalOpen(true);
  };

  // Handler for deleting a category
  const handleDelete = async (categoryId) => {
    try {
      const response = await deleteCategory(categoryId);

      if (response.success) {
        message.success("Category deleted successfully!");

        // Remove the category from the categories array
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== categoryId)
        );
      } else {
        message.error(response.message || "Failed to delete category");
      }
    } catch (error) {
      message.error("Error deleting category");
      console.error("Error deleting category:", error);
    }
  };

  // Handler for saving category (create or update)
  const handleSaveCategory = async () => {
    try {
      // Validate required fields
      if (!formData.categoryName.trim()) {
        message.error("Category name is required");
        return;
      }
      if (!formData.description.trim()) {
        message.error("Description is required");
        return;
      }
      if (!formData.categoryIcon) {
        message.error("Category icon is required");
        return;
      }

      let response;

      if (isEditing && selectedCategory) {
        // Update existing category
        const categoryData = {
          name: formData.categoryName.trim(),
          description: formData.description.trim(),
          imageUrl: formData.categoryIcon,
        };

        response = await updateCategory(selectedCategory._id, categoryData);
        
        if (response.success || response.data) {
          message.success("Category updated successfully!");

          // Update the category in the categories array
          setCategories((prevCategories) =>
            prevCategories.map((category) =>
              category._id === selectedCategory._id
                ? { ...category, ...categoryData }
                : category
            )
          );
        }
      } else {
        // Create new category
        const categoryData = {
          name: formData.categoryName.trim(),
          description: formData.description.trim(),
          imageUrl: formData.categoryIcon,
        };

        response = await createCategory(categoryData);
        
        if (response.success || response.data) {
          message.success("Category created successfully!");

          // Add the new category to the categories array
          const newCategory = {
            _id: response.data?._id || response._id || Date.now().toString(),
            name: formData.categoryName,
            description: formData.description,
            imageUrl: formData.categoryIcon,
            isActive: true,
            createdAt: new Date().toISOString(),
          };
          setCategories((prevCategories) => [newCategory, ...prevCategories]);
        }
      }

      if (response && !response?.message) {
        setModalOpen(false);
        setIsEditing(false);
        setSelectedCategory(null);
        setFormData({
          categoryName: "",
          description: "",
          status: "",
          categoryIcon: null,
        });
        // Refresh the categories list
        const fetchCategories = async () => {
          try {
            const response = await getCategories(pagination.currentPage, pagination.itemsPerPage, 0, true);
            if (response.data && Array.isArray(response.data)) {
              setCategories(response.data);
            }
          } catch (error) {
            console.error("Error refreshing categories:", error);
          }
        };
        fetchCategories();
      } else {
        message.error(response?.message || "Failed to save category");
      }
    } catch (error) {
      message.error("Error saving category");
      console.error("Error saving category:", error);
    }
  };

  // Handler for opening add new category modal
  const handleAddNew = () => {
    setSelectedCategory(null);
    setIsEditing(false);
    setFormData({
      categoryName: "",
      description: "",
      status: "",
      categoryIcon: null,
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
          categoryIcon: imageUrl,
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

  // Filter categories based on search term and selected option
  const filteredCategories = Array.isArray(categories)
    ? categories.filter((category) => {
        if (!searchTerm) return true;

        const searchValue = searchTerm.toLowerCase();

        switch (searchOption) {
          case "name":
            return (
              category.name?.toLowerCase().includes(searchValue) ||
              false
            );
          case "subCategory":
            return (
              category.subCategoryName?.toLowerCase().includes(searchValue) ||
              false
            );
          case "status":
            return (
              (category.isActive ? "active" : "inactive")?.toLowerCase().includes(searchValue) || false
            );
          default:
            return (
              category.name?.toLowerCase().includes(searchValue) ||
              false ||
              category.subCategoryName?.toLowerCase().includes(searchValue) ||
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
          {/* Add Category Button - positioned to the right */}
          <div className="flex justify-end -mb-10">
            <button
              onClick={handleAddNew}
              className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-semibold"
            >
              {t("buttons.addNewCategory")}
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
            <DataTable columns={columnsWithActions} data={filteredCategories} />
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
      {/* Side Modal for Category Details */}
      <SideModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          isEditing
            ? t("categoryDetail.editTitle")
            : t("categoryDetail.addTitle")
        }
        actions={
          <div className="flex gap-4 items-center">
            <button
              className="w-full py-3 rounded-xl bg-accent text-white font-semibold text-lg"
              onClick={handleSaveCategory}
            >
              {isEditing
                ? t("categoryDetail.update")
                : t("categoryDetail.save")}
            </button>
            <button
              className="w-full py-3 rounded-xl text-text-primary font-semibold text-lg bg-transparent mt-2"
              onClick={() => setModalOpen(false)}
            >
              {t("categoryDetail.cancel")}
            </button>
          </div>
        }
      >
        <div>
          {/* Category Icon Upload */}
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
              <p className="text-gray-600">{t("categoryDetail.upload")}</p>
              <p className="text-sm text-gray-500 mt-1">
                {t("categoryDetail.uploadTagline")}
              </p>
              {formData.uploadedFile && (
                <p className="text-xs text-gray-500 mt-2 truncate">
                  {formData.uploadedFile.name}
                </p>
              )}
              {formData.categoryIcon && !formData.uploadedFile && (
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
                {t("categoryDetail.categoryName")}{" "}
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
                {t("categoryDetail.description")}{" "}
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

export default CategoryManagement;
