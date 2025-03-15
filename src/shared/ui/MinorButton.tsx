import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button/Button";

interface MinorButtonProps {
  active?: boolean;
}

/**
 * Кнопка с минимальным стилем
 * Используется в панели фильтров
 * Принимает параметр active, который определяет, активна ли кнопка
 */
export const MinorButton = styled(Button)<MinorButtonProps>(({ active }) => ({
  fontSize: "12px",
  color: "gray",
  backgroundColor: active ? "#ebebeb;" : "transparent",
}));
