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
import { message } from "antd";

const UserManagement = () => {
  const { t } = useTranslation();
  const dropdownRef = useRef(null);
  const [updateTriesModalOpen, setUpdateTriesModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("name");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [updateTriesValue, setUpdateTriesValue] = useState("");
//   const { getUsers, updateUserTries, deactivateUser } = useApi();
  const mode = useSelector((state) => state.theme.mode);

  // Dummy data for users
  const dummyUsers = useMemo(() => [
    {
      _id: "1",
      fullName: "John Doe",
      email: "john.doe@example.com",
      phoneNo: "+1234567890",
      status: "Active",
      freeTriesLeft: 5,
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      _id: "2",
      fullName: "Jane Smith",
      email: "jane.smith@example.com",
      phoneNo: "+1234567891",
      status: "In Active",
      freeTriesLeft: 0,
      createdAt: "2024-01-10T14:20:00Z"
    },
    {
      _id: "3",
      fullName: "Mike Johnson",
      email: "mike.johnson@example.com",
      phoneNo: "+1234567892",
      status: "Active",
      freeTriesLeft: 3,
      createdAt: "2024-01-20T09:15:00Z"
    },
    {
      _id: "4",
      fullName: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      phoneNo: "+1234567893",
      status: "Active",
      freeTriesLeft: 8,
      createdAt: "2024-01-05T16:45:00Z"
    },
    {
      _id: "5",
      fullName: "David Brown",
      email: "david.brown@example.com",
      phoneNo: "+1234567894",
      status: "In Active",
      freeTriesLeft: 1,
      createdAt: "2024-01-12T11:30:00Z"
    },
    {
      _id: "6",
      fullName: "Emily Davis",
      email: "emily.davis@example.com",
      phoneNo: "+1234567895",
      status: "Active",
      freeTriesLeft: 10,
      createdAt: "2024-01-18T13:20:00Z"
    },
    {
      _id: "7",
      fullName: "Robert Miller",
      email: "robert.miller@example.com",
      phoneNo: "+1234567896",
      status: "Active",
      freeTriesLeft: 2,
      createdAt: "2024-01-08T15:10:00Z"
    },
    {
      _id: "8",
      fullName: "Lisa Garcia",
      email: "lisa.garcia@example.com",
      phoneNo: "+1234567897",
      status: "In Active",
      freeTriesLeft: 0,
      createdAt: "2024-01-25T10:00:00Z"
    },
    {
      _id: "9",
      fullName: "James Taylor",
      email: "james.taylor@example.com",
      phoneNo: "+1234567898",
      status: "Active",
      freeTriesLeft: 7,
      createdAt: "2024-01-14T12:30:00Z"
    },
    {
      _id: "10",
      fullName: "Maria Rodriguez",
      email: "maria.rodriguez@example.com",
      phoneNo: "+1234567899",
      status: "Active",
      freeTriesLeft: 4,
      createdAt: "2024-01-22T08:45:00Z"
    }
  ], []);

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
      key: "status",
      title: t('table.status'),
      render: (val) => (
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            val === "Active"
              ? "bg-[#55CE631A] text-[#55CE63]"
              : val === "In Active"
              ? "bg-[#FFBC341A] text-[#FFBC34]"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {val || "Unknown"}
        </span>
      ),
    },
    {
      key: "freeTriesLeft",
      title: t('table.freeTriesLeft'),
      render: (val) => <span className="text-text-tablebody">{val || 0}</span>,
    },
    {
      key: "action",
      title: t('table.action'),
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch users on component mount and when pagination changes
//   useEffect(() => {
//     const fetchUsers = async () => {
//     try {
//         const response = await getUsers(pagination.currentPage, pagination.itemsPerPage);
        
//         console.log('Users API response:', response);
//         console.log('Response.data:', response.data);
//         console.log('Response.data type:', typeof response.data);
//         console.log('Is response.data array?', Array.isArray(response.data));
        
//         if (response.success) {
//         // Handle the actual API response structure
//         let usersData = [];
//         if (response.data && response.data.docs && Array.isArray(response.data.docs)) {
//             usersData = response.data.docs;
//         } else if (Array.isArray(response.data)) {
//             usersData = response.data;
//         } else if (Array.isArray(response.result)) {
//             usersData = response.result;
//         } else {
//             console.warn('No valid users array found in response:', response);
//             usersData = [];
//         }
        
//         console.log('Setting users to:', usersData);
//         setUsers(usersData);
//         setPagination(prev => ({
//             ...prev,
//             totalPages: response.data?.totalPages || 1,
//             totalItems: response.data?.totalDocs || 0,
//         }));
//         } else {
//         message.error(response.message || "Failed to fetch users");
//         }
//     } catch (error) {
//         message.error("Error fetching users");
//         console.error("Error fetching users:", error);
//     }
//     };

//     fetchUsers();
// }, [pagination.currentPage, pagination.itemsPerPage, getUsers]);

    // Set dummy data on component mount
    useEffect(() => {
    setUsers(dummyUsers);
    setPagination(prev => ({
      ...prev,
      totalPages: Math.ceil(dummyUsers.length / pagination.itemsPerPage),
      totalItems: dummyUsers.length,
    }));
  }, [dummyUsers, pagination.itemsPerPage]);

  // Handler for opening update tries modal
  const handleUpdateTries = (row) => {
    setSelectedUser(row);
    setUpdateTriesValue(row.freeTriesLeft?.toString() || "0");
    setUpdateTriesModalOpen(true);
  };

  // Handler for updating user tries
//   const handleSaveUpdateTries = async () => {
//     try {
//       const response = await updateUserTries(selectedUser._id, parseInt(updateTriesValue));
      
//       if (response.success) {
//         message.success("User tries updated successfully!");
        
//         // Update the specific user in the users array
//         setUsers(prevUsers => 
//           prevUsers.map(user => 
//             user._id === selectedUser._id 
//               ? { ...user, freeTriesLeft: parseInt(updateTriesValue) }
//               : user
//           )
//         );
        
//         setUpdateTriesModalOpen(false);
//         setSelectedUser(null);
//         setUpdateTriesValue("");
//       } else {
//         message.error(response.message || "Failed to update user tries");
//       }
//     } catch (error) {
//       message.error("Error updating user tries");
//       console.error("Error updating user tries:", error);
//     }
//   };
    const handleSaveUpdateTries = () => {
    message.success("User tries updated successfully!");
    
    // Update the specific user in the users array
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user._id === selectedUser._id 
          ? { ...user, freeTriesLeft: parseInt(updateTriesValue) }
          : user
      )
    );
    
    setUpdateTriesModalOpen(false);
    setSelectedUser(null);
    setUpdateTriesValue("");
  };

  // Handler for deactivating a user
