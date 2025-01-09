import React, { useState } from "react";
import { FaCommentDots, FaHeart, FaGlobe } from "react-icons/fa";

const FloatingMenu = () => {
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
    // Store the initial mouse position for drag calculation
    setDragging(true);
    setInitialMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      // Calculate the distance moved and update position
      const deltaX = e.clientX - initialMousePosition.x;
      const deltaY = e.clientY - initialMousePosition.y;
      setPosition({
        x: position.x + deltaX,
        y: position.y + deltaY,
      });
      setInitialMousePosition({ x: e.clientX, y: e.clientY }); // Update mouse position for next move
    }
  };

  const handleMouseUp = () => {
    // Stop dragging and snap to nearest boundary (left or right)
    setDragging(false);
    snapToClosestPosition();
  };

  const snapToClosestPosition = () => {
    const { x } = position;

    if (x < window.innerWidth / 3) {
      setPosition({
        x: 5, // Left side
        y: position.y,
      });
    } else if (x > (2 * window.innerWidth) / 3) {
      setPosition({
        x: window.innerWidth - 55, // Right side
        y: position.y,
      });
    } else {
      setPosition({
        x: window.innerWidth / 2 - 50, // Center
        y: position.y,
      });
    }
  };

  const moveToPosition = (x, y) => {
    setPosition({ x, y });
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="fixed w-12 h-60 bg-gray-500 rounded-full flex flex-col-reverse items-center justify-around text-white shadow-lg z-50"
        style={{
          top: `${position.y}px`,
          left: `${position.x}px`,
          cursor: dragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Stop drag if mouse leaves the element
      >
        <FaCommentDots />
        <FaHeart />
        <FaGlobe />
      </div>

      {/* Buttons for left and right positioning */}
      {/* <div className="fixed bottom-0 left-0 m-4 flex space-x-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mx-4"
          onClick={() => moveToPosition(5, window.innerHeight / 2 - 50)}
        >
          Left
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() =>
            moveToPosition(window.innerWidth - 55, window.innerHeight / 2 - 50)
          }
        >
          Right
        </button>
      </div> */}
    </div>
  );
};

export default FloatingMenu;
