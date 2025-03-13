import { FC } from "react";
import styles from "./styles.module.css";

type TodoLayoutProps = FC<{
  children: React.ReactNode;
}>;

export const TodoLayout: TodoLayoutProps = ({ children }) => {
  return <div className={styles["layout-container"]}>{children}</div>;
};
