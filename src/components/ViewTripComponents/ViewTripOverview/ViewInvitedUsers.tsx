import type { InvitedUser } from "../../../models/invitedUser";

interface ViewInvitedUsersProps {
  invitedUsers: InvitedUser[];
  ownerUsername:string;
}

const ViewInvitedUsers = ({ invitedUsers, ownerUsername }: ViewInvitedUsersProps) => {
  return (
    <div className="d-flex flex-column text-center m-3 invitedUsers">
      <h3 className="header-container">Invited Users</h3>
      <div className="inner-container p-3 flex-grow-1 p-3">
        {invitedUsers.map((user, index) => (
          <div key={index}>
            <h3>
              <strong>{ownerUsername}</strong>
              {user.username}
              {/* : {user.inviteStatus} */}
              {/* Figure out invite status update - maybe create InviteContext */}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewInvitedUsers;
