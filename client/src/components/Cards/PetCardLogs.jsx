import { useState, useMemo } from 'react';
import AddButton from '../Buttons/AddButton';
import { categoryLogTypes, LogsCategoryType, logsColDefinitions } from '../../enums/PetLogs';
import PetTable from '../Table/PetTable';


const FilterButtons = ({ filters, currentFilter, onFilterChange }) => (
  <div className="flex flex-row gap-8 text-sm font-bold">
    {filters.map((filter) => (
      <button
        key={filter}
        onClick={() => onFilterChange(filter)}
        className={`capitalize rounded-xl text-button-accent hover:bg-button-primary px-4 transition-all duration-300 ${currentFilter === filter ? 'bg-button-primary' : 'bg-white'}`}
      >
        {filter}
      </button>
    ))}
    <AddButton mini={true} />
  </div>
);

const PetCardLogs = ({ category, logs }) => {
  const initialFilter = categoryLogTypes[category][0];
  const [logsFilter, setLogsFilter] = useState(initialFilter);

  const filteredLogs = useMemo(() => logs?.filter(log => log.type === logsFilter).map(log => log.details), [logs, logsFilter]);

  return (
    <div className="card py-6 px-7 flex flex-col gap-4 max-w-[800px]">
      <div className="flex flex-row gap-2">
        <p className="font-bold text-md">{category === LogsCategoryType.HEALTH ? 'Health Logs' : 'Growth and Wellness Logs'}</p>
        <div className="flex-grow min-w-[170px]"></div>
        <FilterButtons
          filters={categoryLogTypes[category]}
          currentFilter={logsFilter}
          onFilterChange={setLogsFilter}
        />
      </div>
      <PetTable
        data={filteredLogs}
        columns={logsColDefinitions[logsFilter]}
      />
    </div>
  );
};

export default PetCardLogs;