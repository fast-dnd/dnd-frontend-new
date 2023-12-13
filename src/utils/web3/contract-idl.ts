export type V3rpgContract = {
  version: "0.1.0";
  name: "v3rpg_contract";
  instructions: [
    {
      name: "createCommunity";
      accounts: [
        {
          name: "authority";
          isMut: true;
          isSigner: true;
        },
        {
          name: "gameCurrency";
          isMut: false;
          isSigner: false;
        },
        {
          name: "rewardPool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "communityData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "name";
          type: "string";
        },
        {
          name: "basePrice";
          type: "u64";
        },
        {
          name: "collection";
          type: {
            option: "publicKey";
          };
        },
        {
          name: "poolShare";
          type: "u16";
        },
        {
          name: "creatorShare";
          type: "u16";
        },
        {
          name: "feeShare";
          type: "u16";
        },
      ];
    },
    {
      name: "createAdventure";
      accounts: [
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "adventureData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "currencyMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "adventureTreasury";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "title";
          type: "string";
        },
        {
          name: "isInCommunity";
          type: "bool";
        },
      ];
    },
    {
      name: "withdrawFunds";
      accounts: [
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "adventureData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "currencyMint";
          isMut: false;
          isSigner: false;
        },
        {
          name: "adventureTreasury";
          isMut: true;
          isSigner: false;
        },
        {
          name: "userToken";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        },
      ];
    },
    {
      name: "playAdventure";
      accounts: [
        {
          name: "payer";
          isMut: true;
          isSigner: true;
        },
        {
          name: "authority";
          isMut: false;
          isSigner: true;
        },
        {
          name: "userToken";
          isMut: true;
          isSigner: false;
        },
        {
          name: "adventureData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "adventureTreasury";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "feeTreasury";
          isMut: true;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "transferAmount";
          type: "u64";
        },
      ];
    },
    {
      name: "distributeRewards";
      accounts: [
        {
          name: "authority";
          isMut: false;
          isSigner: true;
        },
        {
          name: "communityData";
          isMut: true;
          isSigner: false;
        },
        {
          name: "rewardsPool";
          isMut: true;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "amounts";
          type: {
            vec: "u64";
          };
        },
      ];
    },
  ];
  accounts: [
    {
      name: "communityData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "name";
            type: "string";
          },
          {
            name: "basePrice";
            type: "u64";
          },
          {
            name: "currency";
            type: "publicKey";
          },
          {
            name: "createdAt";
            type: "i64";
          },
          {
            name: "collectionMint";
            type: {
              option: "publicKey";
            };
          },
          {
            name: "poolShare";
            type: "u16";
          },
          {
            name: "creatorShare";
            type: "u16";
          },
          {
            name: "feeShare";
            type: "u16";
          },
          {
            name: "totalDistributed";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "adventureData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "publicKey";
          },
          {
            name: "community";
            type: {
              option: "publicKey";
            };
          },
          {
            name: "createdAt";
            type: "i64";
          },
          {
            name: "title";
            type: "string";
          },
          {
            name: "timesPlayed";
            type: "u32";
          },
          {
            name: "totalDeposited";
            type: "u64";
          },
          {
            name: "totalWithdrawn";
            type: "u64";
          },
          {
            name: "currency";
            type: "publicKey";
          },
        ];
      };
    },
  ];
  errors: [
    {
      code: 6000;
      name: "InvalidAuthority";
      msg: "Invalid platform authority";
    },
    {
      code: 6001;
      name: "InvalidCommunityCurrency";
      msg: "Invalid community currency";
    },
    {
      code: 6002;
      name: "NotEnoughBalance";
      msg: "Not enough balance";
    },
    {
      code: 6003;
      name: "InvalidCreatorAuthority";
      msg: "Invalid creator authority";
    },
    {
      code: 6004;
      name: "InvalidFeeAccount";
      msg: "Invalid fee account";
    },
    {
      code: 6005;
      name: "NotImplemented";
      msg: "Not implemented";
    },
    {
      code: 6006;
      name: "InvalidCommunity";
      msg: "Invalid community";
    },
    {
      code: 6007;
      name: "InvalidFeeConfiguration";
      msg: "Invalid fee configuration";
    },
    {
      code: 6008;
      name: "InvalidRewardPool";
      msg: "Invalid reward pool";
    },
  ];
};

