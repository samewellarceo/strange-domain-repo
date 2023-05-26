import SecondaryButton from '@/Components/SecondaryButton';
import { useForm } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function View({ id, isIcon = false, routeName}, className) {
    const { get } = useForm();
    
    const submit = (e) => {
        e.preventDefault();
        
        get(route(routeName, { id }));
    };

    return (
        <form onSubmit={submit} className={`space-y-6 inline-block mr-1 ${className}`}>
            <div className="flex items-center gap-4">
                <SecondaryButton>{isIcon ? <FontAwesomeIcon icon={faEye} size='lg' /> : 'View'}</SecondaryButton>
            </div>
        </form>
    );
}
