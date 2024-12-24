import { env } from "@/env"

export const CREATOR_FACTORY_ADDRESS =
  env.NEXT_PUBLIC_CREATOR_FACTORY_ADDRESS as `0x${string}`

export const CREATOR_CONTRACT_ABI = [
  {
    type: "constructor",
    inputs: [
      { name: "_owner", type: "address", internalType: "address" },
      {
        name: "_feePerDonation",
        type: "uint96",
        internalType: "uint96"
      },
      { name: "_factory", type: "address", internalType: "address" },
      { name: "_name", type: "string", internalType: "string" },
      { name: "_bio", type: "string", internalType: "string" },
      { name: "_avatar", type: "string", internalType: "string" },
      {
        name: "_links",
        type: "tuple[]",
        internalType: "struct Link[]",
        components: [
          { name: "url", type: "string", internalType: "string" },
          { name: "label", type: "string", internalType: "string" }
        ]
      }
    ],
    stateMutability: "nonpayable"
  },
  { type: "receive", stateMutability: "payable" },
  {
    type: "function",
    name: "acceptDonation",
    inputs: [{ name: "donationId", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "addLink",
    inputs: [
      { name: "url", type: "string", internalType: "string" },
      { name: "label", type: "string", internalType: "string" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "avatar",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "bio",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "burnDonation",
    inputs: [{ name: "donationId", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "donate",
    inputs: [{ name: "message", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "payable"
  },
  {
    type: "function",
    name: "donations",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "donator", type: "address", internalType: "address" },
      { name: "amount", type: "uint96", internalType: "uint96" },
      { name: "message", type: "string", internalType: "string" },
      { name: "timestamp", type: "uint32", internalType: "uint32" },
      { name: "isAccepted", type: "bool", internalType: "bool" },
      { name: "isBurned", type: "bool", internalType: "bool" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "factory",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "feePerDonation",
    inputs: [],
    outputs: [{ name: "", type: "uint96", internalType: "uint96" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getContractBalance",
    inputs: [],
    outputs: [
      { name: "balance", type: "uint96", internalType: "uint96" },
      { name: "pendingAmount", type: "uint96", internalType: "uint96" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getDonation",
    inputs: [{ name: "donationId", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "donator", type: "address", internalType: "address" },
      { name: "amount", type: "uint96", internalType: "uint96" },
      { name: "message", type: "string", internalType: "string" },
      { name: "timestamp", type: "uint32", internalType: "uint32" },
      { name: "isAccepted", type: "bool", internalType: "bool" },
      { name: "isBurned", type: "bool", internalType: "bool" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getDonations",
    inputs: [
      { name: "offset", type: "uint256", internalType: "uint256" },
      { name: "limit", type: "uint256", internalType: "uint256" }
    ],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct Creator.Donation[]",
        components: [
          { name: "donator", type: "address", internalType: "address" },
          { name: "amount", type: "uint96", internalType: "uint96" },
          { name: "message", type: "string", internalType: "string" },
          { name: "timestamp", type: "uint32", internalType: "uint32" },
          { name: "isAccepted", type: "bool", internalType: "bool" },
          { name: "isBurned", type: "bool", internalType: "bool" }
        ]
      },
      { name: "", type: "uint256", internalType: "uint256" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getDonationsByDonator",
    inputs: [
      { name: "donator", type: "address", internalType: "address" },
      { name: "offset", type: "uint256", internalType: "uint256" },
      { name: "limit", type: "uint256", internalType: "uint256" }
    ],
    outputs: [
      {
        name: "result",
        type: "tuple[]",
        internalType: "struct Creator.Donation[]",
        components: [
          { name: "donator", type: "address", internalType: "address" },
          { name: "amount", type: "uint96", internalType: "uint96" },
          { name: "message", type: "string", internalType: "string" },
          { name: "timestamp", type: "uint32", internalType: "uint32" },
          { name: "isAccepted", type: "bool", internalType: "bool" },
          { name: "isBurned", type: "bool", internalType: "bool" }
        ]
      },
      { name: "total", type: "uint256", internalType: "uint256" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getDonationsCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getLinks",
    inputs: [
      { name: "offset", type: "uint256", internalType: "uint256" },
      { name: "limit", type: "uint256", internalType: "uint256" }
    ],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct Link[]",
        components: [
          { name: "url", type: "string", internalType: "string" },
          { name: "label", type: "string", internalType: "string" }
        ]
      },
      { name: "", type: "uint256", internalType: "uint256" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "links",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "url", type: "string", internalType: "string" },
      { name: "label", type: "string", internalType: "string" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "pause",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "paused",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "removeLink",
    inputs: [{ name: "index", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "unpause",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "updateAvatar",
    inputs: [{ name: "_avatar", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "updateBio",
    inputs: [{ name: "_bio", type: "string", internalType: "string" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "updateFeePerDonation",
    inputs: [
      {
        name: "_feePerDonation",
        type: "uint96",
        internalType: "uint96"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "withdrawExcessFunds",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "event",
    name: "DonationAccepted",
    inputs: [
      {
        name: "donationId",
        type: "uint256",
        indexed: true,
        internalType: "uint256"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "DonationBurned",
    inputs: [
      {
        name: "donationId",
        type: "uint256",
        indexed: true,
        internalType: "uint256"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "DonationReceived",
    inputs: [
      {
        name: "donator",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "amount",
        type: "uint96",
        indexed: false,
        internalType: "uint96"
      },
      {
        name: "message",
        type: "string",
        indexed: false,
        internalType: "string"
      },
      {
        name: "timestamp",
        type: "uint32",
        indexed: false,
        internalType: "uint32"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "ExcessWithdrawn",
    inputs: [
      {
        name: "amount",
        type: "uint96",
        indexed: false,
        internalType: "uint96"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "Paused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "Unpaused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  { type: "error", name: "EnforcedPause", inputs: [] },
  { type: "error", name: "ExpectedPause", inputs: [] },
  { type: "error", name: "OnlyFactoryOwner", inputs: [] },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [{ name: "owner", type: "address", internalType: "address" }]
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [{ name: "account", type: "address", internalType: "address" }]
  },
  { type: "error", name: "ReentrancyGuardReentrantCall", inputs: [] }
] as const

export const CREATOR_FACTORY_CONTRACT_ABI = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_feePerDonation",
        type: "uint96",
        internalType: "uint96"
      }
    ],
    stateMutability: "nonpayable"
  },
  { type: "receive", stateMutability: "payable" },
  {
    type: "function",
    name: "creatorContracts",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "creatorCount",
    inputs: [],
    outputs: [{ name: "", type: "uint32", internalType: "uint32" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "feePerDonation",
    inputs: [],
    outputs: [{ name: "", type: "uint96", internalType: "uint96" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getAllCreators",
    inputs: [],
    outputs: [{ name: "", type: "address[]", internalType: "address[]" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getCreatorBalance",
    inputs: [
      {
        name: "creatorAddress",
        type: "address",
        internalType: "address"
      }
    ],
    outputs: [
      { name: "balance", type: "uint96", internalType: "uint96" },
      { name: "pendingAmount", type: "uint96", internalType: "uint96" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getCreatorContract",
    inputs: [
      {
        name: "creatorAddress",
        type: "address",
        internalType: "address"
      }
    ],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getCreators",
    inputs: [
      { name: "offset", type: "uint256", internalType: "uint256" },
      { name: "limit", type: "uint256", internalType: "uint256" }
    ],
    outputs: [
      { name: "", type: "address[]", internalType: "address[]" },
      { name: "", type: "uint256", internalType: "uint256" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getDonationsByDonator",
    inputs: [
      { name: "donator", type: "address", internalType: "address" },
      { name: "offset", type: "uint256", internalType: "uint256" },
      { name: "limit", type: "uint256", internalType: "uint256" }
    ],
    outputs: [
      {
        name: "result",
        type: "tuple[]",
        internalType: "struct CreatorFactory.DonationWithCreator[]",
        components: [
          { name: "creator", type: "address", internalType: "address" },
          { name: "donator", type: "address", internalType: "address" },
          { name: "amount", type: "uint96", internalType: "uint96" },
          { name: "message", type: "string", internalType: "string" },
          { name: "timestamp", type: "uint32", internalType: "uint32" },
          { name: "isAccepted", type: "bool", internalType: "bool" },
          { name: "isBurned", type: "bool", internalType: "bool" }
        ]
      },
      { name: "total", type: "uint256", internalType: "uint256" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "pause",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "pauseCreator",
    inputs: [
      {
        name: "creatorAddress",
        type: "address",
        internalType: "address"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "paused",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "registerCreator",
    inputs: [
      { name: "name", type: "string", internalType: "string" },
      { name: "bio", type: "string", internalType: "string" },
      { name: "avatar", type: "string", internalType: "string" },
      {
        name: "links",
        type: "tuple[]",
        internalType: "struct Link[]",
        components: [
          { name: "url", type: "string", internalType: "string" },
          { name: "label", type: "string", internalType: "string" }
        ]
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "unpause",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "unpauseCreator",
    inputs: [
      {
        name: "creatorAddress",
        type: "address",
        internalType: "address"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "updateFeePerDonation",
    inputs: [
      {
        name: "_feePerDonation",
        type: "uint96",
        internalType: "uint96"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "withdrawAllCreatorsExcess",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "withdrawCreatorExcess",
    inputs: [
      {
        name: "creatorAddress",
        type: "address",
        internalType: "address"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "withdrawFees",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "event",
    name: "CreatorExcessWithdrawn",
    inputs: [
      {
        name: "creatorContract",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "amount",
        type: "uint96",
        indexed: false,
        internalType: "uint96"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "CreatorRegistered",
    inputs: [
      {
        name: "creatorAddress",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "contractAddress",
        type: "address",
        indexed: false,
        internalType: "address"
      },
      {
        name: "name",
        type: "string",
        indexed: false,
        internalType: "string"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "FeeUpdated",
    inputs: [
      {
        name: "newFee",
        type: "uint96",
        indexed: false,
        internalType: "uint96"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "FeesWithdrawn",
    inputs: [
      {
        name: "amount",
        type: "uint96",
        indexed: false,
        internalType: "uint96"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "Paused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "Unpaused",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: false,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  { type: "error", name: "CreatorExists", inputs: [] },
  { type: "error", name: "CreatorNotFound", inputs: [] },
  { type: "error", name: "EnforcedPause", inputs: [] },
  { type: "error", name: "ExpectedPause", inputs: [] },
  { type: "error", name: "NoFeesToWithdraw", inputs: [] },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [{ name: "owner", type: "address", internalType: "address" }]
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [{ name: "account", type: "address", internalType: "address" }]
  },
  { type: "error", name: "TransferFailed", inputs: [] }
] as const
