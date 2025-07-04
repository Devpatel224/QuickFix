import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDates } from '@/store/provider-slice';
import { useToast } from '@/hooks/use-toast';


function ProviderDate({unavailableDates , setShowDatePicker}){
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });
    const dispatch = useDispatch();
    let { user } = useSelector((state)=>state.auth)
    let { toast} = useToast()
    let { isLoading} = useSelector((state)=>state.service)
    
    const generateAllDates = (startDate, endDate) => {
        let currentDate = new Date(startDate);
        const dates = [];

        while(currentDate <= endDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1); 
        }

        return dates;
    };

    
    const disabledDates = unavailableDates?.map(date => new Date(date));

    function handleSelect(date){
           let allSelectedDates = generateAllDates(date.selection.startDate, date.selection.endDate);

          const hasDisabled = allSelectedDates.some((selectedDate)=>
            disabledDates.some((disabled)=> disabled.toDateString() === selectedDate.toDateString())
          )

          if(hasDisabled){
            toast({
              title: "Unavailable date selected",
              description: "Please avoid unavailable dates in your selection.",
              variant: "destructive",
            });
            return;
          }

        setSelectionRange(date.selection);
    }

    
   

    async function saveChanges(e) {
        e.preventDefault();        
        const allUnavailableDates = generateAllDates(selectionRange.startDate, selectionRange.endDate);
        
        const unavailableDates = allUnavailableDates.map((date) => date.toISOString());
        

        dispatch(setDates({id:user.id,unavailableDates})).then((data)=>{
            
            if(data.payload.success){
              setShowDatePicker(false)
                toast({
                  title:"Success",
                  description:"Dates marked as unavailable",
                  variant:"success"
                })
            }
            else{
                toast({
                  title:"Something went wrong",
                  description:data.payload.message,
                  variant:"destructive"
                })
            }
        })
       
    }

    return (
      <div className="p-2 w-full">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Mark Unavailable Dates</h2>
      <div className="flex flex-col items-center justify-center">
        <div className="shadow-lg rounded-xl overflow-hidden border border-gray-200">
          <DateRange
            editableDateInputs={true}
            ranges={[selectionRange]}
            onChange={handleSelect}
            minDate={new Date()}
            maxDate={new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())}
            rangeColors={['#ef4444']}
            dayContentRenderer={(date) => {
              const isDisabled = disabledDates.some(
                (disabled) => date.toDateString() === disabled.toDateString()
              );
              return (
                <div
                  className={`flex items-center justify-center w-full h-full rounded-full ${
                    isDisabled ? 'bg-red-400 text-white cursor-not-allowed pointer-events-none' : ''
                  }`}
                >
                  {date.getDate()}
                </div>
              );
            }}
          />
        </div>
        <button
          onClick={saveChanges}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-xl shadow transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save as Unavailable'}
        </button>
      </div>
    </div>
    
    );
}

export default ProviderDate;
