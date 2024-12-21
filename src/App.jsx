import React from "react";
import styles from "./index.module.css";
import TodoContainer from "./TodoContainer";
import Filters from "./Filters";
import Severities from "./Severities";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      title: "",
      description: "",
      todos: [],
      filters: [
        { type: "hideCompleted", value: false },
        { type: "searchQuery", value: "" },
        { type: "selectedSeverities", value: [] },
      ],
      newSeverity: "Важно",
      filtersVisible: false,
    };

    this.generateId = this.generateId.bind(this);
  }

  componentDidMount() {
    console.log("Компонент смонтирован");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todos !== this.state.todos) {
      this.state.todos.forEach((todo, index) => {
        const prevTodo = prevState.todos[index];
        if (prevTodo && prevTodo.checked !== todo.checked) {
          console.log(
            `Задача "${todo.name}" обновлена: ${
              todo.checked ? "выполнена" : "не выполнена"
            }`
          );
        }
      });
    }
  }

  updateFilter = (filterType, value) => {
    this.setState((prevState) => ({
      filters: prevState.filters.map((filter) =>
        filter.type === filterType ? { ...filter, value } : filter
      ),
    }));
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleTodoAdd = () => {
    const { title, description, newSeverity } = this.state;

    if (!this.isValidInput(title) || !newSeverity) {
      return;
    }

    const newTodo = {
      id: this.generateId(),
      name: title.trim(),
      description: description.trim(),
      checked: false,
      createdAt: new Date().toLocaleString(),
      severity: newSeverity,
    };

    this.setState((prevState) => ({
      title: "",
      description: "",
      newSeverity: "",
      todos: [newTodo, ...prevState.todos],
    }));
  };

  isValidInput = (title) => {
    const minLength = 3;
    const unacceptable = /[@#$%^&*_+\-=[]{};'"\\|<>\/]+/;

    return (
      title.trim() !== "" &&
      title.length >= minLength &&
      !unacceptable.test(title)
    );
  };

  handleTodoChecked = (index) => (e) => {
    const newTodos = this.state.todos
      .map((todo, i) =>
        i === index ? { ...todo, checked: e.target.checked } : todo
      )
      .sort((a, b) => a.checked - b.checked);

    this.setState({
      todos: newTodos,
    });
  };

  handleTodoDelete = (index) => () => {
    const newTodos = this.state.todos.filter((_, i) => i !== index);
    this.setState({ todos: newTodos });
  };

  handleChoiceChange = (event) => {
    this.setState({ newSeverity: event.target.value });
  };

  handleToggleHideCompleted = () => {
    const currentValue = this.state.filters.find(f => f.type === "hideCompleted").value;
    this.updateFilter("hideCompleted", !currentValue);
  };

  handleSearch = (e) => {
    this.updateFilter("searchQuery", e.target.value.toLowerCase());
  };

  handleCheckboxChange = (severity) => {
    const currentSeverities = this.state.filters.find(f => f.type === "selectedSeverities").value;

    if (currentSeverities.includes(severity)) {
      this.updateFilter("selectedSeverities", currentSeverities.filter(s => s !== severity));
    } else {
      this.updateFilter("selectedSeverities", [...currentSeverities, severity]);
    }
  };

  generateId() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  handleToggleFilters = () => {
    this.setState((prevState) => ({
      filtersVisible: !prevState.filtersVisible,
    }));
  };

  handleAddMultipleTasks = () => {
    const todoTask = [...Array(1000).keys()].map((i) => ({
      id: this.generateId(),
      name: `Задача ${i + 1}`,
      description: `Описание задачи ${i + 1}`,
      checked: false,
      createdAt: new Date().toLocaleString(),
      severity: this.getRandomChoice(),
    }));

    this.setState((prevState) => ({
      todos: [...todoTask, ...prevState.todos],
    }));
  };

  getRandomChoice() {
    const severities = ["Важно", "Средне", "Не важно"];
    return severities[Math.floor(Math.random() * severities.length)];
  }

  render() {
    const filteredTodos = this.state.todos.filter((todo) => {
      const searchQuery = this.state.filters.find(f => f.type === "searchQuery").value;
      const hideCompleted = this.state.filters.find(f => f.type === "hideCompleted").value;
      const selectedSeverities = this.state.filters.find(f => f.type === "selectedSeverities").value;

      const matchesSearch =
        todo.name.toLowerCase().includes(searchQuery) ||
        todo.description.toLowerCase().includes(searchQuery);

      const fitChoice =
        selectedSeverities.length === 0 ||
        selectedSeverities.includes(todo.severity);

      const matchesCompletion = !hideCompleted || !todo.checked;

      return matchesSearch && fitChoice && matchesCompletion;
    });

    return (
      <div className={styles.container}>
        <h1>ToDoList</h1>

        <div className={styles.inputContainer}>
          <div className={styles.flexContainer}>
            <input
              name="title"
              placeholder="Введите название"
              className={styles.taskInput}
              value={this.state.title}
              onChange={this.handleInputChange}
            />
            <button
              onClick={this.handleTodoAdd}
              className={styles.addButton}
              disabled={!this.state.newSeverity}
            >
              Добавить
            </button>
            <button
              onClick={this.handleAddMultipleTasks}
              className={styles.addButton1000}
            >
              Добавить 1000 задач
            </button>
          </div>

          <input
            name="description"
            placeholder="Введите описание"
            value={this.state.description}
            className={styles.descriptionInput}
            onChange={this.handleInputChange}
          />

          <Severities
            newSeverity={this.state.newSeverity}
            onChange={this.handleChoiceChange}
          />

          <Filters
            filters={this.state.filters}
            onToggleHideCompleted={this.handleToggleHideCompleted}
            onSearch={this.handleSearch}
            onCheckboxChange={this.handleCheckboxChange}
            filtersVisible={this.state.filtersVisible}
            onToggleFilters={this.handleToggleFilters}
          />
        </div>

        <TodoContainer
          todos={filteredTodos}
          onTodoChecked={this.handleTodoChecked}
          onTodoDelete={this.handleTodoDelete}
        />
      </div>
    );
  }
}

export default App;