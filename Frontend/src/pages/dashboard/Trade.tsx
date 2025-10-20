import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const nav = ['All', 'Active', 'Completed'];

const Trade = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <div title="back" className="float-left">
          <ChevronLeft
            size={28}
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
        </div>
        <div className="text-center text-2xl font-bold">Trades</div>
      </div>

      <nav className="flex space-x-4">
        <ul className="border-b border-gray-600">
          {nav.map((link, idx) => (
            <li key={idx}>{link}</li>
          ))}
          <span className="h-4 w-2 rounded-2xl border-red-500 bg-red-500"></span>
        </ul>
      </nav>
    </div>
  );
};

export default Trade;
