import DangerButton from '@/Components/DangerButton';
import { useForm } from '@inertiajs/react';

export default function DeleteAllRequest({ className }) {
    const { delete: destroy } = useForm();

    const submit = (e) => {
        e.preventDefault();
        
        const confirmed = confirm('Delete ALL requests?');
        if (confirmed) destroy(route('request.delete.all'));
        else return 0;
    };

    return (
        <form onSubmit={submit} className={`space-y-6 inline-block mr-1 ${className}`}>
            <div className="flex items-center gap-4">
                <DangerButton>Delete All</DangerButton>
            </div>
        </form>
    );
}
