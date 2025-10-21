import { useState } from "react";
import { Search, SlidersHorizontal, X, Tag, Briefcase } from "lucide-react";
import clsx from "clsx";
import Button from "@/components/ui/Button";

interface SkillListing {
  id: number;
  name: string;
  role: string;
  offering: string;
  seeking: string;
  image: string;
}

const listings: SkillListing[] = [
  {
    id: 1,
    name: "Sophia Carter",
    role: "UI/UX Designer",
    offering: "UI/UX Design",
    seeking: "Frontend Development",
    image: "https://img.icons8.com/office/40/person-male.png",
  },
  {
    id: 2,
    name: "Ethan Bennett",
    role: "Web Developer",
    offering: "React Development",
    seeking: "Copywriting",
    image: "https://img.icons8.com/office/40/person-male.png",
  },
  {
    id: 3,
    name: "Lily Anderson",
    role: "Digital Marketer",
    offering: "Social Media Marketing",
    seeking: "Logo Design",
    image: "https://img.icons8.com/office/40/person-male.png",
  },
];

const categories = ["All", "Design", "Development", "Marketing"];

const Listing = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Filtered results
  const filteredListings = listings.filter((l) => {
    const matchesCategory =
      activeCategory === "All" ||
      l.offering.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.offering.toLowerCase().includes(search.toLowerCase()) ||
      l.seeking.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white px-4 py-5 md:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">
          Browse Skills
        </h1>

        {/* Filter Icon */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          aria-label="Open Filters"
        >
          <SlidersHorizontal size={22} className="text-gray-700" />
        </button>
      </div>


      {/* Search Input */}
      <div className="relative mb-5">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search skills, people or trades..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-3 overflow-x-auto pb-2 mb-6 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={clsx(
              "px-5 py-2 rounded-full text-sm font-medium transition whitespace-nowrap",
              activeCategory === cat
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skill Cards */}
      <div className="grid sm:grid-cols-2 gap-5">
        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            className="border border-gray-100 rounded-2xl shadow-sm p-5 hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={listing.image}
                alt={listing.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {listing.name}
                </h2>
                <p className="text-sm text-gray-500">{listing.role}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <Tag size={16} className="text-red-500" />
                <span className="text-sm text-gray-700">
                  <span className="font-medium text-gray-900">Offering:</span>{" "}
                  {listing.offering}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-gray-500" />
                <span className="text-sm text-gray-700">
                  <span className="font-medium text-gray-900">Seeking:</span>{" "}
                  {listing.seeking}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-2 text-sm">
                View Profile
              </Button>
            </div>
          </div>
        ))}

        {filteredListings.length === 0 && (
          <p className="text-center text-gray-500 col-span-full mt-10">
            No results found.
          </p>
        )}
      </div>

      {/* Filter Drawer */}
      {isFilterOpen && (
  <div className="fixed inset-0 bg-black/20 z-50 flex justify-center items-end md:items-center">
    {/* Drawer Content */}
    <div className="backdrop-blur-md bg-white/70 w-full md:max-w-md rounded-t-2xl md:rounded-2xl shadow-lg p-6 border border-white/30">
      {/* Drawer Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <button
          onClick={() => setIsFilterOpen(false)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <X size={20} />
        </button>
      </div>

      {/* Example filter checkboxes */}
      <div className="space-y-3 mb-5">
        <label className="flex items-center gap-2 text-gray-700">
          <input type="checkbox" className="accent-red-600" /> Remote Only
        </label>
        <label className="flex items-center gap-2 text-gray-700">
          <input type="checkbox" className="accent-red-600" /> Verified Users
        </label>
        <label className="flex items-center gap-2 text-gray-700">
          <input type="checkbox" className="accent-red-600" /> With Portfolio
        </label>
      </div>

      <Button
        fullWidth
        onClick={() => setIsFilterOpen(false)}
        className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
      >
        Apply Filters
      </Button>
    </div>
  </div>
)}

    </div>
  );
};

export default Listing;
