import React, { useState } from "react";
import { FaCommentDots, FaHeart, FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getPathWithLanguage } from "../../utils/pathHelpers";
import i18n from "../../i18n";
import { useSelector } from "react-redux";
import { FaFlag } from "react-icons/fa"; // Importing a generic flag icon

const FloatingMenu = () => {
  const isLoggedIn = useSelector((state) => state.auth.token !== null); // Check if user is logged in
  const currentLanguage = i18n.language;

  // Initial position: start on the left side
  const [position, setPosition] = useState({
    x: 5, // Left side of the screen
    y: window.innerHeight / 2 - 50, // Vertically centered
  });
  const [dragging, setDragging] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseDown = (e) => {
    setDragging(true);
    setInitialMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const deltaX = e.clientX - initialMousePosition.x;
      const deltaY = e.clientY - initialMousePosition.y;
      setPosition({
        x: position.x + deltaX,
        y: position.y + deltaY,
      });
      setInitialMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    snapToClosestPosition();
  };

  const snapToClosestPosition = () => {
    const { x } = position;

    if (x < window.innerWidth / 3) {
      setPosition({ x: 5, y: position.y });
    } else if (x > (2 * window.innerWidth) / 3) {
      setPosition({ x: window.innerWidth - 55, y: position.y });
    } else {
      setPosition({ x: window.innerWidth / 2 - 50, y: position.y });
    }
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="fixed w-12 h-60 bg-transparent hover:bg-slate-200 rounded-full flex flex-col-reverse items-center justify-around text-white shadow-lg z-50"
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {isLoggedIn ? (
          <>
            <Link to={getPathWithLanguage("/chat", currentLanguage)}>
              <FaCommentDots className="text-fiery-red" />
            </Link>
            <Link to={getPathWithLanguage("/fav", currentLanguage)}>
              <FaHeart className="text-fiery-red" />
            </Link>
          </>
        ) : null}
        {/* Language Icons */}{" "}
        <div className="flex flex-col gap-4 mt-4">
          {" "}
          {/* Arabic Flag Icon */}{" "}
          <button
            onClick={() => changeLanguage("ar")}
            title="Arabic"
            className="text-white"
          >
            {" "}
            🇾🇪{" "}
          </button>{" "}
          {/* Turkish Flag Icon */}{" "}
          <button
            onClick={() => changeLanguage("tr")}
            title="Turkish"
            className="text-white"
          >
            {" "}
            🇹🇷{" "}
          </button>{" "}
          {/* English Flag Icon */}{" "}
          <button
            onClick={() => changeLanguage("en")}
            title="English"
            className="text-white"
          >
            {" "}
            🇬🇧{" "}
          </button>{" "}
        </div>
      </div>
    </div>
  );
};

export default FloatingMenu;
