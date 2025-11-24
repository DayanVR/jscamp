import { useEffect, useState } from "react";
import { Pagination } from "../components/Pagination.jsx";
import { SearchFormSection } from "../components/SearchFormSection.jsx";
import { JobListings } from "../components/JobListings.jsx";
import { useRouter } from "../hooks/useRouter.jsx";
import { useSearchParams } from "react-router";

const RESULTS_PER_PAGE = 4;

const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    technology: searchParams.get("technology") || "",
    location: searchParams.get("location") || "",
    experienceLevel: searchParams.get("experienceLevel") || "",
  });

  const [textToFilter, setTextToFilter] = useState(() => searchParams.get("text") || "");

  const [currentPage, setCurrentPage] = useState(() => {
    const page = Number(searchParams.get("page"));
    return Number.isNaN(page) ? page : 1;
  });

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const { navigateTo } = useRouter();

  const hasActiveFilters =
    filters.technology || filters.location || filters.experienceLevel || textToFilter;

  const handleClearFilters = () => {
    setFilters({
      technology: "",
      location: "",
      experienceLevel: "",
    });
    setTextToFilter("");
    setCurrentPage(1);
  };

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if (textToFilter) params.append("text", textToFilter);
        if (filters.technology) params.append("technology", filters.technology);
        if (filters.location) params.append("type", filters.location);
        if (filters.experienceLevel) params.append("level", filters.experienceLevel);

        const offset = (currentPage - 1) * RESULTS_PER_PAGE;
        params.append("limit", RESULTS_PER_PAGE);
        params.append("offset", offset);

        const queryParams = params.toString();

        const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`);
        const json = await response.json();

        setJobs(json.data);
        setTotal(json.total);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [filters, textToFilter, currentPage]);

  useEffect(() => {
    setSearchParams((params) => {
      if (textToFilter) params.set("text", textToFilter);
      if (filters.technology) params.set("technology", filters.technology);
      if (filters.location) params.set("location", filters.location);
      if (filters.experienceLevel) params.set("experienceLevel", filters.experienceLevel);

      if (currentPage > 1) params.set("page", currentPage);

      return params;
    });
  }, [filters, currentPage, textToFilter, navigateTo, setSearchParams]);

  const totalPages = Math.ceil(total / RESULTS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (filters) => {
    setFilters(filters);
    setCurrentPage(1);
  };

  const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter);
    setCurrentPage(1);
  };
  return {
    jobs,
    total,
    totalPages,
    handlePageChange,
    handleSearch,
    handleTextFilter,
    currentPage,
    loading,
    hasActiveFilters,
    handleClearFilters,
    textToFilter,
  };
};

export default function SearchPage() {
  const {
    totalPages,
    handlePageChange,
    handleSearch,
    handleTextFilter,
    currentPage,
    jobs,
    total,
    handleClearFilters,
    textToFilter,
    hasActiveFilters,
    loading,
  } = useFilters();

  useEffect(() => {
    document.title = `Resultados: ${total}, Pagina ${currentPage} - DevJobs`;
  }, [currentPage, total]);

  return (
    <main>
      <SearchFormSection
        onSearch={handleSearch}
        onTextFilter={handleTextFilter}
        initialText={textToFilter}
      />
      {hasActiveFilters && (
        <button className="clear-filters" onClick={handleClearFilters}>
          Limpiar filtros
        </button>
      )}

      <section>
        {loading ? <p>Cargando empleos...</p> : <JobListings jobs={jobs} />}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </main>
  );
}
