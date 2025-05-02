import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({ status: '', schoolId: '', date: '', collect_id: '' });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    sortBy: 'order_amount',
    sortOrder: 'asc',
    totalPages: 1
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const styles = {
    container: {
      maxWidth: '1400px',
      margin: 'auto',
      padding: '20px',
      backgroundColor: '#f9fafb'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      textAlign: 'center',
      color: '#4B5563'
    },
    filterContainer: {
      display: 'flex',
      gap: '16px',
      marginBottom: '20px',
      backgroundColor: '#e0e7ff',
      padding: '12px',
      borderRadius: '8px',
      alignItems: 'center'
    },
    selectInput: {
      padding: '8px 16px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      fontSize: '14px',
      width: '200px'
    },
    dateInput: {
      padding: '8px 16px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      fontSize: '14px'
    },
    resetButton: {
      padding: '8px 16px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      backgroundColor: '#fff',
      cursor: 'pointer',
      fontSize: '14px'
    },
    searchContainer: {
      position: 'relative',
      width: '200px'
    },
    searchLoading: {
      position: 'absolute',
      right: '8px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '12px',
      color: '#4B5563'
    },
    table: {
      width: '100%',
      marginTop: '20px',
      borderCollapse: 'collapse'
    },
    th: {
      padding: '12px 16px',
      textAlign: 'left',
      backgroundColor: '#4B5563',
      color: 'white',
      fontSize: '14px'
    },
    td: {
      padding: '12px 16px',
      fontSize: '14px',
      color: '#374151'
    },
    status: {
      padding: '4px 8px',
      borderRadius: '9999px',
      color: '#fff',
      fontSize: '12px',
      fontWeight: '600'
    },
    rowHover: {
      backgroundColor: '#f3f4f6',
      transition: 'background 0.3s ease-in-out'
    },
    noDataText: {
      textAlign: 'center',
      padding: '24px',
      color: '#6b7280',
      fontSize: '16px'
    },
    paginationContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      marginTop: '20px'
    },
    paginationButton: {
      padding: '8px 16px',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      backgroundColor: '#fff',
      cursor: 'pointer',
      color :'black'
    },
    span :{
color:"black" 
    },
    disabledButton: {
      backgroundColor: '#e5e7eb',
      cursor: 'not-allowed'
    },
    errorText: {
      textAlign: 'center',
      padding: '24px',
      color: '#ef4444',
      fontSize: '16px'
    },
    loadingText: {
      textAlign: 'center',
      padding: '24px',
      color: '#4B5563',
      fontSize: '16px'
    }
  };

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://13.201.190.79:5000/api/order-status/', {
        params: { ...filters, ...pagination }
      });
      console.log('API Response:', response.data);
      const fetchedOrders = Array.isArray(response.data.orders)
        ? response.data.orders
        : Array.isArray(response.data[0]?.orders)
        ? response.data[0].orders
        : [];
      setOrders(fetchedOrders);
      setPagination((prev) => ({
        ...prev,
        totalPages: Array.isArray(response.data)
          ? response.data[0]?.totalPages || 1
          : response.data.totalPages || 1
      }));
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to fetch orders. Please try again.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filters, pagination.page, pagination.limit, pagination.sortBy, pagination.sortOrder]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  const handleResetFilters = () => {
    setFilters({ status: '', schoolId: '', date: '', collect_id: '' });
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  // Debounced collect_id handler
  const handleCollectIdChange = useCallback(
    debounce((value) => {
      setSearchLoading(false);
      setFilters((prev) => ({ ...prev, collect_id: value.trim() }));
    }, 200),
    []
  );

  const handleCollectIdInput = (value) => {
    setSearchLoading(true);
    handleCollectIdChange(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Order List</h2>

      {/* Filters */}
      <div style={styles.filterContainer}>
        <select
          style={styles.selectInput}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          value={filters.status}
        >
          <option value="">All Status</option>
          <option value="Success">Success</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      
      
        <input
          type="date"
          style={styles.dateInput}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          value={filters.date}
        />
        <button style={styles.resetButton} onClick={handleResetFilters}>
          Reset Filters
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div style={styles.errorText}>
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div style={styles.loadingText}>
          Loading orders...
        </div>
      )}

      {/* Orders Table */}
      {!loading && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>School ID</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Amount (₹)</th>
              <th style={styles.th}>Payment Mode</th>
              <th style={styles.th}>Bank Reference</th>
              <th style={styles.th}>Payment Time</th>
              <th style={styles.th}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  style={styles.rowHover}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e5e7eb')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
                >
                  <td style={styles.td}>{order.collect_id || 'N/A'}</td>
                  <td style={styles.td}>{order.school_id || 'trustee123'}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.status,
                        backgroundColor:
                          order.status === 'Success'
                            ? '#22c55e'
                            : order.status === 'Pending'
                            ? '#facc15'
                            : '#ef4444'
                      }}
                    >
                      {order.status || 'N/A'}
                    </span>
                  </td>
                  <td style={styles.td}>{order.order_amount || 'N/A'}</td>
                  <td style={styles.td}>{order.payment_mode || 'N/A'}</td>
                  <td style={styles.td}>{order.bank_reference || 'N/A'}</td>
                  <td style={styles.td}>{formatDate(order.payment_time)}</td>
                  <td style={styles.td}>{formatDate(order.createdAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={styles.noDataText}>
                  {filters.status || filters.schoolId || filters.date || filters.collect_id
                    ? 'No orders match the applied filters.'
                    : 'No orders found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      {!loading && (
        <div style={styles.paginationContainer}>
          <button
            style={{
              ...styles.paginationButton,
              ...(pagination.page === 1 ? styles.disabledButton : {})
            }}
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            Previous
          </button>
          <span>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            style={{
              ...styles.paginationButton,
              ...(pagination.page === pagination.totalPages ? styles.disabledButton : {})
            }}
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderList;