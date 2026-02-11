import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import AdminOrders from './Orders';

const AdminOrdersPage = () => {
  return (
    <AdminLayout>
      <AdminOrders />
    </AdminLayout>
  );
};

export default AdminOrdersPage;
