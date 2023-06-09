import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import DataTable from '@/Components/DataTable';
import DeleteAll from '@/Components/DeleteAll';
import Filter from "@/Components/Filter";

export default function Requests({ auth, data }) {
    // const [filterIDs, setfilterIDs] = useState([]);

    const headers = [
        { key: 'ip', value: "IP Address" },
        { key: 'email', value: "Email", sortable: true },
        { key: 'request_type', value: "Request Type" },
        { key: 'status', value: "Status", isBool: true, true: 'Approved', false: 'Pending' },
        { key: 'created_at', value: "Date", isDate: true, sortable: true },
    ];

    const action = {
        headerName: 'Action',
        view: { route: 'request.show' },
        changeStatus: { route: 'request.update', confirmMessage: 'Approve Request?' },
        delete: { route: 'request.delete', confirmMessage: 'Delete Request?' }
    }

    const filters = [
        {id: '0', column: 'request_type', value: 'New IP', name: 'New IP'},
        {id: '1', column: 'request_type', value: 'Registration', name: 'Registration'},
        {id: '2', column: 'status', value: false, name: 'Pending'},
        {id: '3', column: 'status', value: true, name: 'Approved'}
    ];

    const handleAddFilter = (ids) => {
        // data.filter(request => {
        //     ids.forEach((id) => {
        //         const col = filters[id].column;

        //     });
        // });
        // alert(ids);
    }

    // data = data.filter(request => {
    //     let value = filterValue;

    //     if (filterType === 'none') {
    //         return data;
    //     } else {
    //         if (value == 'All') return data;
    //         if (filterType === 'status') value = filterValue == 'Approved' ? true : false;
    //     } 
        
    //     return request[filterType] === value;        
    // });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Requests</h2>}
        >
            <Head title="Requests" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className='mb-4 flex justify-between items-center mx-6'>
                                <Filter filters={filters} filterUpdated={handleAddFilter}/>
                                <DeleteAll className={data.length > 0 ? 'inline-block' : 'hidden'} routeName='request.delete.all' confirmMessage='Delete ALL Requests?'/>
                            </div>
                            <DataTable
                                headers = {headers}
                                data = {data}
                                action = {action}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
