import DangerButton from '@/Components/DangerButton';
import { useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function DeleteAll({ className, routeName, confirmMessage }) {
    const { delete: destroy } = useForm();

    const submit = (e) => {
        e.preventDefault();
        
        const confirmed = confirm(confirmMessage);
        if (confirmed) destroy(route(routeName));
        else return 0;
    };

    return (
        <form onSubmit={submit} className={`space-y-6 inline-block mr-1 ${className}`}>
            <div className="flex items-center gap-4">
                <DangerButton><FontAwesomeIcon icon={faTrash} className='mr-2' />Delete All</DangerButton>
            </div>
        </form>
    );
}
