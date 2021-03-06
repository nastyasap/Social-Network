import React from "react";
import {AddDialogMessageAC, ChangeDialogMessageTextAC} from "../../redux/DialogsPageReducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {RootStateType} from "../../redux/state";
import {Dispatch} from "redux";

type mapStatePropsType = {
    dialogsData: Array<{id: number, name: string}>
    messageData: Array<{id: number, message: string}>
    message: string
}

type mapDispatchPropsType = {
    onChangeMessage: (value: string) => void
    addMessage: (value: string) => void
}

export type DialogsType = mapStatePropsType & mapDispatchPropsType

const mapStateToProps = (state: RootStateType): mapStatePropsType => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messageData: state.dialogsPage.messageData,
        message: state.dialogsPage.newMessageText
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        addMessage: (text: string) => {
            dispatch(AddDialogMessageAC(text))
            dispatch(ChangeDialogMessageTextAC(''))
        },
        onChangeMessage: (text: string) => {
            dispatch(ChangeDialogMessageTextAC(text))
        }
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
