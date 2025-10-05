import { useState } from "react";

function App() {
  const [taskList, setTaskList] = useState<string[]>(["Hello", "World"]);
  const [doneList, setDoneList] = useState<string[]>([]);

  return (
    <div className="flex">
      <div className="flex flex-col gap-3 bg-amber-100 p-4 flex-1 items-center">
        <p>まだ</p>
        {taskList.map((item, index) => (
          <Bar key={item}>{item}</Bar>
        ))}
      </div>
      <div
        className="flex flex-col gap-3 bg-red-100 p-4 flex-1 items-center hover:bg-red-400"
        onDragStart={() => {
          console.log("[Drag Zone]: drag start");
        }}
        onDrag={() => {
          console.log("[Drag Zone]: drag");
        }}
        onDragEnter={() => {
          console.log("[Drag Zone]: drag enter");
        }}
        onDragLeave={() => {
          console.log("[Drag Zone]: drag leave");
        }}
        onDragOver={() => {
          console.log("[Drag Zone]: drag over");
        }}
        onDragEnd={() => {
          console.log("[Drag Zone]: drag end");
        }}
        onDrop={(e) => {
          console.log("[Drag Zone]: drop");
          e.preventDefault();
          const text = e.dataTransfer.getData("text");
          setTaskList((prev) => prev.filter((item) => item !== text));
          setDoneList((prev) => [...prev, text]);
        }}
      >
        <p>できた</p>
        {doneList.map((item, index) => (
          <Bar key={item}>{item}</Bar>
        ))}
      </div>
    </div>
  );
}

export default App;

type BarProps = {
  className?: string;
  children: string;
};
export const Bar = (props: BarProps) => {
  const { className, children } = props;

  return (
    <div
      draggable={true}
      onDrag={() => {
        console.log("[Drag Target]: drag");
      }}
      onDragStart={(e) => {
        console.log("[Drag Target]: drag start");
        e.dataTransfer.setData("text", children);
      }}
      onDragEnter={() => {
        console.log("[Drag Target]: drag enter");
      }}
      onDragLeave={() => {
        console.log("[Drag Target]: drag leave");
      }}
      onDragOver={() => {
        console.log("[Drag Target]: drag over");
      }}
      onDragEnd={() => {
        console.log("[Drag Target]: drag end");
      }}
      onDrop={(e) => {
        console.log("[Drag Target]: drop");
      }}
      className={`bg-blue-400 p-20 max-w-2xs flex items-center justify-center ${className}`}
    >
      {children}
    </div>
  );
};
