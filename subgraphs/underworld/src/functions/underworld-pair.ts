import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts'

import { UnderworldPair } from '../../generated/schema'
import { UnderworldPair as UnderworldPairContract } from '../../generated/CoffinBox/UnderworldPair'
import { getOrCreateCoffinBox } from './coffinbox'
import { getOrCreateMasterContract } from './master-contract'
import { createUnderworldPairAccrueInfo } from './underworld-pair-accrue-info'
import { getOrCreateToken } from './token'
import { LogDeploy } from '../../generated/CoffinBox/CoffinBox'
import { createRebase } from './rebase'
import { STARTING_INTEREST_PER_YEAR } from '../constants'
import { UnderworldPair as UnderworldPairTemplate } from '../../generated/templates'

// TODO: should add props for specific underworld pair types (collateralization rates, etc.)

export function createUnderworldPair(event: LogDeploy): void {
  const pairContract = UnderworldPairContract.bind(event.params.cloneAddress)

  if (pairContract.try_symbol().reverted || pairContract.try_name().reverted) {
    return
  }

  const coffinBox = getOrCreateCoffinBox()

  const master = getOrCreateMasterContract(event.params.masterContract)

  const asset = getOrCreateToken(pairContract.asset().toHex())
  const collateral = getOrCreateToken(pairContract.collateral().toHex())

  const accrueInfo = createUnderworldPairAccrueInfo(event.params.cloneAddress)

  const totalAsset = createRebase(event.params.cloneAddress.toHex().concat('-').concat('asset'))
  const totalBorrow = createRebase(event.params.cloneAddress.toHex().concat('-').concat('borrow'))

  const pair = new UnderworldPair(event.params.cloneAddress.toHex())
  pair.coffinBox = coffinBox.id
  pair.masterContract = master.id
  pair.feeTo = pairContract.feeTo()
  pair.collateral = collateral.id
  pair.asset = asset.id
  pair.oracle = pairContract.oracle()
  pair.oracleData = pairContract.oracleData()
  pair.totalCollateralShare = pairContract.totalCollateralShare()
  pair.totalAsset = totalAsset.id
  pair.totalBorrow = totalBorrow.id
  pair.exchangeRate = pairContract.exchangeRate()
  pair.accrueInfo = accrueInfo.id
  pair.name = pairContract.name()
  pair.symbol = pairContract.symbol()
  pair.decimals = BigInt.fromU32(pairContract.decimals())
  pair.totalSupply = pairContract.totalSupply()

  pair.borrowAPR = BigInt.fromU32(0)
  pair.supplyAPR = STARTING_INTEREST_PER_YEAR
  pair.utilization = BigInt.fromU32(0)
  pair.totalFeesEarnedFraction = BigInt.fromU32(0)

  pair.block = event.block.number
  pair.timestamp = event.block.timestamp
  pair.save()

  UnderworldPairTemplate.create(event.params.cloneAddress)
}

export function getUnderworldPair(address: Address, block: ethereum.Block): UnderworldPair {
  const id = address.toHex()
  let pair = UnderworldPair.load(id) as UnderworldPair

  pair.block = block.number
  pair.timestamp = block.timestamp
  pair.save()

  return pair as UnderworldPair
}