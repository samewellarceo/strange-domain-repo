import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import UpdateStatus from '@/Components/UpdateStatus';
import DeleteRequest from '@/Components/DeleteRequest';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Request({ auth, data }) {
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
                                <InputLabel htmlFor="ip" value="IP Address" className='mr-2' />
                                <p className='mt-1 text-lg'>{data.ip}</p>
                            </div>
                            <div className='border-b px-6 py-4 my-3'>
                                <InputLabel htmlFor="email" value="Email" className='mr-2' />
                                <p className='mt-1 text-lg'>{data.email}</p>
                            </div>
                            <div className='border-b px-6 py-4 my-3'>
                                <InputLabel htmlFor="type" value="Request Type" className='mr-2' />
                                <p className='mt-1 text-lg'>{data.request_type === 'registration' ? 'Registration' : 'New IP'}</p>
                            </div>
                            <div className='border-b px-6 py-4 my-3'>
                                <InputLabel htmlFor="type" value="Message" className='mr-2' />
                                <p className='mt-1 text-lg'>{data.message}</p>
                            </div>
                            <div className='border-b px-6 py-4 my-3'>
                                <InputLabel htmlFor="date" value="Date and Time of Request" className='mr-2' />
                                <p className='mt-1 text-lg'>{new Date(data.created_at).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'medium' })}</p>
                            </div>
                            <div className='flex space-x-80 border-b px-6 py-4 my-3'>
                                <div>
                                    <InputLabel htmlFor="status" value="Status" className='mr-2' />
                                    <p className='mt-1 text-lg'>{data.status ? 'Approved' : 'Pending'}</p>
                                </div>
                                {data.status ? (
                                    <div>
                                        <InputLabel htmlFor="date" value="Date and Time of Approval" className='mr-2' />
                                        <p className='mt-1 text-lg'>{new Date(data.updated_at).toLocaleString(undefined, { dateStyle: 'long', timeStyle: 'medium' })}</p>
                                    </div>
                                ) : <></>}
                            </div>
                            
                            <div className='flex justify-between items-center px-6 py-4 mt-6'>
                                <div>
                                    <UpdateStatus className='mr-6' id={data.id} enableTransition={true} disabled={data.status ? true : false} />
                                    <DeleteRequest id={data.id} />
                                </div>
                                <Link href='/requests'><PrimaryButton>Back to Requests</PrimaryButton></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
