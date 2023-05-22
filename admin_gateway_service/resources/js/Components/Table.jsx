import { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import UpdateStatus from '@/Components/UpdateStatus';
import DeleteRequest from '@/Components/DeleteRequest';
import DeleteAllRequests from '@/Components/DeleteAllRequests';
import ViewRequest from '@/Components/ViewRequest';

const Table = ({ data = {} }) => {
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortType, setSortType] = useState('created_at');
    const [filterType, setFilterType] = useState('none');
    const [filterValue, setFilterValue] = useState('All');

    const handleSort = (type) => {
        const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newSortDirection);
        setSortType(type);
    };

    const handleFilterType = (event) => {
        setFilterValue('All');
        const selectedFilterType = event.target.value;
        setFilterType(selectedFilterType);
    };

    const handleFilterValue = (event) => {
        const selectedFilterValue = event.target.value;
        setFilterValue(selectedFilterValue);
    };

    data = data.filter(request => {
        let value = filterValue;

        if (filterType === 'none') {
            return data;
        } else {
            if (value == 'All') return data;
            if (filterType === 'status') value = filterValue == 'Approved' ? true : false;
        } 
        
        return request[filterType] === value;        
    });
    
    data.sort((a, b) => {
        if (sortDirection === 'asc') return a[sortType].localeCompare(b[sortType]);
        else return b[sortType].localeCompare(a[sortType]);
    });

    return (
        <>
            <div className='mb-4 flex justify-between items-center mx-6'>
                <div className='flex justify-start items-center'>
                    <InputLabel htmlFor="filter" value="Filter by:" className='mr-2' />
                    <select
                        id='filter'
                        value={filterType}
                        onChange={handleFilterType}
                        className="py-1 w-40 border border-gray-300 rounded-md text-sm focus:outline-none"
                    >
                        <option value="none">None</option>
                        <option value="request_type">Request Type</option>
                        <option value="status">Status</option>
                    </select>
                    {filterType !== 'none' ? (
                        <div className='flex justify-start items-center mx-6'>
                            <InputLabel htmlFor="value" value="Value:" className='mr-2' />
                            <select
                                id='value'
                                value={filterValue}
                                onChange={handleFilterValue}
                                className="py-1 w-40 border border-gray-300 rounded-md text-sm focus:outline-none"
                            >
                                {filterType === 'request_type' ? (
                                    <>
                                        <option value="All">All</option>
                                        <option value="new-ip">New IP</option>
                                        <option value="registration">Registration</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="All">All</option>
                                        <option value='Approved'>Approved</option>
                                        <option value='Pending'>Pending</option>
                                    </>
                                )}
                            </select>
                        </div>
                    ) : <></>}
                </div>
                <DeleteAllRequests className={data.length > 0 ? 'inline-block' : 'hidden'}/>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left font-bold tracking-wider">
                            IP Address
                        </th>
                        <th onClick={() => handleSort('email')} className="px-6 py-3 text-left font-bold tracking-wider cursor-pointer">
                            Email
                            <span className={`ml-4 ${sortType === 'email' ? `text-gray-800` : `text-gray-300`}`}>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                        </th>
                        <th className="px-6 py-3 font-bold text-left tracking-wider">
                            Request Type 
                        </th>
                        <th className="px-6 py-3 text-center font-bold tracking-wider">
                            Status
                        </th>
                        <th onClick={() => handleSort('created_at')} className="px-6 py-3 text-center font-bold tracking-wider cursor-pointer">
                            Date
                            <span className={`ml-4 ${sortType === 'created_at' ? `text-gray-800` : `text-gray-300`}`}>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                        </th>
                        <th className="px-6 py-3 text-center font-bold tracking-wider">
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length > 0 ? (  
                        data.map((request) => (
                            <tr key={request.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {request.ip}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {request.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {request.request_type == 'registration' ? 'Registration' : 'New IP'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                    {request.status ? 'Approved' : 'Pending'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                    {new Date(request.created_at).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'medium' })}
                                </td>
                                <td className="px-6 py-4 text-right text-sm font-medium">
                                    <ViewRequest id={request.id} isIcon={true} />
                                    <UpdateStatus className={request.status ? 'hidden' : 'inline-block'}  id={request.id} isIcon={true} />
                                    <DeleteRequest id={request.id} isIcon={true} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className='min-w-full table-col-group text-center'>
                            <td className='table-col py-10 text-2xl text-gray-300' colspan='6'>
                                No available data.
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
        </>
    );
}
 
export default Table;