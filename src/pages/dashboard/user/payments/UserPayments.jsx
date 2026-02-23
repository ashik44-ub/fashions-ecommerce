import React from 'react';
import { useGetOrdersByEmailQuery } from '../../../../redux/features/orders/orderApi';
import Loading from '../../../../components/Loading';
import { useSelector } from 'react-redux';

const UserPayments = () => {
    const { user } = useSelector((state) => state.auth);
    const { data, isLoading, error } = useGetOrdersByEmailQuery(user?.email);

    if (isLoading) return <Loading />;
    if (error) return <div className="p-5 text-red-500 font-medium text-center">User Data Fetch Failed!</div>;

    const orders = data?.data || [];

    // FIXED: Added initial value 0 to avoid [object Object] errors and handled empty array
    const totalPayment = orders.reduce((acc, order) => acc + (order.amount || 0), 0);

    return (
        <div className="py-8 px-4 max-w-4xl mx-auto">
            <div className="mb-6 border-b pb-4">
                <h3 className="text-2xl font-bold text-gray-800">Payment History</h3>
                <p className="text-gray-500">View and manage your recent transactions</p>
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-xl shadow-md text-white mb-8">
                <p className="text-blue-100 text-sm uppercase tracking-wider font-semibold">Total Amount Spent</p>
                <h2 className="text-4xl font-extrabold mt-1">${totalPayment.toFixed(2)}</h2>
            </div>

            <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
                <ul className="divide-y divide-gray-100">
                    {orders.length > 0 ? (
                        orders.map((item, index) => (
                            <li key={item.id || index} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                                                Order #{index + 1}
                                            </span>
                                            <span className="text-xs text-gray-400 font-mono">ID: {item._id || item.id}</span>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between md:justify-end gap-6">
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-gray-900">${item.amount.toFixed(2)}</p>
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                                                item.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                item.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                                                item.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="p-10 text-center text-gray-500">No orders found.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default UserPayments;