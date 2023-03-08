import Component from "./components/moveable";
import useMoveable from "../../hooks/useMoveable";
import styled from "./main.module.css";

const Main = () => {
  const {
    moveableComponents,
    setMoveableComponents,
    selected,
    setSelected,
    addMoveable,
    updateMoveable,
    handleResizeStart,
  } = useMoveable();

  const deleteComponent = (id) => {
    setMoveableComponents((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  return (
    <main className={styled.main}>
      <button onClick={addMoveable} className={styled.button}>Add Moveable</button>
      <div
        id="parent"
        style={{
          position: "relative",
          background: "black",
          height: "80vh",
          marginTop: "1rem",
          borderRadius: "2px"
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
            deleteComponent={deleteComponent}
          />
        ))}
      </div>
    </main>
  );
};

export default Main;
