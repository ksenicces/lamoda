import React from "react";
import styles from "./index.module.css";

class Severities extends React.Component {
  render() {
    const { newSeverity, onChange } = this.props;
    const severities = ["Важно", "Средне", "Не важно"];
    return (
      <div className={styles.severityContainer}>
        <h3 className={styles.importanceText}>Выберите важность:</h3>
        {severities.map((severity) => (
          <label key={severity} className={styles.choiceLabel}>
            <input
              type="radio"
              name="severity"
              value={severity}
              checked={newSeverity === severity}
              onChange={onChange}
            />
            <span className={styles.severityText}>
              {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </span>
          </label>
        ))}
      </div>
    );
  }
}

export default Severities;