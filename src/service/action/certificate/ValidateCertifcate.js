import { VALIDATE_CERTIFICATE } from "../../constant"

export const openModal = () => {
    return { type: VALIDATE_CERTIFICATE.OPEN_MODAL }
}

export const closeModal = (certificates) => {
    return { type: VALIDATE_CERTIFICATE.CLOSE_MODAL, certificates }
}