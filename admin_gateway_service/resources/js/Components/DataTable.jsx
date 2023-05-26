import { useState } from 'react';
import View from '@/Components/View';
import ChangeStatus from '@/Components/ChangeStatus';
import Delete from '@/Components/Delete';

const DataTable = ({ data, headers, action }) => {
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortType, setSortType] = useState('created_at');

    const handleSort = (type) => {
        const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        setSortDirection(newSortDirection);
        setSortType(type);
    };

    data.sort((a, b) => {
        if (sortDirection === 'asc') return a[sortType].localeCompare(b[sortType]);
        else return b[sortType].localeCompare(a[sortType]);
    });

    return (
        <>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200">
                    <tr>
                        {headers.map((header) => (
                            <th key={header.key} onClick={header.sortable ? () => handleSort(header.key) : undefined} className={`px-6 py-3 text-left font-bold tracking-wider ${header.sortable ? 'cursor-pointer' : ''}`}>
                                {header.value}
                                {header.sortable ? (
                                    <span className={`ml-4 ${sortType === header.key ? `text-gray-800` : `text-gray-300`}`}>{sortDirection === 'asc' ? '▲' : '▼'}</span>
                                ) : <></>}
                            </th>
                        ))}
                        {action ? (
                            <th className="px-6 py-3 text-center font-bold tracking-wider">
                                {action.headerName}
                            </th>
                        ) : <></>}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length > 0 ? (  
                        data.map((row) => (
                            <tr key={row.id}>
                                {headers.map((header) => (
                                    <td key={header.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {header.isBool ? (
                                            row[header.key] ? header.true : header.false
                                        ) : header.isDate ? (
                                            new Date(row[header.key]).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'medium' })
                                        ) : (
                                            row[header.key]
                                        )}
                                    </td>
                                ))}
                                {action ? (
                                    <td className="px-6 py-4 text-right text-sm font-medium">
                                        {action.view ? (
                                            <View id={row.id} isIcon={true} routeName={action.view.route} />
                                        ) : <></>}
                                        {action.changeStatus ? (
                                            <ChangeStatus
                                                className={!action.changeStatus.isToggle ? (row.status ? 'hidden' : 'inline-block') : undefined}
                                                id={row.id}
                                                isIcon={true}
                                                routeName={action.changeStatus.route}
                                                confirmMessage={action.changeStatus.confirmMessage}
                                                status={!row.status}
                                            />
                                        ) : <></>}
                                        {action.delete ? (
                                            <Delete
                                                id={row.id}
                                                isIcon={true}
                                                routeName={action.delete.route}
                                                confirmMessage={action.delete.confirmMessage}
                                            />
                                        ) : <></>}
                                    </td>
                                ) : <></>}
                            </tr>
                        ))
                    ) : (
                        <tr className='min-w-full table-col-group text-center'>
                            <td className='table-col py-10 text-2xl text-gray-300' colspan={action ? headers.length + 1 : headers.length}>
                                No available data.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}
 
export default DataTable;