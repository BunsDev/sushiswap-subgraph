import { Address } from '@graphprotocol/graph-ts'
import { UnderworldPairAccrueInfo } from '../../generated/schema'
import { UnderworldPair as UnderworldPairContract } from '../../generated/CoffinBox/UnderworldPair'

export function createUnderworldPairAccrueInfo(id: Address): UnderworldPairAccrueInfo {
  const pairContract = UnderworldPairContract.bind(id)
  const accrueInfo = pairContract.accrueInfo()
  const underworldPairAccureInfo = new UnderworldPairAccrueInfo(id.toHex())
  underworldPairAccureInfo.interestPerSecond = accrueInfo.value0
  underworldPairAccureInfo.lastAccrued = accrueInfo.value1
  underworldPairAccureInfo.feesEarnedFraction = accrueInfo.value2
  underworldPairAccureInfo.save()
  return underworldPairAccureInfo
}

export function getUnderworldPairAccrueInfo(id: string): UnderworldPairAccrueInfo {
  return UnderworldPairAccrueInfo.load(id) as UnderworldPairAccrueInfo
}