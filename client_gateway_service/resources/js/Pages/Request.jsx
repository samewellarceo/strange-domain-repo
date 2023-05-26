import GuestLayout from '@/Layouts/GuestLayout';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import { Head, useForm } from '@inertiajs/react';

const Request = ({ request_type, ip }) => {
    const { data, setData, post, processing} = useForm({
        ip,
        request_type: request_type === 'new-ip' ? 'New IP' : 'Registration',
        email: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route(request_type));
    };
    
    return (
        <GuestLayout>
            <Head title={request_type == 'new-ip' ? 'Add New IP Request' : 'Registration Request'} />

            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel htmlFor="ip" value="Your IP Address" />

                    <TextInput
                        id="ip"
                        type="text"
                        name="ip"
                        value={data.ip}
                        className="mt-1 block w-full text-gray-400"
                        readOnly
                        disabled
                    />

                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="message" value={request_type == 'registration' ? 'Message' : 'Reason'} />

                    <TextArea
                        id="message"
                        name="message"
                        value={data.message}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('message', e.target.value)}
                        required
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4" disabled={processing}>
                        Submit
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
 
export default Request;