import { useState, useMemo } from 'react';
import AddButton from '../Buttons/AddButton';
import { categoryLogTypes, LogsCategoryType, logsColDefinitions } from '../../enums/PetLogs';
import PetTable from '../Table/PetTable';
import AddLogPopup from '../Popup/AddLogPopup';
import { IoMdArrowDropdown } from "react-icons/io";


const FilterButtons = ({ filters, currentFilter, onFilterChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 text-xs sm:text-sm font-bold md:pr-8">
      {/* Dropdown button for small screens */}
      <div className="relative lg:hidden">
        <button
          onClick={toggleMenu}
          className="capitalize rounded-xl bg-button-primary text-button-accent px-4 py-2 w-full text-left flex flex-row items-center gap-2"
        >
          {currentFilter} <IoMdArrowDropdown/>
        </button>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute mt-2 bg-white border rounded-lg shadow-lg w-full z-10">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  onFilterChange(filter);
                  setIsMenuOpen(false); // Close menu after selection
                }}
                className={`capitalize block w-full text-left p-2 hover:bg-button-primary text-button-accent ${currentFilter === filter ? 'bg-button-primary ' : ''}`}
              >
                {filter}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Inline buttons for larger screens */}
      <div className="hidden lg:flex flex-row lg:gap-8">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`capitalize rounded-xl text-button-accent hover:bg-button-primary px-4 transition-all duration-300 ${currentFilter === filter ? 'bg-button-primary' : 'bg-white'}`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

const PetCardLogs = ({ category, logs }) => {
  const initialFilter = categoryLogTypes[category][0];
  const [logsFilter, setLogsFilter] = useState(initialFilter);

  const [isPopupOpen,setIsPopupOpen] = useState(false)
  const openPopup = () => setIsPopupOpen(true)
  const closePopup = () => setIsPopupOpen(false)

  const filteredLogs = useMemo(() => logs?.filter(log => log.type === logsFilter).map(log => log.details), [logs, logsFilter]);

  return (
    <div className="card py-6 px-7 flex flex-col gap-4 flex-1 w-auto 2xl:max-w-[800px]">
      <div className="flex flex-row gap-2">
        <p className="font-bold text-xs sm:text-md">{category === LogsCategoryType.HEALTH ? 'Health Logs' : 'Growth and Wellness Logs'}</p>
        <div className="flex-grow"></div>
        <FilterButtons
          filters={categoryLogTypes[category]}
          currentFilter={logsFilter}
          onFilterChange={setLogsFilter}
        />
        <AddButton mini={true} onClick={openPopup} />
      </div>
      <PetTable
        data={filteredLogs}
        columns={logsColDefinitions[logsFilter]}
      />
      <AddLogPopup logType={logsFilter} isOpen={isPopupOpen} onClose={closePopup}/>
    </div>
  );
};

export default PetCardLogs;