import Component from "./components/moveable";
import useMoveable from "../../hooks/useMoveable";
import styled from "./main.module.css";

const Main = () => {
  const {
    moveableComponents,
    selected,
    setSelected,
    addMoveable,
    updateMoveable,
    handleResizeStart,
  } = useMoveable();

  return (
    <main className={styled.main}>
      <button onClick={addMoveable}>Add Moveable1</button>
      <div
        id="parent"
        style={{
          position: "relative",
          background: "black",
          height: "80vh",
          width: "80vw",
        }}
      >
        {moveableComponents.map((item, index) => (
          <Component
            {...item}
            key={index}
            updateMoveable={updateMoveable}
            handleResizeStart={handleResizeStart}
            setSelected={setSelected}
            isSelected={selected === item.id}
          />
        ))}
      </div>
    </main>
  );
};

export default Main;
