import React, { useEffect, useState } from 'react';

const Dealers = () => {
    const [dealers, setDealers] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/dealers`)
            .then(res => res.json())
            .then(data => setDealers(data));
    }, [])
    return (
        <div>
            <h2 className='text-center text-5xl mb-3'>Our <span className='text-orange-400'>Dealers</span></h2>
            <div className='container w-full mx-auto grid gap-5 md:grid-cols-4 sm:grid-cols-1 bg-slate-100 p-8 rounded'>
                {
                    dealers.map(dealer =>
                        <div className='w-full mx-auto items-center justify-evenly flex justify-c bg-white rounded-lg py-5 px-2'>
                            <img className='w-20 h-20 rounded' src={dealer.img} alt="" />
                            <div className='ml-5'>
                                <h3 className='text-xl'>{dealer.dealer}</h3>
                                <h3 className='text-sm'>{dealer.Address}</h3>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Dealers;