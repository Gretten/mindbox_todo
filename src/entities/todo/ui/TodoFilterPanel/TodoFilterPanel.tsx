import ButtonGroup from "@mui/material/ButtonGroup/ButtonGroup";
import { MinorButton } from "../../../../shared/ui/MinorButton";
import styles from "./style.module.css";
import { FC } from "react";
import { filterOptions } from "./constants";

interface TodoFilterPanelProps {
  filter: string;
  setFilter: (filter: string) => void;
  clearCompleted: () => void;
}

export const TodoFilterPanel: FC<TodoFilterPanelProps> = ({
  filter,
  setFilter,
  clearCompleted,
}) => {
  return (
    <>
      <div className={styles["control-panel-filter"]}>
        <ButtonGroup>
          {filterOptions.map(({ label, value }) => (
            <MinorButton
              key={value}
              active={filter === value}
              onClick={() => setFilter(value)}
              variant="text"
            >
              {label}
            </MinorButton>
          ))}
        </ButtonGroup>
      </div>
      <MinorButton variant="text" size="small" onClick={clearCompleted}>
        Очистить
      </MinorButton>
    </>
  );
};
