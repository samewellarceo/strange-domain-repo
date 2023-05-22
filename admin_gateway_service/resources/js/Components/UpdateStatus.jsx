import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function UpdateStatus({ id, className, enableTransition = false, disabled = false, isIcon = false}) {
    const { patch, processing, recentlySuccessful } = useForm({ status: true});

    const submit = (e) => {
        e.preventDefault();

        const confirmed = confirm('Approve this request?');
        if (confirmed) patch(route('request.update', { id }));
        else return 0;
    };

    return (
        <form onSubmit={submit} className={`space-y-6 inline-block mr-1 ${className}`}>
            <div className="flex items-center gap-4">
                <PrimaryButton disabled={disabled ? disabled : processing}>{isIcon ? <FontAwesomeIcon icon={faCheck} size='lg' /> : 'Approve'}</PrimaryButton>

                {enableTransition ? (
                    <Transition
                    show={recentlySuccessful}
                    enterFrom="opacity-0"
                    leaveTo="opacity-0"
                    className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600 mr-2">Approved</p>
                    </Transition>
                ) : <></>}
                
            </div>
        </form>
    );
}
