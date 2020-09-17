
import React, { useCallback, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ExampleForm, { IExampleFormValues } from './ExampleForm';

const FORM_ID = 'example-form';

export interface IExampleModalProps {
    className?: string;
}

const ExampleModal = ({ className }: IExampleModalProps) => {
    const [modal, setModal] = useState(false);

    const toggle = useCallback(() => setModal(!modal), [modal]);
    const onSubmit = useCallback((data: IExampleFormValues) => {
        console.log('%cSubmitted!', 'color:green', data);
        toggle();
        alert('Submitted!\n' + JSON.stringify(data, null, '\t'));
    }, [toggle]);

    return (
        <React.Fragment>
            <Button onClick={toggle}>Open Form</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                    <ExampleForm formId={FORM_ID} onSubmit={onSubmit} />
                </ModalBody>
                <ModalFooter>
                    {/* We can use the form={FORM_ID} to make this button submit the inner form. */}
                    <Button color="primary" form={FORM_ID} type="submit">Do Something</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
}

export default ExampleModal;