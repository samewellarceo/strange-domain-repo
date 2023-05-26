import InputLabel from "@/Components/InputLabel";
import FilterTags from "@/Components/FilterTags";
import { useState } from "react";

const Filter = ({filters, filterUpdated}) => {
    const [value, setValue] = useState('');
    const [filterIDs, setFilterIDs] = useState([]);
    const [filterArray, setFilterArray] = useState(filters);

    const handleOnChange = (e) => {
        if(!e.target.value) return 0;

        filterIDs.push(e.target.value);
        setFilterIDs(filterIDs);

        const newFilterArray = filterArray.filter(item => !filterIDs.some((id) => item.id === id))
        setFilterArray(newFilterArray);

        filterUpdated(filterIDs);
        
        setValue('');
    }

    const handleClosedTag = (id) => {
        const newFilterIDs = filterIDs.filter(filterID => filterID != id)
        setFilterIDs(newFilterIDs);

        filterArray.push(filters[id]);
        setFilterArray(filterArray);

        filterUpdated(newFilterIDs);
    };

    return (
        <div className='flex justify-start items-center'>
            <select
                onChange={handleOnChange}
                value={value}
                className="mr-6 py-1 w-40 border border-gray-300 rounded-md text-sm focus:outline-none"
            >
                <option value=''>Select Filter</option>
                {filterArray.map((filter) => (
                    <option value={filter.id}>{filter.name}</option>
                ))}
            </select>
            {filterIDs.length > 0 ? <InputLabel value="Filters:" className='mr-2' /> : <></>}
            {filterIDs.map((id) => (
                <FilterTags name={filters[id].name} id={id} tagWasClosed={handleClosedTag}/>
            ))}
        </div>
    );
}
 
export default Filter;