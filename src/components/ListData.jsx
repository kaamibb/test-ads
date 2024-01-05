"use client";
import React, { useState, useEffect } from "react";
import apiService from "../services/apiservices";
import CreateDataModal from "./CreateDataModal";
import UpdateModal from "./UpdateModal";
import DetailModal from "./DetailModal";

const ListData = () => {
  const [items, setItems] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleNameClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDetailModal = () => {
    setSelectedItem(null);
  };

  const handleUpdate = (id) => {
    setUpdateModalOpen(true);
    setSelectedItemId(id);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedItemId(null);
  };

  const handleUpdateSuccess = async () => {
    setUpdateModalOpen(false);

    try {
      const updatedData = await apiService.showData(selectedItemId);

      setItems((prevItems) => {
        const updatedItems = prevItems.map((item) => {
          if (item.id === selectedItemId) {
            return updatedData;
          }
          return item;
        });
        return updatedItems;
      });
    } catch (error) {
      console.error("Error fetching updated data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateData = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const itemsData = await apiService.fetchData();
      setItems(itemsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setItems([]);
    }
  };

  const handleDelete = async (id) => {
    setConfirmDelete(true);
    setItemToDelete(id);
  };

  const confirmDeletion = async () => {
    try {
      await apiService.deleteData(itemToDelete);
      setConfirmDelete(false);
      setItemToDelete(null);
      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
      setConfirmDelete(false);
      setItemToDelete(null);
    }
  };

  const cancelDeletion = () => {
    setConfirmDelete(false);
    setItemToDelete(null);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-6 font-mono">
      <div className="flex">
        <div className="mr-8">
          <h6 className="text-xl font-semibold">List Books</h6>
        </div>
        <div className="ml-auto">
          <button
            onClick={handleCreateData}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold py-2 px-2 rounded"
          >
            Create New Data
          </button>
        </div>
        {isCreateModalOpen && (
          <CreateDataModal
            onClose={handleCloseCreateModal}
            fetchData={fetchData}
          />
        )}
      </div>

      <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
        {items && items.length > 0 ? (
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase">
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Author</th>
                  <th className="px-6 py-3">Action</th>
                  <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase">
                  <th colSpan="5" className="text-center py-3">
                         No items available
                    </th>
                  </tr>
                </tr>
              </thead>
              <tbody className="bg-white">
                {items.map((item) => (
                  <tr key={item.id} className="text-gray-700">
                    <td className="border">
                      <p
                        className="px-6 py-3 text-ms font-semibold text-black cursor-pointer"
                        onClick={() => handleNameClick(item)}
                      >
                        {item.title}
                      </p>
                    </td>
                    <td className="border">
                      <p className="px-6 py-3 text-ms font-semibold text-gray-600">
                        {item.description}
                      </p>
                    </td>
                    <td className="px-6 py-3 text-ms font-semibold border">
                      {item.price}
                    </td>
                    <td className="px-6 py-3 text-sm border">
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                        {item.author}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <button
                        onClick={() => handleUpdate(item.id)}
                        className="bg-blue-100 text-blue-700 font-bold py-1 px-2 mr-4 rounded-l border-0"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-100 text-red-700 font-bold py-1 px-2 rounded-l mr-4 border-0"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {updateModalOpen && (
              <UpdateModal
                id={selectedItemId}
                onClose={handleCloseUpdateModal}
                onUpdateSuccess={handleUpdateSuccess}
              />
            )}
          </div>
        ) : (
          <p className="text-gray-700 mt-4">No items available</p>
        )}
        {selectedItem && (
          <DetailModal
            itemId={selectedItem.id}
            onClose={handleCloseDetailModal}
          />
        )}
        {confirmDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <div className="md:flex items-center">
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                  <p className="font-bold">Delete your item</p>
                  <p className="text-sm text-gray-700 mt-1">
                    Are you sure you want to delete this item? This action
                    cannot be undone.
                  </p>
                </div>
              </div>
              <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                <button
                  onClick={confirmDeletion}
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 hover:bg-red-400 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={cancelDeletion}
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 hover:bg-gray-400 text-gray-700 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListData;
