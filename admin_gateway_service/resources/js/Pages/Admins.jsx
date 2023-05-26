import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import DataTable from '@/Components/DataTable';
import Filter from "@/Components/Filter";

export default function Admins({ auth, data }) {
    
    const headers = [
        { key: 'name', value: "Name" },
        { key: 'email', value: "Email", sortable: true },
        { key: 'created_at', value: "Date", isDate: true, sortable: true },
        { key: 'status', value: "Status", isBool: true, true: 'Active', false: 'Inactive' },
    ];

    const action = {
        headerName: 'Action',
        view: { route: 'admin.show' },
        changeStatus: { route: 'admin.update', confirmMessage: 'Change Status?', isToggle: true },
        delete: { route: 'admin.delete', confirmMessage: 'Delete this Admin?' }
    }
    
    const filters = [
        {id: '0', column: 'status', value: false, name: 'Inactive'},
        {id: '1', column: 'status', value: true, name: 'Active'}
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Users</h2>}
        >
            <Head title="Admins" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className='mb-4 flex justify-between items-center mx-6'>
                                <Filter filters={filters} filterUpdated={handleAddFilter}/>
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
