import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init.js'

const MyItems = () => {
    const [user] = useAuthState(auth);
    const [myItems, setMyItems] = useState([]);

    useEffect(() => {
        const email = user.email;
        const url = `http://localhost:5000/myitems?email=${email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setMyItems(data);
            });
    }, [user]);

    const handleProductDelete = id => {
        const deleteConfirm = window.confirm("Delete Product?");
        if (deleteConfirm) {
            fetch(`http://localhost:5000/myitem/${id }`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                });
        };
        
    };

    return (
        <div className=''>
            <h2 className='text-4xl mx-8 text-center my-2'>My <span className='text-green-400 '>Items {myItems.length}</span></h2>
            <div className="container sm:w-full md:w-1/2 mx-auto my-5  overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quntitry
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Supplier
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    {
                        myItems.map(item => <tbody key={item._id}>
                            <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                    {item.product_name}
                                </th>
                                <td className="px-6 py-4">
                                    ${item.price}
                                </td>
                                <td className="px-6 py-4">
                                    {item.quantity}
                                </td>
                                <td className="px-6 py-4">
                                    {item.supplier_name}
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleProductDelete(item._id)} className="font-medium bg-red-400 py-2 px-3 rounded text-white">Delete</button>
                                </td>
                            </tr>

                        </tbody>
                        )}
                </table>
            </div>
        </div>
    );
};

export default MyItems;