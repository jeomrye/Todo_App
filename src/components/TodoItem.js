import React from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import "./TodoItem.css";

const TodoItem = ({
  todo,
  onCheckToggle,
  onInsertToggle,
  onChangeSelectedTodo
}) => {
  const { id, text, checked } = todo;
  return (
    <div className="TodoItem">
      <div className={`content ${checked ? "checked" : ""}`}>
        {checked ? (
          <MdCheckBox
            onClick={() => {
              onCheckToggle(id);
            }}
          />
        ) : (
          <MdCheckBoxOutlineBlank
            onClick={() => {
              onCheckToggle(id);
            }}
          />
        )}
        <div
          className="text" 
          onClick={() => {
            onChangeSelectedTodo(todo);
            onInsertToggle(); // 각각의 TodoItem들의 Text를 클릭할 시 TodoInsert 컴포넌트를 불러와야 하기에 onInsertToggle 함수가 사용됨
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;