import React from "react";
import styles from "./index.module.css";

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      visibleDescription: false,
    };
  }

  switchDescription = () => {
    this.setState(({ visibleDescription }) => ({
      visibleDescription: !visibleDescription,
    }));
  };

  render() {
    const { todo, onTodoChecked, onTodoDelete } = this.props;
    const { isHovered, visibleDescription } = this.state;

    return (
      <li
        className={todo.checked ? styles.checked : styles.todoItem}
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
      >
        <input
          type="checkbox"
          checked={todo.checked}
          onChange={onTodoChecked}
        />
        <div className={styles.todoContent}>
          <span className={styles.todoName}>{todo.name}</span>
          <span className={styles.todoSeverity}>Важность: {todo.severity}</span>
          <span className={styles.todoDate}>{todo.createdAt}</span>
        </div>

        <span
          onClick={this.switchDescription}
          className={styles.switchDescription}
        >
          {visibleDescription ? "ᨈ" : "ᨆ"}
        </span>

        {visibleDescription && (
          <div className={styles.visibleDescription}>{todo.description}</div>
        )}

        {isHovered && (
          <button onClick={onTodoDelete} className={styles.deleteButton}>
            Удалить
          </button>
        )}
      </li>
    );
  }
}

export default Todo;