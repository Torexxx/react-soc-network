import React from 'react';
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {useSelector} from "react-redux";
import {getIsFetching} from "../../redux/user-selectors";

export type Props = {
    titleText: string
}

const UsersPage: React.FC<Props> = (props) => {

    const isFetching = useSelector(getIsFetching);

    return (
        <>
            <h1>{props.titleText}</h1>
            {isFetching ? <Preloader /> : null}
            <Users />
        </>
    )
}

export default UsersPage;


// const connector = connect(
//     mapStateToProps, {
//         follow,
//         unfollow,
//         getRequestUsers,
//     })
// type PropsFromRedux = ConnectedProps<typeof connector>;
// type Props = PropsFromRedux & OwnType;
//
//
// export default connector(UsersContainer);
