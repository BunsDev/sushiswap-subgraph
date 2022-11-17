const NATIVE_ADDRESS = '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7'
const WETH_ADDRESS = '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab'
const USDC_ADDRESS = '0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e'
const DAI_ADDRESS = '0xd586e7f844cea2f87f50152665bcbc2c279d8d70'
const WBTC_ADDRESS = '0x50b7545627a5162f82a992c33b87adc75187b218'
const SOUL_ADDRESS = '0x11d6dd25c1695764e64f439e32cc7746f3945543'

module.exports = {
  network: 'avalanche',
  soul: { address: SOUL_ADDRESS },
  weth: { address: WETH_ADDRESS },
  wbtc: { address: WBTC_ADDRESS },
  coffinbox: {
    address: '0x51d7d0d03a9e38ba550f24cea28b992ad2350fee',
    startBlock: 17148342,
  },
  underworld: {
    mediumRiskMasterContractAddresses: ['0xe80922adb47964d096ca6f61c0bbc38d5bc218e2'],
  },
  legacy: {
    native: { address: NATIVE_ADDRESS },
    whitelistedTokenAddresses: [
      // IMPORTANT! The native address must be included for pricing to start
      WETH_ADDRESS,
      USDC_ADDRESS,
      DAI_ADDRESS,
      WBTC_ADDRESS,
      SOUL_ADDRESS,
    ],
    stableTokenAddresses: [USDC_ADDRESS, DAI_ADDRESS],
    minimumNativeLiquidity: 5,
    minimum_usd_threshold_new_pairs: '100',
    factory: {
      address: '0x5bb2a9984de4a69c05c996f7ef09597ac8c9d63a',
      initCodeHash: '0xab9f67104ee4239d49c6b434dc5d6d76f43412862be0f00a0607199ad505abc6',
      startBlock: 17149268 ,
    },
  },
}