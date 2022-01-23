import React from "react";
import { Modal, Button, Center } from "native-base"

interface IAboutModalProps
{
    onClose: Function
    isOpen: boolean,
}

export const AboutModal = (props: IAboutModalProps) =>
{
    return (
    <Modal isOpen={props.isOpen} onClose={() => props.onClose()}>
    <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>About</Modal.Header>
        <Modal.Body>     
            <Center>Developed by</Center>
            <Center>Michael Czuba</Center>
            <Center>As a part of Engineer's Thesis</Center>
            <Center mt={4}>2022</Center>
        </Modal.Body>
        <Modal.Footer>
            <Button.Group space={2}>
            <Button onPress={() => props.onClose()}>
                Ok
            </Button>
            </Button.Group>
        </Modal.Footer>
        </Modal.Content>
    </Modal>)
}