import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddItemModal from "@/components/AddItemModal";
import EditModal from "@/components/EditModal";
import Pagination from "@/components/Pagination";
import { useMenu } from "../context/menuContext";
import { useToast } from "../hooks/use-toast";
import { useOrder } from "../context/orderContext";

const Menu = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemToAdd, setItemToAdd] = useState({
    name: "",
    price: "",
    category: "",
    availability: true,
  });

  const { menu, loading, error, updateMenu, createMenu, getMenu, deleteMenu } =
    useMenu();
  const { toast } = useToast();
  const { orders, placeOrder } = useOrder();

  useEffect(() => {
    getMenu();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddToOrders = async (item) => {
    const token = localStorage.getItem("token");

    const orderItem = {
      items: [
        {
          menuItem: item._id,
          quantity: 1,
        },
      ],
    };

    if (!token) {
      toast({ title: "User not authenticated", type: "error" });
      return;
    }

    const result = await placeOrder(orderItem, token);
    if (result.success) {
      toast({ title: "Item added to orders successfully", type: "success" });
    } else {
      toast({ title: result.message, type: "error" });
    }
  };

  const itemsPerPage = 12;
  const totalPages = Math.ceil(menu.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = menu.slice(startIndex, endIndex);

  const handleAdd = async () => {
    await createMenu(itemToAdd);
    setIsAddModalOpen(false);
    setItemToAdd({ name: "", price: "", category: "", availability: true });
    getMenu();
    toast({ title: "Item added successfully", type: "success" });
  };

  const handleEdit = async () => {
    await updateMenu(itemToEdit._id, itemToEdit);
    setIsEditModalOpen(false);
    setItemToEdit(null);
    getMenu();
    toast({ title: "Item updated successfully", type: "success" });
  };

  const handleDelete = async (id) => {
    await deleteMenu(id);
    getMenu();
    toast({ title: "Item deleted successfully", type: "success" });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Menu Items
          </Link>
          <div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 transition duration-300 mr-4"
            >
              Add New Item
            </button>
            <Link
              to="/orders"
              className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-100 transition duration-300"
            >
              View Orders ({orders.length})
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {loading ? (
          <p className="text-center text-xl">Loading...</p>
        ) : error ? (
          <p className="text-center text-xl text-red-500">Error: {error}</p>
        ) : menu.length === 0 ? (
          <p className="text-center text-xl">No menu items available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-2">{item.category}</p>
                  <p className="text-lg font-bold text-blue-600">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="bg-gray-100 p-4 flex justify-between">
                  <button
                    onClick={() => {
                      setItemToEdit(item);
                      setIsEditModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleAddToOrders(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Add to Orders
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>

      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        itemToAdd={itemToAdd}
        setItemToAdd={setItemToAdd}
        handleAdd={handleAdd}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        itemToEdit={itemToEdit}
        setItemToEdit={setItemToEdit}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default Menu;
