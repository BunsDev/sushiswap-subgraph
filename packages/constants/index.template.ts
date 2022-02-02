import { Address, BigDecimal, BigInt } from '@graphprotocol/graph-ts'

export const NULL_CALL_RESULT_VALUE = '0x0000000000000000000000000000000000000000000000000000000000000001'

export const ADDRESS_ZERO = Address.fromString('0x0000000000000000000000000000000000000000')

export const BIG_DECIMAL_1E6 = BigDecimal.fromString('1e6')

export const BIG_DECIMAL_1E12 = BigDecimal.fromString('1e12')

export const BIG_DECIMAL_1E18 = BigDecimal.fromString('1e18')

export const BIG_DECIMAL_ZERO = BigDecimal.fromString('0')

export const BIG_DECIMAL_ONE = BigDecimal.fromString('1')

export const BIG_INT_ONE = BigInt.fromI32(1)

export const BIG_INT_TWO = BigInt.fromI32(2)

export const BIG_INT_ONE_HUNDRED = BigInt.fromI32(100)

export const BIG_INT_ONE_DAY_SECONDS = BigInt.fromI32(86400)

export const BIG_INT_ZERO = BigInt.fromI32(0)

export const LOCKUP_POOL_NUMBER = BigInt.fromI32(29)

export const LOCKUP_BLOCK_NUMBER = BigInt.fromI32(10959148)

export const MASTER_CHEF_START_BLOCK = BigInt.fromI32(15000000)

export const UNISWAP_SOUL_ETH_PAIR_FIRST_LIQUDITY_BLOCK = BigInt.fromI32(10750005)

export const ACC_SOUL_PRECISION = BigInt.fromString('1000000000000')

export const COFFINBOX_DEPOSIT = 'deposit'

export const COFFINBOX_TRANSFER = 'transfer'

export const COFFINBOX_WITHDRAW = 'withdraw'

export const UNDERWORLD_PAIR_MEDIUM_RISK_TYPE = 'medium'

export const PAIR_ADD_COLLATERAL = 'addCollateral'

export const PAIR_REMOVE_COLLATERAL = 'removeCollateral'

export const PAIR_ADD_ASSET = 'addAsset'

export const PAIR_REMOVE_ASSET = 'removeAsset'

export const PAIR_BORROW = 'borrow'

export const PAIR_REPAY = 'repay'

export const FACTORY_ADDRESS = Address.fromString(
  '{{ factory_address }}{{^factory_address}}0x0000000000000000000000000000000000000000{{/factory_address}}'
)

export const MASTER_CHEF_ADDRESS = Address.fromString(
  '{{ masterchef_address }}{{^masterchef_address}}0x0000000000000000000000000000000000000000{{/masterchef_address}}'
)

export const MASTER_CHEF_V2_ADDRESS = Address.fromString('0xef0881ec094552b2e128cf945ef17a6752b4ec5d')

export const SOUL_BAR_ADDRESS = Address.fromString(
  '{{ sushi_bar_address }}{{^sushi_bar_address}}0x0000000000000000000000000000000000000000{{/sushi_bar_address}}'
)

export const SOUL_MAKER_ADDRESS = Address.fromString(
  '{{ sushi_maker_address }}{{^sushi_maker_address}}0x0000000000000000000000000000000000000000{{/sushi_maker_address}}'
)

export const SOUL_TOKEN_ADDRESS = Address.fromString(
  '{{ soul_address }}{{^soul_address}}0x0000000000000000000000000000000000000000{{/soul_address}}'
)

export const SOUL_USDT_PAIR_ADDRESS = Address.fromString(
  '{{ soul_usdt_pair_address }}{{^soul_usdt_pair_address}}0x0000000000000000000000000000000000000000{{/soul_usdt_pair_address}}'
)

export const SEANCE_USDC_PAIR_ADDRESS = Address.fromString(
  '{{ seance_usdc_pair_address }}{{^seance_usdc_pair_address}}0x0000000000000000000000000000000000000000{{/seance_usdc_pair_address}}'
)

export const SEANCE_WETH_PAIR_ADDRESS = Address.fromString(
  '{{ seance_weth_pair_address }}{{^seance_weth_pair_address}}0x0000000000000000000000000000000000000000{{/seance_weth_pair_address}}'
)

export const SOUL_DISTRIBUTOR_ADDRESS = Address.fromString(
  '{{ soul_distributor_address }}{{^soul_distributor_address}}0x0000000000000000000000000000000000000000{{/soul_distributor_address}}'
)

export const USDC_WETH_PAIR =
  '{{ usdc_weth_pair }}{{^usdc_weth_pair}}0x0000000000000000000000000000000000000000{{/usdc_weth_pair}}'

export const DAI_WETH_PAIR =
  '{{ dai_weth_pair }}{{^dai_weth_pair}}0x0000000000000000000000000000000000000000{{/dai_weth_pair}}'

export const USDT_WETH_PAIR =
  '{{ usdt_weth_pair }}{{^usdt_weth_pair}}0x0000000000000000000000000000000000000000{{/usdt_weth_pair}}'

export const SOUL_USDT_PAIR =
  '{{ soul_usdt_pair }}{{^soul_usdt_pair}}0x0000000000000000000000000000000000000000{{/soul_usdt_pair}}'

