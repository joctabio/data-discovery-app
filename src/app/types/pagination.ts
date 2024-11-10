import { Dispatch, SetStateAction } from "react";

export type PaginationType = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  pages: number[];
  lastPage: number;
  next: () => void;
  prev: () => void;
  totalRecords: number;
  currentRange: { start: number, end: number };
  resultsPerPage: number;
  setResultsPerPage: Dispatch<SetStateAction<number>>;
  error: string;
  refreshData: () => Promise<void>;
};