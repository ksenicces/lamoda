import React from "react";
import Todo from "./Todo";
import styles from "./index.module.css";

class TodoContainer extends React.Component {
  render() {
    const { todos, onTodoChecked, onTodoDelete } = this.props;
    return (
      <div className={styles.listContainer}>
        <ul>
          {todos.length > 0 ? (
            todos.map((todo, index) => (
              <Todo
                key={todo.id}
                todo={todo}
                onTodoChecked={onTodoChecked(index)}
                onTodoDelete={onTodoDelete(index)}
              />
            ))
          ) : (
            <li className={styles.liMessage}>
              По вашим критериям ничего не найдено.
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default TodoContainer;