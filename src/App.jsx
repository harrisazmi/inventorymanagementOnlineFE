import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalInventory, setOriginalInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); // Default value
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const backendlink = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${backendlink}/api/inventory`);
      setInventory(response.data.inventory);
      setOriginalInventory(response.data.inventory); // Store the original inventory
      setIsLoading(false);
    } catch (error) {
      setError("Error fetching inventory");
      setIsLoading(false);
    }
  };

  const addItem = async () => {
    try {
      await axios.post(`${backendlink}/api/inventory`, {
        itemName,
        quantity,
      });
      await fetchInventory();
      setItemName("");
      setQuantity(0);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${backendlink}/api/inventory/${id}`);
      await fetchInventory();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const findItem = () => {
    const filteredInventory = originalInventory.filter((item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setInventory(filteredInventory);
    setCurrentPage(1); // Reset current page when filtering
  };

  const resetSearchTerm = () => {
    setSearchTerm("");
    setInventory(originalInventory);
    setCurrentPage(1); // Reset current page when resetting search
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleProductClick = async (productId) => {
    setSelectedProductId(productId);
    try {
      const response = await axios.get(
        `${backendlink}/api/inventory/${productId}`
      );
      setSelectedProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  useEffect(() => {
    // Calculate items per page dynamically based on total inventory count
    const totalItems = inventory.length;
    const maxItemsPerPage = 20; // Maximum items per page
    const calculatedItemsPerPage = Math.min(maxItemsPerPage, totalItems);
    setItemsPerPage(calculatedItemsPerPage);
  }, [inventory]);

  const totalItems = inventory.length;
  const calculatedItemsPerPage = Math.max(1, itemsPerPage); // Ensure itemsPerPage is at least 1
  const totalPages = Math.ceil(totalItems / calculatedItemsPerPage);
  const lastPage = Math.max(totalPages, 1); // Ensure lastPage is at least 1

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = inventory.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Inventory Management System
      </h1>

      <div className="border border-blue-500 rounded-md p-4 mb-4">
        <h2 className="text-lg font-bold mb-2 text-center">Add New Item</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addItem();
          }}
          className="text-center"
        >
          <div className="flex justify-center mb-2">
            <label htmlFor="itemName" className="mr-2">
              Item Name:
            </label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
              className="border rounded p-2"
            />
          </div>
          <div className="flex justify-center mb-2">
            <label htmlFor="quantity" className="mr-2">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="border rounded p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Item
          </button>
        </form>
      </div>

      <div className="border border-blue-500 rounded-md p-4 mb-4">
        <h2 className="text-lg font-bold mb-2 text-center">Find Item</h2>
        <div className="flex justify-center mb-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded p-2"
            placeholder="Enter item name..."
          />
          <button
            onClick={findItem}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Search
          </button>
          <button
            onClick={resetSearchTerm}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="border border-blue-500 rounded-md p-4 mb-4">
        <h2 className="text-lg font-bold mb-2 text-center">List of Items</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <table className="w-full border-collapse border border-gray-300 mx-auto">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Item Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Quantity
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item._id}>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => handleProductClick(item._id)}
                        className="text-blue-500 underline hover:text-blue-700"
                      >
                        {item.itemName}
                      </button>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {item.quantity}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        onClick={() => deleteItem(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>

      {selectedProduct && (
        <div className="border border-blue-500 rounded-md p-4 mb-4">
          <h2 className="text-lg font-bold mb-2 text-center">
            Selected Product Details
          </h2>
          <p>
            <strong>Item Name:</strong> {selectedProduct.itemName}
          </p>
          <p>
            <strong>Quantity:</strong> {selectedProduct.quantity}
          </p>
        </div>
      )}
    </div>
  );
}

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  // Check if totalPages is finite
  if (!Number.isFinite(totalPages) || totalPages < 1) {
    console.error("Invalid totalPages:", totalPages);
    return null; // Return null if totalPages is invalid
  }

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="flex">
      {pageNumbers.map((number) => (
        <li key={number}>
          <button
            onClick={() => onPageChange(number)}
            className={`${
              currentPage === number
                ? "bg-blue-500 text-white"
                : "text-blue-500"
            } font-bold py-2 px-4 rounded mr-2`}
          >
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default App;
