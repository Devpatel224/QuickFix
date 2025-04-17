import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { useState } from 'react';

function ProviderDate() {
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      });

    function handleSelect(date){
        console.log(date);
    }

  return (
    <div className="p-4 max-w-xl mx-auto  bg-white">
      <h2 className="text-xl font-semibold text-center mb-4 ">Mark Unavailable Dates</h2>
      <div className='flex flex-col items-center justify-center'>
      <DateRange
        ranges={[selectionRange]}
        onChange={handleSelect}
        minDate={new Date()}
        rangeColors={['#FF5A5F']}
      />
     
      <button 
        // onClick={}
        className="mt-4 w-[25vw] bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-xl transition duration-300"
        >
        Save as Unavailable
      </button>
          </div>
    </div>
  )
}

export default ProviderDate