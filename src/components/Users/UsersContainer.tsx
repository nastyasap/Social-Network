import {connect} from "react-redux";
import {RootStateType} from "../../redux/reduxStore";
import {
    follow, getUsers,
    setCurrentPage,
    unfollow,
    UsersState,
} from "../../redux/UsersPageReducer";
import React from "react";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";


type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (pageNumber: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

export type UsersPropsType = UsersState & mapDispatchToPropsType

export class UsersAPI extends React.Component<UsersPropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
        // this.props.toggleIsFetching(true)
        // usersApi.getUsers(this.props.currentPage, this.props.pageSize)
        //     .then(response => {
        //         this.props.toggleIsFetching(false)
        //         this.props.setUsers(response.items)
        //         this.props.setTotalUsersCount(response.totalCount ? response.totalCount : 0)
        //
        //     })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.getUsers(pageNumber, this.props.pageSize)

        // this.props.toggleIsFetching(true)
        // usersApi.getUsers(pageNumber, this.props.pageSize)
        //     .then(response => {
        //         this.props.toggleIsFetching(false)
        //         this.props.setUsers(response.items)
        //     })
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                users={this.props.users}
                onPageChanged={this.onPageChanged}
                currentPage={this.props.currentPage}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                pageSize={this.props.pageSize}
                totalUsersCount={this.props.totalUsersCount}
                followInProgress={this.props.followInProgress}
            />
        </>
    }
}

const mapStateToProps = (state: RootStateType): UsersState => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followInProgress: state.usersPage.followInProgress
    }
}

// const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
//     return {
//         follow: (userId: number) => {
//             dispatch(FollowAC(userId))
//         },
//         unfollow: (userId: number) => {
//             dispatch(UnfollowAC(userId))
//         },
//         setUsers: (users: UsersType[]) => {
//             dispatch(SetUsersAC(users))
//         },
//         setCurrentPage: (pageNumber: number) => {
//             dispatch(SetCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (usersCount: number) => {
//             dispatch(SetTotalUsersCountAC(usersCount))
//         },
//         toggleIsFetching: (isFetching: boolean) => {
//             dispatch(ToggleIsFetchingAC(isFetching))
//         }
//
//     }
// }

export const UsersContainer = connect(mapStateToProps,
    {
        follow, unfollow, setCurrentPage, getUsers
    })(UsersAPI)