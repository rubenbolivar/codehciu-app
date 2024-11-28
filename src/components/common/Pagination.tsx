interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
  }
  
  export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  
    return (
      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 border'
          }`}
        >
          Anterior
        </button>
  
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border'
            }`}
          >
            {page}
          </button>
        ))}
  
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 border'
          }`}
        >
          Siguiente
        </button>
      </div>
    )
  }