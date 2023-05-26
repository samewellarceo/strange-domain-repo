import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function ChangeStatus({ id, className, isIcon = false, routeName, confirmMessage, name = 'Change Status', status}) {
    const { setData, patch } = useForm({ status });

    const submit = (e) => {
        e.preventDefault();
        
        const confirmed = confirm(confirmMessage);
        if (confirmed) {
            setData('status', !status);
            patch(route(routeName, { id }));
        } else return 0;
    };

    return (
        <form onSubmit={submit} className={`space-y-6 inline-block mr-1 ${className}`}>
            <div className="flex items-center gap-4">
                <PrimaryButton>{isIcon ? (status ? <FontAwesomeIcon icon={faCheck} size='lg' /> : <FontAwesomeIcon icon={faXmark} size='lg' />) : name}</PrimaryButton>
            </div>
        </form>
    );
}
