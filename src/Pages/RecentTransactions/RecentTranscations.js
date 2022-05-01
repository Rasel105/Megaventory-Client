import React, { useEffect, useState } from 'react';

const RecentTranscations = () => {
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/transactions')
            .then(res => res.json())
            .then(data => setTransactions(data));
    }, [])

    return (
        <div className='w-full mx-auto container'>
            <h2 className='text-2xl ml-6 mt-7 '><span className='text-lime-400 text-4xl'>Recent </span>Transactions</h2>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div class="p-4">
                    <label for="table-search" class="sr-only">Search</label>
                    <div class="relative mt-1">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input type="text" id="table-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                    </div>
                </div>
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Order-ID {transactions.length}
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ITEM
                            </th>
                            <th scope="col" class="px-6 py-3">
                                DEALDER NAME
                            </th>
                            <th scope="col" class="px-6 py-3">
                                PAYEMENT INFO
                            </th>

                            <th scope="col" class="px-6 py-3">
                                PRICE
                            </th>
                            <th scope="col" class="px-6 py-3">
                                BRAND NAME
                            </th>
                            <th scope="col" class="px-6 py-3">
                                STATUS
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions.map(transaction =>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {transaction.OrderId}
                                    </th>
                                    <td class="px-6 py-4">
                                        {transaction.item}
                                    </td>
                                    <td class="px-6 py-4">
                                        {transaction.dealerName}
                                    </td>
                                    <td class="px-6 py-4">
                                        {transaction.paymentInfo}
                                    </td>
                                    <td class="px-6 py-4">
                                       {transaction.price}
                                    </td>
                                    <td class="px-6 py-4">
                                       {transaction.brand}
                                    </td>
                                    <td class="px-6 py-4">
                                        <p className='bg-lime-300 text-center py-1 rounded'> {transaction.status}</p>
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default RecentTranscations;