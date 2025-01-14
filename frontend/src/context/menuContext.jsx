import { createContext, useContext, useEffect, useState } from "react";
const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const createMenu = async (menu) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://food-delievery-system.onrender.com/api/menu",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...menu }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setMenu((prevMenu) => [...prevMenu, data.menu]);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getMenu = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://food-delievery-system.onrender.com/api/menu",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setMenu(data.menu);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateMenu = async (id, menu) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://food-delievery-system.onrender.com/api/menu/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(menu),
        }
      );
      const data = await response.json();
      if (data.success) {
        setMenu((prevMenu) =>
          prevMenu.map((item) => (item._id === menu._id ? data.menu : item))
        );
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteMenu = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://food-delievery-system.onrender.com/api/menu/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setMenu(menu.filter((item) => item._id !== id));
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MenuContext.Provider
      value={{
        menu,
        loading,
        error,
        createMenu,
        getMenu,
        updateMenu,
        deleteMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);
