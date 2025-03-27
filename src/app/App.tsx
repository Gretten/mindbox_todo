import { TodoApp } from "@features/todoApp";
import styles from "./global.module.css";
import { TodoLayout } from "./layout/TodoLayout";
function App() {
  return (
    <>
      <div className={styles.app}>
          <TodoLayout>
            <TodoApp />
          </TodoLayout>
      </div>
    </>
  );
}

export default App;
