import cngSpecs from "../../data/cngSpecs.json";

const CngSpecsDownload = () => (
  <section className="mt-16 pb-12 px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 animate-fadeIn">
      CNG Generator Specifications
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cngSpecs.map((spec, idx) => (
        <a
          key={idx}
          href={`/pdfs/cng/${spec.file}`}
          download
          className="group flex flex-col justify-between bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-lg hover:border-blue-500 transition-all duration-300 ease-in-out"
        >
          <span className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {spec.name}
          </span>
          <span className="mt-3 text-sm text-blue-500 font-semibold group-hover:underline flex items-center gap-1">
            Download PDF
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </a>
      ))}
    </div>
  </section>
);

export default CngSpecsDownload;