//   const handleDeactivate = async (userId) => {
//     try {
//       const response = await deactivateUser(userId);
      
//       if (response.success) {
//         message.success("User deactivated successfully!");
        
//         // Update the specific user in the users array
//         setUsers(prevUsers => 
//           prevUsers.map(user => 
//             user._id === userId 
//               ? { ...user, status: "In Active" }
//               : user
//           )
//         );
        
//         // If the modal is open and we're deactivating the selected user, update it too
//         if (selectedUser && selectedUser._id === userId) {
//           setSelectedUser(prev => ({ ...prev, status: "In Active" }));
//         }
//       } else {
//         message.error(response.message || "Failed to deactivate user");
//       }
//     } catch (error) {
//       message.error("Error deactivating user");
//       console.error("Error deactivating user:", error);
//     }
//   };

  const handleDeactivate = (userId) => {
    message.success("User deactivated successfully!");
    
    // Update the specific user in the users array
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user._id === userId 
          ? { ...user, status: "In Active" }
          : user
      )
    );
    
    // If the modal is open and we're deactivating the selected user, update it too
    if (selectedUser && selectedUser._id === userId) {
      setSelectedUser(prev => ({ ...prev, status: "In Active" }));
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
      case "status": return t('search.byStatus');
      default: return t('search.byName');
    }
  };

  // Filter users based on search term and selected option
  const filteredUsers = Array.isArray(users) ? users.filter(user => {
    if (!searchTerm) return true;
    
    const searchValue = searchTerm.toLowerCase();
    
    switch (searchOption) {
      case "name":
        return user.fullName?.toLowerCase().includes(searchValue) || false;
      case "email":
        return user.email?.toLowerCase().includes(searchValue) || false;
      case "status":
        const statusText = user.status?.toLowerCase() || "unknown";
        return statusText.includes(searchValue);
      default:
        return (user.fullName?.toLowerCase().includes(searchValue) || false) ||
               (user.email?.toLowerCase().includes(searchValue) || false);
    }
  }) : [];

  // Columns with updated action buttons
  const columnsWithActions = columns.map((col) => {
    if (col.key === "action") {
      return {
        ...col,
        render: (_, row) => (
          <div className="flex gap-4 items-center">
            <button
              className="text-[#00B050] hover:underline"
              onClick={() => handleUpdateTries(row)}
            >
              {t('table.updateTries')}
            </button>
            <button 
              className="text-[#FF0000] hover:underline"
              onClick={() => handleDeactivate(row._id)}
            >
              {t('table.deactivate')}
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
                    case "name": return t('search.searchName');
                    case "email": return t('search.searchEmail');
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
                    onClick={() => handleSearchOptionChange("status")}
                  >
                    {t('search.byStatus')}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Data Table */}
          <div className="bg-background-card rounded-b-lg shadow-md">
            <DataTable columns={columnsWithActions} data={filteredUsers} />
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
      
      {/* Update Tries Modal */}
      <SideModal
        open={updateTriesModalOpen}
        onClose={() => {
          setUpdateTriesModalOpen(false);
          setSelectedUser(null);
          setUpdateTriesValue("");
        }}
        title="Update Tries"
        actions={
          <div className="flex gap-3 w-full">
            <button
              className="flex-1 py-3 rounded-xl border border-accent text-accent font-semibold text-lg bg-transparent"
              onClick={() => {
                setUpdateTriesModalOpen(false);
                setSelectedUser(null);
                setUpdateTriesValue("");
              }}
            >
              Cancel
            </button>
            <button
              className="flex-1 py-3 rounded-xl bg-accent text-white font-semibold text-lg"
              onClick={handleSaveUpdateTries}
            >
              Save
            </button>
          </div>
        }
      >
        {selectedUser && (
          <div>
            <div className="mb-4">
              <div className="font-medium text-text-primary mb-2">
                Remaining Tries : {selectedUser.freeTriesLeft || 0}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Update Tries
              </label>
              <input
                type="number"
                value={updateTriesValue}
                onChange={(e) => setUpdateTriesValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                placeholder="Enter new tries value"
              />
            </div>
          </div>
        )}
      </SideModal>
    </div>
  );
};

export default UserManagement; 