import React from 'react'
import { useSelector } from 'react-redux'
import { useGetUserStatsQuery } from '../../../../redux/features/stats/statsApi';
import Loading from '../../../../components/Loading';
import UserStats from './UserStats';
import {Bar} from "react-chartjs-2"

import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const UserDMain = () => {
    // get method hole {} r put or other method hole []
const { user } = useSelector((state) => state.auth);

    // ২. ইউজার ইমেইলটি বের করে নিচ্ছি (আপনার স্টোর অনুযায়ী user.email বা user.user.email হতে পারে)
    const userEmail = user?.email;

    // ৩. হুকের ভেতরে ইমেইল পাস করছি এবং 'skip' ব্যবহার করছি 
    // যাতে ইমেইল না পাওয়া পর্যন্ত API কল না হয় (undefined এরর বন্ধ হবে)
    const { data:userData, isLoading, error } = useGetUserStatsQuery(userEmail, {
        skip: !userEmail, 
    });

    // লোডিং অবস্থা
    if (isLoading) return <Loading />;

    // যদি ইউজার লগইন না থাকে
    if (!userEmail) return <div className="p-5 text-red-500">ইউজার তথ্য পাওয়া যাচ্ছে না। দয়া করে লগইন করুন।</div>;

    // যদি এরর হয়
    if (error) return <div className="p-5 text-red-500">User Data Fetch Failed!</div>;

    // ৪. ডাটা ডেসট্রাকচারিং (অবজেক্ট হিসেবে {} দিতে হবে, কারণ ডাটা একটি অবজেক্ট)
    const stats = userData?.data || {};
    const { totalPayments, totalPurchaseProducts, totalReviews } = stats;


    const data = {
        labels: ['Total Payment', 'Total Reviews', 'Total Purchased Products'],
        datasets:[
            {
                label: 'User Stats',
                data: [totalPayments, totalReviews, totalPurchaseProducts],
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgb(255, 99, 132)'],
                borderWidth: 1
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            Legend:{
                position:'top'
            },
            Tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        if(tooltipItem.label === 'Total Payments'){
                            return `Total Payments: $${tooltipItem.raw.tofixed(2)}`;
                        }
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    }
                }
            }
        }
    }
  return (
    <div className='p-6'>
        <div>
            <h1 className='text-2xl font-semibold mb-4'> User Dashboard</h1>
            <p className='text-gray-500'>Hi, {user?.username}! Welcome to Your User Dashboard</p>
        </div>
        <UserStats stats={stats}/>
        <div className='mb-6'>
            <Bar data={data} options={options}/>
        </div>
    </div>
  )
}

export default UserDMain