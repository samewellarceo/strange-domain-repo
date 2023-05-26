import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';
import { useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import ChangeStatus from '@/Components/ChangeStatus';
import Delete from '@/Components/Delete';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Admin({ auth, data }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Request</h2>}
        >
            <Head title="Request Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className='border-b px-6 py-4 my-3'>
                                <InputLabel htmlFor="name" value="Name" className='mr-2' />
                                <p className='mt-1 text-lg'>{data.name}</p>
                            </div>
                            <div className='border-b px-6 py-4 my-3'>
                                <InputLabel htmlFor="email" value="Email" className='mr-2' />
                                <p className='mt-1 text-lg'>{data.email}</p>
                            </div>
                            <div className='border-b px-6 py-4 my-3'>
                                <InputLabel htmlFor="status" value="Status" className='mr-2' />
                                <p className='mt-1 text-lg'>{data.status ? 'Active' : 'Inactive'}</p>
                            </div>
                            <div className='border-b px-6 py-4 my-3'>
                                <InputLabel htmlFor="date" value="Date Created" className='mr-2' />
                                <p className='mt-1 text-lg'>{new Date(data.created_at).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'medium' })}</p>
                            </div>
                            <div className='border-b px-6 py-4 my-3'>
                                <InputLabel htmlFor="date" value="Date Updated" className='mr-2' />
                                <p className='mt-1 text-lg'>{new Date(data.updated_at).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'medium' })}</p>
                            </div>
                            <div className='flex justify-between items-center px-6 py-4 mt-6'>
                                <div>
                                    <ChangeStatus
                                        id={data.id}
                                        routeName='admin.update'
                                        confirmMessage='Change Status?'
                                        className='mr-4'
                                        status={!data.status}
                                    />
                                    <Delete
                                        id={data.id}
                                        routeName='admin.delete'
                                        confirmMessage='Delete this Admin?'
                                    />
                                </div>
                                <Link href='/admins'><PrimaryButton>Back to Admins</PrimaryButton></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}