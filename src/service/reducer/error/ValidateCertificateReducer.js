import e from "cors";
import moment from "moment";
import { VALIDATE_CERTIFICATE } from "../../constant";

const initState = { visible: false, certiError: [], dateTakenError: [], dateExprireError: [] }

const ValidateCertificateReducer = (state = initState, action) => {
    switch (action.type) {
        case VALIDATE_CERTIFICATE.OPEN_MODAL:
            state.visible = true
            return state
        case VALIDATE_CERTIFICATE.CLOSE_MODAL:
            state = { visible: false, certiError: [], dateTakenError: [], dateExprireError: [] }
            var certifcates = action.certificates
            certifcates.map((certi, index) => {
                if (certi.certiID === 0) {
                    state.certiError = ['Please select certificate']
                }

                if (certi.dateTaken === '') {
                    state.dateTakenError = [`Please select taken date`]
                } else {
                    const takenDuration = moment.duration(moment().day(2).diff(moment(certi.dateTaken)))
                    if (takenDuration.days() === 0) {
                        if (takenDuration.hours() <= 0) {
                            state.dateTakenError = [`Taken Date must be before ${moment(moment().day(2)).format("DD-MM-YYYY")}`]
                        }
                    } else if (takenDuration.days() < 0) {
                        state.dateTakenError = [`Taken Date must be before ${moment(moment().day(2)).format("DD-MM-YYYY")}`]
                    }
                }

                if (certi.check && certi.dateEnd === '') {
                    state.dateExprireError = [` Please select expiration date`]
                } else if (state.dateTakenError.length === 0) {
                    const able = moment.duration(moment().day(3).diff(moment(certi.dateEnd)))
                    let duration = moment.duration(moment(certi.dateEnd, 'YYYY-MM-DD').diff(moment(certi.dateTaken)))
                    if (able.days() === 0) {
                        if (able.hours() > 0) {
                            state.dateExprireError = [`Expiration Date must be after ${moment(moment().day(3)).format("DD-MM-YYYY")}`]
                        }
                        else {
                            if (duration.years() === 1) {
                                console.log('err')
                            } else if (duration.years() < 1) {
                                if (duration.years() === 0 && duration.months() === 11 && duration.days() === 30) {
                                    console.log('err')
                                } else {
                                    state.dateExprireError = [`Expiration Date must begin from ${moment(certi.dateTaken, 'YYYY-MM-DD').add(1, 'y').format('DD-MM-YYYY')}`]
                                }
                            }
                        }
                    } else if (able.days() > 0) {
                        state.dateExprireError = [`Taken Date must after ${moment(moment().day(3)).format("DD-MM-YYYY")}`]
                    } else {
                        if (duration.years() === 1) {
                            state.dateExprireError = []
                        } else if (duration.years() < 1) {
                            if (duration.years() === 0 && duration.months() === 11 && duration.days() === 30) {
                                console.log('err')
                            } else {
                                state.dateExprireError = [`Expiration Date must begin from ${moment(certi.dateTaken, 'YYYY-MM-DD').add(1, 'y').format('DD-MM-YYYY')}`]
                            }
                        }
                    }
                }
            })
            state.visible = !(state.certiError.length === 0 && state.dateExprireError.length === 0 && state.dateTakenError.length === 0)
            return state
        default:
            return state
    }
}

export default ValidateCertificateReducer