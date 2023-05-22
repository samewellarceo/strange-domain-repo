import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function ViewRequest({ id, isIcon = false}, className) {
    const { get } = useForm();

    const submit = (e) => {
        e.preventDefault();

        get(route('request.show', { id }));
    };

    return (
        <form onSubmit={submit} className={`space-y-6 inline-block mr-1 ${className}`}>
            <div className="flex items-center gap-4">
                <PrimaryButton className='bg-blue-500 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900' >{isIcon ? <FontAwesomeIcon icon={faEye} size='lg' /> : 'View'}</PrimaryButton>
            </div>
        </form>
    );
}
