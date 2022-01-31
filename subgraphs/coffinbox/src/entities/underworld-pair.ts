import { Address, ethereum } from '@graphprotocol/graph-ts'

import { BIG_INT_ZERO, BIG_INT_ONE, UNDERWORLD_PAIR_MEDIUM_RISK_TYPE } from 'const'
import { STARTING_INTEREST_PER_YEAR } from '../underworld-constants'
import { UnderworldPair } from '../../generated/schema'
import { UnderworldPair as UnderworldPairContract } from '../../generated/CoffinBox/UnderworldPair'
import { getToken } from './token'
import { getCoffinBox } from './coffinbox'
import { getMasterContract } from './master-contract'

export function createUnderworldPair(address: Address, block: ethereum.Block, type: string): UnderworldPair {
  const pairContract = UnderworldPairContract.bind(address)
  const masterContract = UnderworldPairContract.bind(pairContract.masterContract())

  const coffinBox = getCoffinBox(block)
  const master = getMasterContract(pairContract.masterContract(), block)
  const asset = getToken(pairContract.asset(), block)
  const collateral = getToken(pairContract.collateral(), block)
  const accrueInfo = pairContract.accrueInfo()

  const pair = new UnderworldPair(address.toHex())

  // TODO: should add props for specific underworld pair types (collateralization rates, etc.)

  pair.coffinBox = coffinBox.id
  pair.type = type
  pair.masterContract = master.id
  pair.owner = masterContract.owner()
  pair.feeTo = masterContract.feeTo()
  pair.name = pairContract.name()
  pair.symbol = pairContract.symbol()
  pair.oracle = pairContract.oracle()
  pair.asset = asset.id
  pair.collateral = collateral.id
  pair.exchangeRate = pairContract.exchangeRate()
  pair.totalAssetBase = BIG_INT_ZERO
  pair.totalAssetElastic = BIG_INT_ZERO
  pair.totalCollateralShare = BIG_INT_ZERO
  pair.totalBorrowBase = BIG_INT_ZERO
  pair.totalBorrowElastic = BIG_INT_ZERO
  pair.interestPerSecond = accrueInfo.value0
  pair.utilization = BIG_INT_ZERO
  pair.feesEarnedFraction = accrueInfo.value2
  pair.totalFeesEarnedFraction = BIG_INT_ZERO
  pair.lastAccrued = accrueInfo.value1
  pair.supplyAPR = BIG_INT_ZERO
  pair.borrowAPR = STARTING_INTEREST_PER_YEAR
  pair.block = block.number
  pair.timestamp = block.timestamp

  pair.save()

  coffinBox.totalUnderworldPairs = coffinBox.totalUnderworldPairs.plus(BIG_INT_ONE)
  coffinBox.save()

  return pair as UnderworldPair
}

export function getUnderworldPair(address: Address, block: ethereum.Block): UnderworldPair {
  const id = address.toHex()
  let pair = UnderworldPair.load(id)

  pair.block = block.number
  pair.timestamp = block.timestamp
  pair.save()

  return pair as UnderworldPair
}
