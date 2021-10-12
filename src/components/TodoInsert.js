import React, { useState, useEffect } from "react";
import { MdAddCircle } from "react-icons/md";
import { TiTrash, TiPencil } from "react-icons/ti";
import "./TodoInsert.css";

const TodoInsert = ({
  onInsertToggle,
  onInsertTodo,
  selectedTodo,         // <-- 얘들은 구조 분해 할당으로 불러온 인자 값
  onRemove,
  onUpdate
}) => {
  const [value, setValue] = useState(""); // useState를 이용한 기본값과 추후 업데이트 될 값 설정. 기본값은 빈 문자열

  const onChange = e => {
    setValue(e.target.value); //변화가 일어나면 e.target.value가 삽입된다. 즉 input이 변결될 때 마다 실행된다
  };

  const onSubmit = e => {
    e.preventDefault(); // form 형식의 속성으로서 submit 버튼을 실행하면 form을 서버에 제출하도록 설정되어있는데 그것을 막아주는 역할
    onInsertTodo(value); //Submit 버튼 클릭시 현재 입력한 값이 하나의 Todo로서 TodoList에 들어감 .현재 value는 text. 즉 text 삽입
    setValue(""); //값을 빈 문자열로 초기화 시켜줌.
    onInsertToggle(); // 모달 창이 닫히게 하는 역할
  };

  useEffect(() => { //컴포넌트가 처음 렌더링 될 때 어떤것을 실행시킬지
    if (selectedTodo) { // 선택된 Todo
      setValue(selectedTodo.text); // 선택된 Todo의 Text 값을 보여준다
    }
  }, [selectedTodo]);
  return (
    <div>
      <div className="background" onClick={onInsertToggle}></div> {/* background 클릭시 토글이 사라지고 이전 효과로 돌아감 */}
      <form
        onSubmit={
          selectedTodo
            ? () => {
                onUpdate(selectedTodo.id, value);
              }
            : onSubmit
        }
      >
        <input
          placeholder="please type"
          value={value} // 기본값
          onChange={onChange} // 업데이트될 값
        ></input>
        {selectedTodo ? (
          <div className="rewrite">
            <TiPencil
              onClick={() => {
                onUpdate(selectedTodo.id, value);
              }}
            />
            <TiTrash
              onClick={() => {
                onRemove(selectedTodo.id);
              }}
            />
          </div>
        ) : (
          <button type="submit"> {/* submit 버튼은 따로 기능을 만들지 않으면 클릭시 새로고침되는 특징이있다 */}
            <MdAddCircle />
          </button>
        )}
      </form>
    </div>
  );
};

export default TodoInsert;