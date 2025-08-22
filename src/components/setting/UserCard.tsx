import { getInitial } from "@/shared/utils/helpers";
import { IUser } from "@/types";
import classNames from "classnames";

interface Props {
  profile: IUser;
  className?: string;
}

const UserCard = ({ profile, className }: Props) => {
  return (
    <div className={classNames(className, "flex items-center gap-4")}>
      <div className="relative">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center text-xl font-bold text-white overflow-hidden shadow-lg">
          {getInitial(profile)}
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {profile?.username}
        </h3>
        <div className="flex items-center gap-1">
          <span className="text-sm text-blue-500 font-medium">online</span>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
