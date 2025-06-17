import type { ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string | ReactNode;
  render: (row: T) => ReactNode;
}
