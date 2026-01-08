import { useState, useMemo } from "react";
import { Search, Filter, GraduationCap, Award, Calendar, DollarSign, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<"all" | "scholarship" | "certification">("all");

  const opportunities = [
    {
      id: "1",
      title: "Google Developer Scholarship",
      type: "scholarship",
      provider: "Google",
      amount: "$10,000",
      deadline: "Mar 15, 2024",
    },
    {
      id: "2",
      title: "AWS Solutions Architect Certification",
      type: "certification",
      provider: "Amazon Web Services",
      amount: "$300",
      deadline: "Dec 31, 2024",
    },
    {
      id: "3",
      title: "Microsoft Azure AI Certification",
      type: "certification",
      provider: "Microsoft",
      amount: "$165",
      deadline: "Dec 31, 2024",
    },
    {
      id: "4",
      title: "Gates Cambridge Scholarship",
      type: "scholarship",
      provider: "Gates Cambridge Trust",
      amount: "Full Tuition",
      deadline: "Oct 16, 2024",
    },
  ];

  const results = useMemo(() => {
    return opportunities.filter(o => {
      const matchesSearch =
        o.title.toLowerCase().includes(search.toLowerCase()) ||
        o.provider.toLowerCase().includes(search.toLowerCase());

      const matchesType = type === "all" || o.type === type;

      return matchesSearch && matchesType;
    });
  }, [search, type]);

  return (
    <div className="min-h-screen pt-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="border rounded-lg p-4 mb-6">
          <h1 className="text-2xl font-semibold">Explore Opportunities</h1>
          <p className="text-sm text-gray-500">Find scholarships and certifications</p>
        </div>

        {/* Search + Filter */}
        <div className="border rounded-lg p-4 mb-6">
          <div className="flex gap-2 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                className="w-full border rounded-md pl-9 pr-3 py-2 text-sm"
                placeholder="Search scholarships or certifications..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter size={18} />
              <select
                value={type}
                onChange={e => setType(e.target.value as any)}
                className="border rounded-md px-2 py-2 text-sm"
              >
                <option value="all">All</option>
                <option value="scholarship">Scholarships</option>
                <option value="certification">Certifications</option>
              </select>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Showing {results.length} opportunities
          </p>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map(item => (
            <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
              {/* Icon */}
              <div className="w-10 h-10 border rounded-md flex items-center justify-center mb-2">
                {item.type === "scholarship" ? (
                  <GraduationCap size={18} />
                ) : (
                  <Award size={18} />
                )}
              </div>

              <h2 className="font-semibold text-sm">{item.title}</h2>
              <p className="text-xs text-gray-500">{item.provider}</p>

              <div className="flex justify-between items-center mt-3 text-sm">
                <span className="flex items-center gap-1">
                  <DollarSign size={14} />
                  {item.amount}
                </span>

                <span className="flex items-center gap-1 text-gray-500 text-xs">
                  <Calendar size={12} />
                  {item.deadline}
                </span>
              </div>

              <button className="mt-4 w-full border rounded-md py-2 text-sm flex justify-center gap-2 hover:bg-gray-100">
                View Details
                <ExternalLink size={14} />
              </button>
            </div>
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center py-16">
            <p className="text-sm text-gray-500">No opportunities found</p>
          </div>
        )}
      </div>
    </div>
  );
}
