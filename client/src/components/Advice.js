import React from 'react';

const Advice = ({ quote, fetchRandomQuote }) => {
    return (
        <div className='p-2'>
            <div className='bg-[#151C28] mx-auto rounded-3xl max-sm:w-full px-5 py-10 shadow-lg'>
                <div className='mb-2 text-center'>
                    <p className='text-white text-3xl font-bold'>Advice of the day</p>
                    <p className='text-gray-100'>Generate a random quote</p>
                </div>
                <div className='my-10'>
                    <p className='text-white text-2xl text-center mb-5'>{quote.q}</p>
                    <p className='text-white text-lg text-center'>- {quote.a}</p>
                </div>
                <div className='my-2 text-center'>
                    <button className='bg-[#607CA9] text-white font-bold text-xl border-b-4 border-b-gray-800 uppercase rounded-xl py-3 px-16 mx-auto hover:opacity-95' onClick={fetchRandomQuote}>Generate</button>
                </div>
            </div>
        </div>
    );
}

export default Advice;
