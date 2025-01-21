import React from 'react';

const ContactCard = ({ name, location, phone, description, image }) => (
    <div className="border rounded-lg shadow-md p-6 bg-white light:bg-gray-800">
      <div className="text-center">
        <img
          className="w-24 h-24 rounded-full mx-auto"
          src={image}
          alt={`${name}'s profile`}
        />
        <h5 className="font-medium text-lg my-3 text-gray-800 light:text-gray-300">{name}</h5>
        <div className="text-sm font-medium text-gray-600 light:text-gray-400 flex flex-col gap-2">
          <span className="flex items-center justify-center">
            <i className="fas fa-location-dot text-gray-400 mr-2"></i> {location}
          </span>
          <span className="flex items-center justify-center">
            <i className="fas fa-phone text-gray-400 mr-2"></i> {phone}
          </span>
        </div>
        <p className="text-sm text-gray-600 light:text-gray-400 font-medium my-4">{description}</p>
        <div className="flex justify-center gap-4">
          <button className="focus:outline-none focus:bg-opacity-50 focus:text-black hover:text-black focus:ring-2 
              focus:ring-offset-2 focus:ring-indigo-700 text-indigo-700 hover:bg-opacity-50 bg-gray-100 light:bg-gray-700 text-sm 
              light:text-gray-300 font-medium py-2 px-4 rounded">
            Project
          </button>
          <button className="focus:outline-none focus:bg-opacity-50 focus:text-black hover:text-black focus:ring-2 
              focus:ring-offset-2 focus:ring-indigo-700 text-indigo-700 hover:bg-opacity-50 bg-gray-100 light:bg-gray-700 text-sm 
              light:text-gray-300 font-medium py-2 px-4 rounded">
            Message
          </button>
        </div>
      </div>
    </div>
  );
  
  export default ContactCard;
  