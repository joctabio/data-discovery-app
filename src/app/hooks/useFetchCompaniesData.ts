import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useFetchData } from './useFetchData';
import { CompaniesType } from '../types/company';
import { PaginationType } from '../types/pagination';
import { useSearchParams } from 'next/navigation';

type UseFetchCompaniesDataType = {
  loading: boolean;
  data: CompaniesType;
  setData: Dispatch<SetStateAction<CompaniesType>>;
  error: string | undefined;
  refetch: () => void;
  pagination: PaginationType;
};

const RESULTS_PER_PAGE = 10;

export const useFetchCompaniesData = (): UseFetchCompaniesDataType => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState<number>(Number(page));
  const [pages, setPages] = useState<number[]>([]);
  const [resultsPerPage, setResultsPerPage] =
    useState<number>(RESULTS_PER_PAGE);
  const [companies, setCompanies] = useState<CompaniesType>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentRange, setCurrentRange] = useState<{
    start: number;
    end: number;
  }>({
    start: 0,
    end: 0
  });

  // Get all companies (with pagination)
  const { loading, data, error, refetch } = useFetchData(
    `/api/companies?_page=${currentPage}&_limit=${resultsPerPage}`
  );

  // Get pagination data
  const {
    loading: loadingAllCompanies,
    data: allCompanies,
    error: errorAllCompanies,
    refetch: refetchAllCompanies
  } = useFetchData('/api/companies');

  useEffect(() => {
    if (totalPages !== 0 && currentPage > totalPages || currentPage <= 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!loadingAllCompanies && allCompanies) {
      const pagesArray = [];
      const currentRangeStart = (currentPage - 1) * resultsPerPage + 1;
      const currentRangeEnd = currentRangeStart + (resultsPerPage - 1);
      const totalPages = Math.ceil(allCompanies.length / resultsPerPage);

      for (let i = 0; i < totalPages; i++) {
        pagesArray.push(i + 1);
      }

      setTotalRecords(allCompanies.length);
      setTotalPages(totalPages);
      setPages(pagesArray);
      setCurrentRange({
        start: currentRangeStart,
        end: currentRangeEnd < totalRecords ? currentRangeEnd : totalRecords
      });
    }
  }, [
    loadingAllCompanies,
    allCompanies,
    currentPage,
    totalRecords,
    resultsPerPage
  ]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('page', currentPage.toString());
    window.history.pushState(null, '', `?${params.toString()}`);
  }, [currentPage, searchParams]);

  const next = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages]);

  const prev = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  const refreshData = useCallback(async () => {
    await refetch();
    await refetchAllCompanies();

    if (currentPage > 1) {
      setCurrentPage(1);
    }
  }, [currentPage, refetch, refetchAllCompanies, setCurrentPage]);

  useEffect(() => {
    if (!loading && data) {
      setCompanies(data);
    }
  }, [data, loading]);

  return useMemo(
    () => ({
      loading: loading || loadingAllCompanies,
      data: companies,
      setData: setCompanies,
      error,
      refetch,
      pagination: {
        currentPage,
        setCurrentPage,
        pages,
        lastPage: totalPages,
        next,
        prev,
        totalRecords,
        currentRange,
        resultsPerPage,
        setResultsPerPage,
        error: errorAllCompanies,
        refreshData
      }
    }),
    [
      loading,
      loadingAllCompanies,
      companies,
      setCompanies,
      error,
      refetch,
      currentPage,
      setCurrentPage,
      pages,
      totalPages,
      next,
      prev,
      totalRecords,
      currentRange,
      resultsPerPage,
      setResultsPerPage,
      errorAllCompanies,
      refreshData
    ]
  );
};
