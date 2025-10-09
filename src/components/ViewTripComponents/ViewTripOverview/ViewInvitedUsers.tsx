import type { InvitedUser } from "../../../models/invitedUser";

interface ViewInvitedUsersProps {
  invitedUsers: InvitedUser[];
}

const ViewInvitedUsers = ({ invitedUsers }: ViewInvitedUsersProps) => {
  return (
    <div className="d-flex flex-column text-center m-3 invitedUsers">
      <h3 className="header-container">Invited Users</h3>
      <div className="inner-container p-3 flex-grow-1 p-3">
          {invitedUsers.map((user, index) => (
            <div key={index}>
              <h6>
                {user.username} : {user.inviteStatus}
              </h6>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ViewInvitedUsers;
