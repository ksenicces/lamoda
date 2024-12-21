import React from "react";
import styles from "./index.module.css";

class Filters extends React.Component {
  render() {
    const {
      filters,
      onToggleHideCompleted,
      onSearch,
      onCheckboxChange,
      filtersVisible,
      onToggleFilters,
    } = this.props;

    const hideCompleted = filters.find(f => f.type === "hideCompleted").value;
    const searchQuery = filters.find(f => f.type === "searchQuery").value;
    const selectedSeverities = filters.find(f => f.type === "selectedSeverities").value;

    const severities = ["Важно", "Средне", "Не важно"];

    return (
      <div>
        <h3 className={styles.filtersText}>
          Фильтры{" "}
          <span onClick={onToggleFilters} className={styles.toggleArrow}>
            {filtersVisible ? "ᨈ" : "ᨆ"}
          </span>
        </h3>

        {filtersVisible && (
          <div className={styles.filterContainer}>
            <div className={styles.filterItem}>
              <input
                type="checkbox"
                checked={hideCompleted}
                onChange={onToggleHideCompleted}
                className={styles.checkbox}
              />
              <span className={styles.hideText}>Скрыть выполненные</span>
            </div>

            <div className={styles.filterItem}>
              <h4 className={styles.filterText}>
                Поиск определенных задач:
              </h4>
              <input
                type="text"
                placeholder="Введите текст..."
                value={searchQuery}
                onChange={onSearch}
                className={styles.findInput}
              />
            </div>

            <div className={styles.filterItem}>
              <h4 className={styles.filterText}>Фильтр по важности:</h4>
              <div className={styles.filterSeverities}>
                {severities.map((severity) => (
                  <label key={severity} className={styles.filterSeverities}>
                    <input
                      type="checkbox"
                      checked={selectedSeverities.includes(severity)}
                      onChange={() => onCheckboxChange(severity)}
                      className={styles.checkbox}
                    />
                    <span className={styles.severityText}>
                      {severity.charAt(0).toUpperCase() + severity.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Filters;