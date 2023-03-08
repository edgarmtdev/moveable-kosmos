import React, { useRef, useState } from "react";
import Moveable from "react-moveable";

const Component = ({
  updateMoveable,
  top,
  left,
  width,
  height,
  index,
  color,
  imgUrl,
  id,
  setSelected,
  isSelected = false,
  updateEnd,
  deleteComponent,
  root,
}) => {
  const ref = useRef();

  const [cover, setCover] = useState(true);
  const [nodoReferencia, setNodoReferencia] = useState({
    top,
    left,
    width,
    height,
    index,
    color,
    id,
  });

  let parent = document.getElementById("parent");
  let parentBounds = parent?.getBoundingClientRect();

  /**
   * Function executed when sizing the figure
   * @param {*} e
   */
  const onResize = async (e) => {
    // ACTUALIZAR ALTO Y ANCHO
    let newWidth = e.width;
    let newHeight = e.height;

    const positionMaxTop = top + newHeight;
    const positionMaxLeft = left + newWidth;

    if (positionMaxTop > parentBounds?.height)
      newHeight = parentBounds?.height - top;
    if (positionMaxLeft > parentBounds?.width)
      newWidth = parentBounds?.width - left;

    updateMoveable(id, {
      top,
      left,
      width: newWidth,
      height: newHeight,
      color,
      imgUrl,
    });

    // ACTUALIZAR NODO REFERENCIA
    const beforeTranslate = e.drag.beforeTranslate;

    ref.current.style.width = `${e.width}px`;
    ref.current.style.height = `${e.height}px`;

    let translateX = beforeTranslate[0];
    let translateY = beforeTranslate[1];

    ref.current.style.transform = `translate(${translateX}px, ${translateY}px)`;

    setNodoReferencia({
      ...nodoReferencia,
      translateX,
      translateY,
      top: top + translateY < 0 ? 0 : top + translateY,
      left: left + translateX < 0 ? 0 : left + translateX,
    });
  };

  /**
   * Function that is executed when finishing sizing the figure
   * @param {*} e
   */
  const onResizeEnd = async (e) => {
    let newWidth = e.lastEvent?.width;
    let newHeight = e.lastEvent?.height;

    const positionMaxTop = top + newHeight;
    const positionMaxLeft = left + newWidth;

    if (positionMaxTop > parentBounds?.height)
      newHeight = parentBounds?.height - top;
    if (positionMaxLeft > parentBounds?.width)
      newWidth = parentBounds?.width - left;

    const { lastEvent } = e;
    // const { drag } = lastEvent;
    // const { beforeTranslate } = drag;

    // const absoluteTop = top + beforeTranslate[1];
    // const absoluteLeft = left + beforeTranslate[0];

    updateMoveable(
      id,
      {
        top,
        left,
        width: newWidth,
        height: newHeight,
        color,
        imgUrl,
      },
      true
    );
  };
  /**
   * Function executed when dragging the figure
   * @param {*} e 
   */
  const onDrag = (e) => {
    updateMoveable(
      id,
      {
        top: e.top,
        left: e.left,
        width,
        height,
        color,
        imgUrl,
      },
      true
    );
  };
  /**
   * Function that is executed when finishing dragging the figure
   * @param {*} E 
   */
  const onDragEnd = (E) => {
    updateMoveable(
      id,
      {
        top: top,
        left: left,
        width,
        height,
        color,
        imgUrl,
      },
      true
    );
  };

  return (
    <>
      <div
        ref={ref}
        id={"component-" + id}
        style={{
          position: "absolute",
          top: top,
          left: left,
          width: width,
          height: height,
          backgroundImage: `url("${imgUrl}")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: cover ? "contain" : "cover",
        }}
        onClick={() => setSelected(id)}
      >
        <button
          onClick={() => deleteComponent(id)}
          style={{
            border: "none",
            padding: "5px",
            fontSize: "10px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
        <button
          onClick={() => setCover(!cover)}
          style={{
            border: "none",
            marginLeft: "5px",
            padding: "5px",
            fontSize: "10px",
            cursor: "pointer",
          }}
        >
          {cover ? "Cover" : "Contain"}
        </button>
      </div>
      <Moveable
        rootContainer={root.current}
        target={isSelected && ref.current}
        resizable
        draggable
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        onResize={onResize}
        onResizeEnd={onResizeEnd}
        keepRatio={false}
        throttleResize={1}
        renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
        edge={false}
        zoom={1}
        origin={false}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
      />
    </>
  );
};

export default Component;