export const IDL: V3rpgContract = {
  version: "0.1.0",
  name: "v3rpg_contract",
  instructions: [
    {
      name: "createCommunity",
      accounts: [
        {
          name: "authority",
          isMut: true,
          isSigner: true,
        },
        {
          name: "gameCurrency",
          isMut: false,
          isSigner: false,
        },
        {
          name: "rewardPool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "communityData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "basePrice",
          type: "u64",
        },
        {
          name: "collection",
          type: {
            option: "publicKey",
          },
        },
        {
          name: "poolShare",
          type: "u16",
        },
        {
          name: "creatorShare",
          type: "u16",
        },
        {
          name: "feeShare",
          type: "u16",
        },
      ],
    },
    {
      name: "createAdventure",
      accounts: [
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "adventureData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "currencyMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "adventureTreasury",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "isInCommunity",
          type: "bool",
        },
      ],
    },
    {
      name: "withdrawFunds",
      accounts: [
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "adventureData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "currencyMint",
          isMut: false,
          isSigner: false,
        },
        {
          name: "adventureTreasury",
          isMut: true,
          isSigner: false,
        },
        {
          name: "userToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "playAdventure",
      accounts: [
        {
          name: "payer",
          isMut: true,
          isSigner: true,
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "userToken",
          isMut: true,
          isSigner: false,
        },
        {
          name: "adventureData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "adventureTreasury",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "feeTreasury",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "transferAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "distributeRewards",
      accounts: [
        {
          name: "authority",
          isMut: false,
          isSigner: true,
        },
        {
          name: "communityData",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rewardsPool",
          isMut: true,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amounts",
          type: {
            vec: "u64",
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: "communityData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "name",
            type: "string",
          },
          {
            name: "basePrice",
            type: "u64",
          },
          {
            name: "currency",
            type: "publicKey",
          },
          {
            name: "createdAt",
            type: "i64",
          },
          {
            name: "collectionMint",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "poolShare",
            type: "u16",
          },
          {
            name: "creatorShare",
            type: "u16",
          },
          {
            name: "feeShare",
            type: "u16",
          },
          {
            name: "totalDistributed",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "adventureData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey",
          },
          {
            name: "community",
            type: {
              option: "publicKey",
            },
          },
          {
            name: "createdAt",
            type: "i64",
          },
          {
            name: "title",
            type: "string",
          },
          {
            name: "timesPlayed",
            type: "u32",
          },
          {
            name: "totalDeposited",
            type: "u64",
          },
          {
            name: "totalWithdrawn",
            type: "u64",
          },
          {
            name: "currency",
            type: "publicKey",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "InvalidAuthority",
      msg: "Invalid platform authority",
    },
    {
      code: 6001,
      name: "InvalidCommunityCurrency",
      msg: "Invalid community currency",
    },
    {
      code: 6002,
      name: "NotEnoughBalance",
      msg: "Not enough balance",
    },
    {
      code: 6003,
      name: "InvalidCreatorAuthority",
      msg: "Invalid creator authority",
    },
    {
      code: 6004,
      name: "InvalidFeeAccount",
      msg: "Invalid fee account",
    },
    {
      code: 6005,
      name: "NotImplemented",
      msg: "Not implemented",
    },
    {
      code: 6006,
      name: "InvalidCommunity",
      msg: "Invalid community",
    },
    {
      code: 6007,
      name: "InvalidFeeConfiguration",
      msg: "Invalid fee configuration",
    },
    {
      code: 6008,
      name: "InvalidRewardPool",
      msg: "Invalid reward pool",
    },
  ],
};
