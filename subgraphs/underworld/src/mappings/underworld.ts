import {
    Approval,
    LogExchangeRate,
    LogAccrue,
    LogAddCollateral,
    LogAddAsset,
    LogRemoveCollateral,
    LogRemoveAsset,
    LogBorrow,
    LogRepay,
    LogFeeTo,
    LogWithdrawFees,
    Transfer,
  } from '../../generated/templates/UnderworldPair/UnderworldPair'
  import { getUnderworldPair, getRebase, toBase } from '../functions'
  import { BigInt, log } from '@graphprotocol/graph-ts'
  import { getInterestPerYear, takeFee } from '../helpers/interest'
  import { getUnderworldPairAccrueInfo } from '../functions/underworld-pair-accrue-info'
  import { updateUnderworldPairSnapshots } from '../functions/underworld-pair-snapshot'
  
  // TODO: add callHandler for liquidate function on UnderworldPairs
  
  export function handleLogExchangeRate(event: LogExchangeRate): void {
    log.info('[CoffinBox:UnderworldPair] Log Exchange Rate {}', [event.params.rate.toString()])
    const pair = getUnderworldPair(event.address, event.block)
    pair.exchangeRate = event.params.rate
    pair.block = event.block.number
    pair.timestamp = event.block.timestamp
    pair.save()
    updateUnderworldPairSnapshots(event.block.timestamp, pair)
  }
  
  export function handleLogAccrue(event: LogAccrue): void {
    log.info('[CoffinBox:UnderworldPair] Log Accrue {} {} {} {}', [
      event.params.accruedAmount.toString(),
      event.params.feeFraction.toString(),
      event.params.rate.toString(),
      event.params.utilization.toString(),
    ])
  
    const pair = getUnderworldPair(event.address, event.block)
  
    const totalAsset = getRebase(pair.id.concat('-').concat('asset'))
    const totalBorrow = getRebase(pair.id.concat('-').concat('borrow'))
  
    const extraAmount = event.params.accruedAmount
    const feeFraction = event.params.feeFraction
  
    totalAsset.base = totalAsset.base.plus(feeFraction)
    totalAsset.save()
  
    totalBorrow.elastic = totalBorrow.elastic.plus(extraAmount)
    totalBorrow.save()
  
    const accrueInfo = getUnderworldPairAccrueInfo(pair.id)
    accrueInfo.feesEarnedFraction = accrueInfo.feesEarnedFraction.plus(feeFraction)
    accrueInfo.interestPerSecond = event.params.rate
    accrueInfo.lastAccrued = event.block.timestamp
    accrueInfo.save()
  
    const borrowAPR = getInterestPerYear(
      totalBorrow.base,
      accrueInfo.interestPerSecond,
      accrueInfo.lastAccrued,
      event.block.timestamp,
      pair.utilization
    )
    const supplyAPR = takeFee(borrowAPR.times(pair.utilization)).div(BigInt.fromString('1000000000000000000'))
    pair.supplyAPR = supplyAPR
    pair.borrowAPR = borrowAPR
    pair.utilization = event.params.utilization
    pair.block = event.block.number
    pair.timestamp = event.block.timestamp
    pair.save()
    
    updateUnderworldPairSnapshots(event.block.timestamp, pair)
  }
  
  export function handleLogAddCollateral(event: LogAddCollateral): void {
    log.info('[CoffinBox:UnderworldPair] Log Add Collateral {} {} {}', [
      event.params.from.toHex(),
      event.params.to.toHex(),
      event.params.share.toString(),
    ])
    const pair = getUnderworldPair(event.address, event.block)
    pair.totalCollateralShare = pair.totalCollateralShare.plus(event.params.share)
    pair.save()
    updateUnderworldPairSnapshots(event.block.timestamp, pair)
  }
  
  export function handleLogRemoveCollateral(event: LogRemoveCollateral): void {
    log.info('[CoffinBox:UnderworldPair] Log Remove Collateral {} {} {}', [
      event.params.from.toHex(),
      event.params.to.toHex(),
      event.params.share.toString(),
    ])
  
    const share = event.params.share
  
    const pair = getUnderworldPair(event.address, event.block)
    pair.totalCollateralShare = pair.totalCollateralShare.minus(share)
    pair.save()
    updateUnderworldPairSnapshots(event.block.timestamp, pair)
    // const poolPercentage = share.div(pair.totalCollateralShare).times(BigInt.fromI32(100))
  }
  
  export function handleLogAddAsset(event: LogAddAsset): void {
    log.info('[CoffinBox:UnderworldPair] Log Add Asset {} {} {} {}', [
      event.params.from.toHex(),
      event.params.to.toHex(),
      event.params.share.toString(),
      event.params.fraction.toString(),
    ])
    // elastic = CoffinBox shares held by the UnderworldPair, base = Total fractions held by asset suppliers
  
    const share = event.params.share
    const fraction = event.params.fraction
  
    const totalAsset = getRebase(event.address.toHex().concat('-').concat('asset'))
    totalAsset.elastic = totalAsset.elastic.plus(share)
    totalAsset.base = totalAsset.base.plus(fraction)
    totalAsset.save()
  }
  
  export function handleLogRemoveAsset(event: LogRemoveAsset): void {
    log.info('[CoffinBox:UnderworldPair] Log Remove Asset {} {} {} {}', [
      event.params.from.toHex(),
      event.params.to.toHex(),
      event.params.share.toString(),
      event.params.fraction.toString(),
    ])
    // elastic = CoffinBox shares held by the UnderworldPair, base = Total fractions held by asset suppliers
  
    const share = event.params.share
    const fraction = event.params.fraction
    const totalAsset = getRebase(event.address.toHex().concat('-').concat('asset'))
  
    const poolPercentage = fraction.div(totalAsset.base).times(BigInt.fromI32(100))
  
    totalAsset.elastic = totalAsset.elastic.minus(share)
    totalAsset.base = totalAsset.base.minus(fraction)
    totalAsset.save()
  
    //TODO: maybe update user and check if solvent
  }
  
  export function handleLogBorrow(event: LogBorrow): void {
    log.info('[CoffinBox:UnderworldPair] Log Borrow {} {} {} {} {}', [
      event.params.from.toHex(),
      event.params.to.toHex(),
      event.params.amount.toString(),
      event.params.feeAmount.toString(),
      event.params.part.toString(),
    ])
    // elastic = Total token amount to be repayed by borrowers, base = Total parts of the debt held by borrowers
  
    const amount = event.params.amount
    const feeAmount = event.params.feeAmount
    const part = event.params.part
  
    const pair = getUnderworldPair(event.address, event.block)
  
    const totalBorrow = getRebase(event.address.toHex().concat('-').concat('borrow'))
    totalBorrow.base = totalBorrow.base.plus(part)
    totalBorrow.elastic = totalBorrow.elastic.plus(amount.plus(feeAmount))
    totalBorrow.save()
  
    const totalAsset = getRebase(event.address.toHex().concat('-').concat('asset'))
  
    const total = getRebase(pair.asset)
  
    const share = toBase(total, amount, false)
  
    log.info('LogBorrowDebug - block: {} total.elastic: {} total.base: {} elastic: {} share: {}', [
      event.block.number.toString(),
      total.elastic.toString(),
      total.base.toString(),
      amount.toString(),
      share.toString(),
    ])
  
    totalAsset.elastic = totalAsset.elastic.minus(share)
    totalAsset.save()
  }
  
  export function handleLogRepay(event: LogRepay): void {
    log.info('[CoffinBox:UnderworldPair] Log Repay {} {}', [
      event.params.from.toHex(),
      event.params.to.toHex(),
      event.params.amount.toString(),
      event.params.part.toString(),
    ])
    // elastic = Total token amount to be repayed by borrowers, base = Total parts of the debt held by borrowers
  
    const amount = event.params.amount
    const part = event.params.part
  
    const pair = getUnderworldPair(event.address, event.block)
  
    const totalBorrow = getRebase(event.address.toHex().concat('-').concat('borrow'))
    totalBorrow.base = totalBorrow.base.minus(part)
    totalBorrow.elastic = totalBorrow.elastic.minus(amount)
    totalBorrow.save()
  
    const totalAsset = getRebase(event.address.toHex().concat('-').concat('asset'))
    const share = toBase(getRebase(pair.asset), amount, true)
    totalAsset.elastic = totalAsset.elastic.plus(share)
    totalAsset.save()
  
    // const poolPercentage = part.div(pair.totalBorrowBase).times(BigInt.fromI32(100))
  }
  
  export function handleLogFeeTo(event: LogFeeTo): void {
    log.info('[CoffinBox:UnderworldPair] Log Fee To {}', [event.params.newFeeTo.toHex()])
    const pair = getUnderworldPair(event.address, event.block)
    pair.feeTo = event.params.newFeeTo
    pair.block = event.block.number
    pair.timestamp = event.block.timestamp
    pair.save()
  }
  
  export function handleLogWithdrawFees(event: LogWithdrawFees): void {
    log.info('[CoffinBox:UnderworldPair] Log Withdraw Fees {} {}', [
      event.params.feeTo.toHex(),
      event.params.feesEarnedFraction.toString(),
    ])
  
    const pair = getUnderworldPair(event.address, event.block)
    pair.totalFeesEarnedFraction = pair.totalFeesEarnedFraction.plus(event.params.feesEarnedFraction)
    pair.save()
  
    const underworldPairAccrueInfo = getUnderworldPairAccrueInfo(event.address.toHex())
    underworldPairAccrueInfo.feesEarnedFraction = BigInt.fromI32(0)
    underworldPairAccrueInfo.save()
  
    updateUnderworldPairSnapshots(event.block.timestamp, pair)
  }
  
  export function handleApproval(event: Approval): void {
    log.info('[CoffinBox:UnderworldPair] Approval {} {} {}', [
      event.params._owner.toHex(),
      event.params._spender.toHex(),
      event.params._value.toString(),
    ])
  }
  
  export function handleTransfer(event: Transfer): void {
    log.info('[CoffinBox:UnderworldPair] Log Transfer {} {} {}', [
      event.params._from.toHex(),
      event.params._to.toHex(),
      event.params._value.toString(),
    ])
  }