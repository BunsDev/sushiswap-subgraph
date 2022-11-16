const NATIVE_ADDRESS = '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83'
const WETH_ADDRESS = '0x74b23882a30290451a17c44f4f05243b6b58c76d'
const FUSD_ADDRESS = '0xad84341756bf337f5a0164515b1f6f993d194e1f'
const DAI_ADDRESS = '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e'
const USDC_ADDRESS = '0x04068da6c83afcfa0e13ba15a6696662335d5b75'

module.exports = {
  network: 'fantom',
  coffinbox: {
    address: '0xf539c37275e947f24480fab9f7e302ae827570b2',
    startBlock: 28986807,
  },
  underworld: {
    mediumRiskMasterContractAddresses: ['0x94f2ae18250507506c77cefc14ee7b4b95d323b1'],
  },
  legacy: {
    native: { address: NATIVE_ADDRESS },
    whitelistedTokenAddresses: [
      // IMPORTANT! The native address must be included for pricing to start
      NATIVE_ADDRESS,
      WETH_ADDRESS,
      FUSD_ADDRESS,
      DAI_ADDRESS,
      USDC_ADDRESS,
    ],
    stableTokenAddresses: [USDC_ADDRESS, DAI_ADDRESS],
    minimumNativeLiquidity: 5,
    minimum_usd_threshold_new_pairs: '100',
    factory: {
      address: '0x1120e150da9def6fe930f4feded18ef57c0ca7ef',
      initCodeHash: '0xf3dcc3c6c6e34d3981dd429ac942301b9ebdd05de1be17f646b55476c44dc951',
      startBlock: 16108819,
    },
  },
}