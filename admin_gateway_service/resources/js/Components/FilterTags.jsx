import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const FilterTags = ({name, id, tagWasClosed}) => {
    return (
        <span className='mx-1 px-4 py-1 bg-blue-800 rounded-md text-white text-sm'>
            {name}
            <button onClick={() => tagWasClosed(id)} className='ml-4'><FontAwesomeIcon icon={faXmark} size='md' /></button>
        </span>
    );
}
 
export default FilterTags;