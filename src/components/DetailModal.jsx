import React, { useState, useEffect } from "react";
import apiService from "../services/apiservices";

const DetailModal = ({ itemId, onClose }) => {
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.showData(itemId);
        setItemDetails(data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchData();
  }, [itemId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-x-hidden overflow-y-auto">
      <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <div className="md:flex items-center">
          <div className="md:mt-0 md:ml-6 text-center md:text-left">
            {itemDetails ? (
              <>
                <span className="px-2 py-1 text-md font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                  {itemDetails.title}
                </span>
                <p className="text-sm text-gray-700 mt-1">
                  Description: {itemDetails.description}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  Price: {itemDetails.price}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  Author: {itemDetails.author}
                </p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <div className="text-center md:text-right mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-blue-700 bg-blue-200 rounded-md hover:bg-blue-400 focus:outline-none focus:shadow-outline-blue active:bg-blue-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
