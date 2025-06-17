import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

import "./Navbar.css";

import { UserPanel } from "..";
import { useLanguage } from "../../contexts/LanguageProviderContext";

type NavbarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({ sidebarOpen, setSidebarOpen }: NavbarProps) => {
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  const { t } = useLanguage();

  const handleCloseUserPanel = () => {
    setProfileOpen(false);
  };

  const toggleUserPanel = () => {
    setProfileOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button onClick={toggleSidebar}>
          {sidebarOpen ? <IoMdClose size={30} /> : <AiOutlineMenu size={30} />}
        </button>
        <h1 className="nav-title">{t("coursesApp")}</h1>
      </div>
      <div className="navbar-right">
        <button className="user-icon" onClick={toggleUserPanel}>
          <FiUser size={35} />
        </button>

        {profileOpen && <UserPanel onClose={handleCloseUserPanel} />}
      </div>
    </nav>
  );
};

export default Navbar;
