import { useState } from 'react';
import { Search, SlidersHorizontal, X, Tag, Briefcase } from 'lucide-react';
import clsx from 'clsx';
import Button from '@/components/ui/Button';

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
    name: 'Sophia Carter',
    role: 'UI/UX Designer',
    offering: 'UI/UX Design',
    seeking: 'Frontend Development',
    image: 'https://img.icons8.com/office/40/person-male.png',
  },
  {
    id: 2,
    name: 'Ethan Bennett',
    role: 'Web Developer',
    offering: 'React Development',
    seeking: 'Copywriting',
    image: 'https://img.icons8.com/office/40/person-male.png',
  },
  {
    id: 3,
    name: 'Lily Anderson',
    role: 'Digital Marketer',
    offering: 'Social Media Marketing',
    seeking: 'Logo Design',
    image: 'https://img.icons8.com/office/40/person-male.png',
  },
];

const categories = ['All', 'Design', 'Development', 'Marketing'];

const Listing = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Filtered results
  const filteredListings = listings.filter((l) => {
    const matchesCategory =
      activeCategory === 'All' ||
      l.offering.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.offering.toLowerCase().includes(search.toLowerCase()) ||
      l.seeking.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white px-4 pt-5 pb-20 md:px-8 dark:bg-black">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
          Browse Skills
        </h1>

        {/* Filter Icon */}
        <button
          onClick={() => setIsFilterOpen(true)}
          className="cursor-pointer rounded-full bg-gray-100 p-2.5 transition hover:bg-gray-200 dark:bg-black/10"
          aria-label="Open Filters"
        >
          <SlidersHorizontal
            size={22}
            className="text-gray-700 dark:text-white"
          />
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-5">
        <Search
          size={18}
          className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400 dark:text-white"
        />
        <input
          type="text"
          placeholder="Search skills, people or trades..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pr-4 pl-11 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 focus:outline-none dark:bg-gray-700"
        />
      </div>

      {/* Category Tabs */}
      <div className="no-scrollbar mb-6 flex space-x-3 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={clsx(
              'cursor-pointer rounded-full px-5 py-2 text-sm font-medium whitespace-nowrap transition',
              activeCategory === cat
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-white',
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skill Cards */}
      <div className="grid gap-5">
        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            className="rounded-2xl border border-gray-100 p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="items-left flex gap-4">
              <img
                src={listing.image}
                alt={listing.name}
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="text-left">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {listing.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {listing.role}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <Tag size={16} className="text-red-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Offering:
                  </span>{' '}
                  {listing.offering}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase
                  size={16}
                  className="text-gray-500 dark:text-white"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium text-gray-900 dark:text-white">
                    Seeking:
                  </span>{' '}
                  {listing.seeking}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <Button className="w-full rounded-xl bg-red-600 py-2 text-sm text-white hover:bg-red-700">
                View Profile
              </Button>
            </div>
          </div>
        ))}

        {filteredListings.length === 0 && (
          <p className="col-span-full mt-10 text-center text-gray-500">
            No results found.
          </p>
        )}
      </div>

      {/* Filter Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/20 md:items-center">
          {/* Drawer Content */}
          <div className="w-full rounded-t-2xl border border-white/30 bg-white/70 p-6 shadow-lg backdrop-blur-md md:max-w-md md:rounded-2xl">
            {/* Drawer Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Example filter checkboxes */}
            <div className="mb-5 space-y-3">
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="accent-red-600" /> Remote Only
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="accent-red-600" /> Verified
                Users
              </label>
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="accent-red-600" /> With
                Portfolio
              </label>
            </div>

            <Button
              fullWidth
              onClick={() => setIsFilterOpen(false)}
              className="rounded-xl bg-red-600 text-white hover:bg-red-700"
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
