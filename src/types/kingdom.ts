export interface IAvatar {
  _id: string;
  name: string;
  energy: number;
  level: number;
  kingdomId: string;
  imageUrl?: string;
}

export interface IKingdom {
  avatars: IAvatar[];
  name: string;
  gold: number;
}
