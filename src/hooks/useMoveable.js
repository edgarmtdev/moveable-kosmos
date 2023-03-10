import { useState } from "react";

// Create a new moveable component and add it to the array
const COLORS = ["red", "blue", "yellow", "green", "purple"];

const useMoveable = () => {
  const [moveableComponents, setMoveableComponents] = useState([]);
  const [selected, setSelected] = useState(null);

  /**
   * Through a random id it brings information from the api
   * @param {number} id
   * @returns
   */
  const fetchData = async (id) => {
    const resp = await fetch(
      `https://jsonplaceholder.typicode.com/photos/${id}`
    );
    const data = await resp.json();
    return data;
  };

  /**
   * Use the function to retrieve information and generate a new component
   */
  const addMoveable = () => {
    const photoId = Math.floor(Math.random() * 100);

    fetchData(photoId).then((resp) => {
      setMoveableComponents([
        ...moveableComponents,
        {
          id: Math.floor(Math.random() * Date.now()),
          top: 0,
          left: 0,
          width: 100,
          height: 100,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          updateEnd: true,
          imgUrl: resp.url,
        },
      ]);
    });
  };

  const updateMoveable = (id, newComponent, updateEnd = false) => {
    const updatedMoveables = moveableComponents.map((moveable, i) => {
      if (moveable.id === id) {
        return { id, ...newComponent, updateEnd };
      }
      return moveable;
    });
    setMoveableComponents(updatedMoveables);
  };

  const handleResizeStart = (index, e) => {
    console.log("e", e.direction);
    // Check if the resize is coming from the left handle
    const [handlePosX, handlePosY] = e.direction;
    // 0 => center
    // -1 => top or left
    // 1 => bottom or right

    // -1, -1
    // -1, 0
    // -1, 1
    if (handlePosX === -1) {
      console.log("width", moveableComponents, e);
      // Save the initial left and width values of the moveable component
      const initialLeft = e.left;
      const initialWidth = e.width;

      // Set up the onResize event handler to update the left value based on the change in width
    }
  };

  return {
    moveableComponents,
    setMoveableComponents,
    selected,
    setSelected,
    addMoveable,
    updateMoveable,
    handleResizeStart,
  };
};

export default useMoveable;
