import { UserModel } from "../../../Models/UserModel";
import "./UserCard.css";

type UserCardProps = {
    user: UserModel;
}

export function UserCard(props: UserCardProps): JSX.Element {
    return (
        <div className="UserCard">
        <span>{props.user.firstName}</span>
        <span>Price: {props.user.lastName}</span>
        <span>Stock: {props.user.email}</span>
        <span>Stock: {props.user.roleId}</span>
        <span>Stock: {props.user.password}</span>
     
        </div>
    );
}
