import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrPersonalComputer } from "react-icons/gr";
import { useAuth } from "../context/AuthContext"; // Importing login state context

export default function Navbar() {
  // State to control hamburger menu visibility (mobile)
  const [menuOpen, setMenuOpen] = useState(false);

  // State to control "Work" dropdown in mobile view
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);

  // State to control dropdown visibility in large screen (on hover)
  const [lgDropdownVisible, setLgDropdownVisible] = useState(false);

  // State to toggle profile menu (change photo, logout)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // User's profile photo state (default avatar)
  const [userPhoto, setUserPhoto] = useState("/default-avatar.png");

  // For setting delay before hiding large-screen dropdown
  const hideTimeoutRef = useRef(null);

  // Navigation hook for redirect
  const navigate = useNavigate();

  // Using login state and logout function from AuthContext
  const { isAuthenticated, logout } = useAuth();

  // Show dropdown immediately on hover
  const handleMouseEnter = () => {
    clearTimeout(hideTimeoutRef.current);
    setLgDropdownVisible(true);
  };

  // Hide dropdown after 1 second of mouse leaving
  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setLgDropdownVisible(false);
    }, 1000);
  };

  // Load user profile image from localStorage on first load
useEffect(() => {
  const email = localStorage.getItem("userEmail");
  const photo = localStorage.getItem(`profilePhoto-${email}`);
  if (photo) setUserPhoto(photo);
}, []);

  // Logout function: removes profile photo, calls context logout, redirects to login page
// 3. On logout: remove only that user’s photo if you want
const handleLogout = () => {
  const email = localStorage.getItem("userEmail");
  localStorage.removeItem(`profilePhoto-${email}`);
  localStorage.removeItem("userEmail");
  logout();
  setProfileMenuOpen(false);
  navigate("/login");
};


  // When user selects a new profile image
const handlePhotoChange = (e) => {
  const file = e.target.files[0];
  const url = URL.createObjectURL(file);
  setUserPhoto(url);

  const email = localStorage.getItem("userEmail");
  if (email) {
    localStorage.setItem(`profilePhoto-${email}`, url);
  }
};









  return (
    <nav className="font-poppins sticky text-white px-4 py-3 z-50 bg-gradient-to-r from-purple-700 via-pink-600 to-pink-400
 shadow-[0_4px_15px_rgba(0,0,0,0.6)]">
      {/* Top header: logo and hamburger */}
      <div className="flex items-center justify-between h-15">
        {/* Logo */}
        <div>
          <h1 className="text-3xl font-bold h-12 transition-transform duration-300 ease-in-out hover:scale-110 hover:drop-shadow-lg cursor-pointer"
>
            <span className="flex items-center gap-2">
              <GrPersonalComputer className="text-3xl hover:text-blue-100" />
              Thinkfolio
            </span>
          </h1>
        </div>

        {/* Hamburger icon (visible only on mobile) */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>☰</button>

        {/* Desktop navigation links */}
        <ul className="hidden md:flex gap-6 items-center font-bold text-xl">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>

          {/* Work dropdown for large screens (hover) */}
          <li
            className="relative hidden lg:block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="focus:outline-none">Work ▾</button>
            <ul className={`absolute bg-black/30 text-white mt-2 rounded shadow-lg min-w-max transition-opacity duration-100 ${lgDropdownVisible ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
              <li><Link to="/work/form" className="block px-4 py-2 hover:bg-gray-200">Form App</Link></li>
              <li><Link to="/work/notes" className="block px-4 py-2 hover:bg-gray-200">Notes App</Link></li>
              <li><Link to="/work/cv-maker" className="block px-4 py-2 hover:bg-gray-200">CV Maker</Link></li>
            </ul>
          </li>

          {/* Work dropdown toggle for mobile/tablet view */}
          <li className="lg:hidden">
            <button
              onClick={() => setWorkDropdownOpen(!workDropdownOpen)}
              className="focus:outline-none"
            >
              Work ▾
            </button>
          </li>

          {/* Logged-in user: show profile icon with menu */}
          {isAuthenticated ? (
            <li className="relative">
              <img
                src={userPhoto}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              />
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black/30 text-white rounded-lg shadow-lg z-50">
                  {/* Upload new profile photo */}
                  <label className="block px-4 py-2 cursor-pointer hover:bg-gray-100">
                    Change Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                  {/* Logout button */}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-blue-600 hover:text-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            // If not logged in: show Login and Signup buttons
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile slide-out menu */}
      <div
        className={`fixed font-bold top-0 left-0 h-full w-3/4 bg-pink-600/95 text-white transform transition-transform duration-300 ease-in-out z-40 px-4 py-6 flex flex-col gap-4 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Close mobile menu button */}
        <button className="self-end text-white text-xl mb-4" onClick={() => setMenuOpen(false)}>×</button>

        {/* Mobile nav links */}
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

        {/* Work dropdown inside mobile menu */}
        <button onClick={() => setWorkDropdownOpen(!workDropdownOpen)} className="text-left">
          Work ▾
        </button>
        {workDropdownOpen && (
          <div className="ml-4 flex flex-col gap-2">
            <Link to="/work/form" onClick={() => setMenuOpen(false)}>Form App</Link>
            <Link to="/work/notes" onClick={() => setMenuOpen(false)}>Notes App</Link>
            <Link to="/work/cv-maker" onClick={() => setMenuOpen(false)}>CV Maker</Link>
          </div>
        )}

        {/* Show user section if logged in */}
        {isAuthenticated ? (
          <div className="flex  flex-col gap-2 mt-4">
            <div className="flex items-center gap-2">
              <img src={userPhoto} alt="Profile" className="w-10 h-10 rounded-full border" />
              <label className="cursor-pointer text-sm underline">
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>
            <button onClick={handleLogout} className="text-left text-blue-500">
              Logout
            </button>
          </div>
        ) : (
          // If not logged in in mobile view
          <>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
