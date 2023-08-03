import { IDungeonDetail } from "@/types/dungeon";
import { IKingdom } from "@/types/kingdom";
import { IRoomData } from "@/types/room";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import usePlayerInfo from "../hooks/use-player-info";
import useUpdateAvatar from "../hooks/use-update-avatar";
import useUpdateRole from "../hooks/use-update-role";

interface IUpdatePlayerProps {
  roomData: IRoomData;
  kingdomData: IKingdom;
  dungeonData: IDungeonDetail;
  conversationId: string;
}

const UpdatePlayer = ({
  roomData,
  kingdomData,
  dungeonData,
  conversationId,
}: IUpdatePlayerProps) => {
  const { mutate: updateAvatar } = useUpdateAvatar();
  const { mutate: updateRole } = useUpdateRole();

  const { avatarId, role } = usePlayerInfo(roomData);

  const currentPlayer = roomData.playerState.find(
    (player) => player.accountId === localStorage.getItem("accountId"),
  );

  return (
    <>
      {/* <Select
        defaultValue={currentPlayer?.avatarId}
        value={avatarId}
        onValueChange={(value) => updateAvatar({ conversationId, avatarId: value })}
      >
        <SelectTrigger label="Select an avatar" className="w-full" aria-label="Select an avatar">
          <SelectValue placeholder="Select an avatar" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {kingdomData.avatars.map((avatar) => (
              <SelectItem key={avatar._id} value={avatar._id}>
                {avatar.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select> */}
      <Select
        value={role}
        onValueChange={(value) => updateRole({ conversationId, championId: value })}
      >
        <SelectTrigger label="Select a role" className="w-full" aria-label="Select a role">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {dungeonData.champions.map((role) => (
              <SelectItem key={role._id} value={role._id}>
                {role.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default UpdatePlayer;
