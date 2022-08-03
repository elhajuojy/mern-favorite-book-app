import React from 'react';

const CardImage = (props) => {

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img src={props.data.img} alt={props.data.title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{props.data.title}</div>
                <p className="text-gray-700 text-base">
                    {props.data.content}
                </p>
            </div>
            <div>
                <button onClick={() => props.handleDelete(props.data._id)} className='inline-block bg-red-600 hover:bg-red-500 rounded-full mx-5 my-3 px-3 py-1 text-sm font-semibold text-white mr-2 mb-2' >Delete</button>
            </div>
        </div >
    );
};

export default CardImage;