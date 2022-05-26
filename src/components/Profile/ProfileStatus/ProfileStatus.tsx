import React, {ChangeEvent, useEffect, useState} from "react";
import s from './ProfileStatus.module.css'

type ProfileStatusType = {
    status: string
    updateStatus: (status: string) => void
}

export const ProfileStatus = (props: ProfileStatusType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    //
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }
    //
    // componentDidUpdate(prevProps: ProfileStatusType, prevState: { status: string, editMode: boolean }) {
    //     if (prevProps.status !== this.props.status) {
    //         this.setState({
    //             status: this.props.status
    //         })
    //     }
    // }

    return (
        <div>
            {!editMode
                ?
                <div>
                    <span onDoubleClick={() => setEditMode(true)}>{status || '---------'}</span>
                </div>
                :
                <div>
                    <input onChange={onStatusChange}
                           autoFocus onBlur={deactivateEditMode} value={status}/>
                </div>}
        </div>
    )

}
