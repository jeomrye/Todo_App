import React, { useState } from "react";
import "./App.css";
import Template from "./components/Template";
import TodoList from "./components/TodoList";
import { MdAddCircle } from "react-icons/md";
import TodoInsert from "./components/TodoInsert";
import SortableComponent from "./components/Drag_Drop"


/* Application의 구조를 담당할 Template 컴포넌트를 만들었고
할 일의 목록을 담고 있는 TodoList 컴포넌트
그리고 그 목록 하나의 아이템을 담당하는 TodoItem 컴포넌트를 만들어주고
Todo를 입력할 TodoInsert라는 컴포넌트를 만들어줬다 */

/* 오늘 할 일 ( ) 안에 App.js에서 Template 태그 안에 todoLength라는  속성을 넣고 속성값으로 todos.length를 넣어줘서 할 일의 개수만큼 늘어나도록 했다 (todos의 배열 길이만큼 반환) */


let nextId = 4; //nextId가 함수 안에 있으면 함수가 리렌더링 될 때마다 계속해서 처음 값으로 돌아가기 때문에 함수 밖에 선언함

const App = () => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "할일 1",
      checked: true
    },
    {
      id: 2,
      text: "할일 2",
      checked: false
    },
    {
      id: 3,
      text: "할일 3",
      checked: true
    }
  ]);

  const onInsertToggle = () => {
    if (selectedTodo) {
      setSelectedTodo(null); // TodoInsert 컴포넌트에서 selectedTodo가 있는 경우 null값을 주도록 함 (Todo 클릭 후 OnInsertToggle 클릭시 이전에 선택되었던 Todo값이 남아 있지 않게하기 위함)
    }
    setInsertToggle(prev => !prev); /* 이전 값의 Boolean 값을 반대로 바꿔주는 함수를 리턴하는 것 같다 */
  };

  const onInsertTodo = text => { //Todo 삽입 함수
    if (text === "") { // TodoInsert에 input에 값을 넣지 않으면 실행되는 조건문 
      return alert("할 일을 입력해주세요.");
    } else {
      const todo = { // 기본으로 작성해둔 데이터가 객체 형식으로 되어 있기 때문에 추후에 들어올 데이터 또한 객체 형식으로 작성했다
        id: nextId,
        text,
        checked: false
      };

      //React에서는 배열에 값을 추가할 때 보통 push함수 대신 Concat 함수를 사용한다
      //concat함수를 사용하면 새 배열이 리턴되고 기존 배열은 변경되지 않지만 push는 기존 값을 변경한다
      setTodos(todos => todos.concat(todo)); //concat을 사용하여 상태의 불변성을 지켜준다
      nextId++;
    }
  };

  const onCheckToggle = id => { //Toggle Check 함수
    setTodos(todos =>
      todos.map(todo => //todo를 받고
        todo.id === id ? { ...todo, checked: !todo.checked } : todo // todo.id와 인자의 id가 일치한다면 todo가 가지고 있는 객체 속성을 모두 가져오고 checked의 값을 반대로 바꿔준다. 만약 같지 않다면 todo를 반환한다 
      )
    );
  };

  const onChangeSelectedTodo = todo => { // 하나의 Todo의 Text 클릭시 TodoInsert의 input에 Todo의 Text가 불려와지게 하는 역할 
    setSelectedTodo(todo);
  };

  const onRemove = id => {
    onInsertToggle(); // 삭제 기능이 실행되면 창이 닫히게 하는 역할
    setTodos(todos => todos.filter(todo => todo.id !== id));
  };

  const onUpdate = (id, text) => {
    onInsertToggle(); // 수정 기능이 완료되면 창이 닫힘
    setTodos(todos =>
      todos.map(todo => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  return (
    <Template todoLength={todos.length}>
        <TodoList
          todos={todos}
          onCheckToggle={onCheckToggle}
          onInsertToggle={onInsertToggle}
          onChangeSelectedTodo={onChangeSelectedTodo}
      />
      <SortableComponent />
      <div className="add-todo-button" onClick={onInsertToggle}>
        {" "}
        {/* 플러스 버튼을 눌렀을 시 TodoInsert 컴포넌트를 불러옴  */}
        <MdAddCircle />
      </div>
      {insertToggle && (
        <TodoInsert
          selectedTodo={selectedTodo}
          onInsertToggle={
            onInsertToggle
          } /* popup의 background 클릭시 TodoInsert 컴포넌트의 css 효과가 사라지고 Template 컴포넌트 화면으로 돌아감*/
          onInsertTodo={
            onInsertTodo
          } /* insertToggle useState 초기 값을 false로 지정해주었기 때문에 화면에 나오지 않는 상태 */
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      )}
    </Template>
  );
};

export default App;