// minimum liquidity required to count towards tracked volume for pairs with small # of Lps
export const MINIMUM_USD_THRESHOLD_NEW_PAIRS = BigDecimal.fromString(
  '{{ minimum_usd_threshold_new_pairs }}{{^minimum_usd_threshold_new_pairs}}3000{{/minimum_usd_threshold_new_pairs}}'
)

// minimum liquidity for price to get tracked
export const MINIMUM_LIQUIDITY_THRESHOLD_ETH = BigDecimal.fromString('{{ minimum_liquidity_threshold_eth }}')

export const WETH_ADDRESS = Address.fromString(
  '{{ weth_address }}{{^weth_address}}0x0000000000000000000000000000000000000000{{/weth_address}}'
)

export const SOULSWAP_WETH_USDT_PAIR_ADDRESS = Address.fromString(
  '{{ soulswap_weth_usdt_pair_address }}{{^soulswap_weth_usdt_pair_address}}0x0000000000000000000000000000000000000000{{/soulswap_weth_usdt_pair_address}}'
)

export const USDT_ADDRESS = Address.fromString(
  '{{ usdt_address }}{{^usdt_address}}0x0000000000000000000000000000000000000000{{/usdt_address}}'
)

export const UNISWAP_FACTORY_ADDRESS = Address.fromString(
  '{{ uniswap_factory_address }}{{^uniswap_factory_address}}0x0000000000000000000000000000000000000000{{/uniswap_factory_address}}'
)

export const UNISWAP_WETH_USDT_PAIR_ADDRESS = Address.fromString(
  '{{ uniswap_weth_usdt_pair_address }}{{^uniswap_weth_usdt_pair_address}}0x0000000000000000000000000000000000000000{{/uniswap_weth_usdt_pair_address}}'
)

export const UNISWAP_SOUL_ETH_PAIR_ADDRESS = Address.fromString(
  '{{ uniswap_sushi_eth_pair_address }}{{^uniswap_sushi_eth_pair_address}}0x0000000000000000000000000000000000000000{{/uniswap_sushi_eth_pair_address}}'
)

export const UNISWAP_SOUL_USDT_PAIR_ADDRESS = Address.fromString(
  '{{ uniswap_soul_usdt_pair_address }}{{^uniswap_soul_usdt_pair_address}}0x0000000000000000000000000000000000000000{{/uniswap_soul_usdt_pair_address}}'
)

// Coffinbox constants
export const COFFINBOX_ADDRESS = Address.fromString(
  '{{ coffinbox_address }}{{^coffinbox_address}}0x0000000000000000000000000000000000000000{{/coffinbox_address}}'
)

export const UNDERWORLD_PAIR_MEDIUM_RISK_MASTER_ADDRESS = Address.fromString(
  '{{ underworld_pair_medium_risk_master_address }}{{^underworld_pair_medium_risk_master_address}}0x0000000000000000000000000000000000000000{{/underworld_pair_medium_risk_master_address}}'
)

export const COMPLEX_REWARDER = Address.fromString(
  '{{ complex_rewarder_address }}{{^complex_rewarder_address}}0x0000000000000000000000000000000000000000{{/complex_rewarder_address}}'
)

export const CONVEX_REWARDERS: Array<Address> = [
  Address.fromString('0x9e01aac4b3e8781a85b21d9d9f848e72af77b362'),
  Address.fromString('0x1fd97b5e5a257b0b9b9a42a96bb8870cbdd1eb79'),
]

export const ALCX_REWARDER = Address.fromString('0x7519c93fc5073e15d89131fd38118d73a72370f8')

export const LIDO_REWARDER = Address.fromString('0x75ff3dd673ef9fc459a52e1054db5df2a1101212')

export const NATIVE = Address.fromString(
  '{{ native_address }}{{^native_address}}0x0000000000000000000000000000000000000000{{/native_address}}'
)

export const USDC = '{{ usdc_address }}{{^usdc_address}}0x0000000000000000000000000000000000000000{{/usdc_address}}'

export const USDT = '{{ usdt_address }}{{^usdt_address}}0x0000000000000000000000000000000000000000{{/usdt_address}}'

export const DAI = '{{ dai_address }}{{^dai_address}}0x0000000000000000000000000000000000000000{{/dai_address}}'

export const WHITELIST: string[] = '{{ whitelist }}'.split(',')

// export const WHITELIST: string[] = [
//   "0xcf664087a5bb0237a0bad6742852ec6c8d69a27a",
//   "0x6983d1e6def3690c4d616b13597a09e6193ea013",
//   "0x3095c7557bcb296ccc6e363de01b760ba031f2d9",
//   "0x985458e523db3d53125813ed68c274899e9dfab4",
//   "0x3c2b8be99c50593081eaa2a724f0b8285f5aba8f",
//   "0xe176ebe47d621b984a73036b9da5d834411ef734",
// ]

// export const WHITELIST: string[] = [
//   "0x471ece3750da237f93b8e339c536989b8978a438",
//   "0xd629eb00deced2a080b7ec630ef6ac117e614f1b",
//   "0x765de816845861e75a25fca122bb6898b8b1282a",
//   "0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73"
// ];

const CUSTOM_BASES = new Map<string, string>()
