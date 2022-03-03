import {
  Deposit,
  Withdraw,
  PoolAdded,
  PoolSet,
} from '../../generated/MasterChefV2/MasterChefV2'

import { Address, BigDecimal, BigInt, dataSource, ethereum, log } from '@graphprotocol/graph-ts'
import {
  BIG_DECIMAL_1E12,
  BIG_DECIMAL_1E18,
  BIG_DECIMAL_ZERO,
  BIG_INT_ONE,
  BIG_INT_ONE_DAY_SECONDS,
  BIG_INT_ZERO,
  MASTER_CHEF_V2_ADDRESS,
  ACC_SOUL_PRECISION
} from 'const'
import { MasterChef, Pool, User } from '../../generated/schema'

import {
  getMasterChef,
  getPool,
  getUser,
} from '../entities'

import { ERC20 as ERC20Contract } from '../../generated/MasterChefV2/ERC20'

export function logPoolAddition(event: PoolAdded): void {
  log.info('[MasterChefV2] Log Pool Addition {} {} {} {}', [
    event.params.pid.toString(),
    event.params.allocPoint.toString(),
    event.params.lpToken.toHex()
  ])

  const masterChef = getMasterChef(event.block)
  const pool = getPool(event.params.pid, event.block)

  pool.pair = event.params.lpToken
  pool.allocPoint = event.params.allocPoint
  pool.save()

  masterChef.totalAllocPoint = masterChef.totalAllocPoint.plus(pool.allocPoint)
  masterChef.poolCount = masterChef.poolCount.plus(BIG_INT_ONE)
  masterChef.save()
}

export function logSetPool(event: PoolSet): void {
  log.info('[MasterChefV2] Log Set Pool {} {} {} {}', [
    event.params.pid.toString(),
    event.params.allocPoint.toString()
  ])

  const masterChef = getMasterChef(event.block)
  const pool = getPool(event.params.pid, event.block)

  masterChef.totalAllocPoint = masterChef.totalAllocPoint.plus(event.params.allocPoint.minus(pool.allocPoint))
  masterChef.save()

  pool.allocPoint = event.params.allocPoint
  pool.save()
}

export function logUpdatePool(event: PoolSet): void {
  log.info('[MasterChefV2] Log Update Pool {} {} {} {}', [
    event.params.pid.toString(),
    // event.params.lastRewardTime.toString(),
    // event.params.lpSupply.toString(),
    // event.params.accSoulPerShare.toString()
  ])

  const masterChef = getMasterChef(event.block)
  const pool = getPool(event.params.pid, event.block)
  // pool.accSoulPerShare = event.params.accSoulPerShare
  // pool.lastRewardTime = event.params.lastRewardTime
  pool.save()
}

export function deposit(event: Deposit): void {
  log.info('[MasterChefV2] Log Deposit {} {} {} {}', [
    event.params.user.toHex(),
    event.params.pid.toString(),
    event.params.amount.toString()
  ])

  const masterChef = getMasterChef(event.block)
  const pool = getPool(event.params.pid, event.block)
  const user = getUser(event.address, event.params.pid, event.block)

  pool.slpBalance = pool.slpBalance.plus(event.params.amount)
  pool.save()

  user.amount = user.amount.plus(event.params.amount)
  user.rewardDebt = user.rewardDebt.plus(event.params.amount.times(pool.accSoulPerShare).div(ACC_SOUL_PRECISION))
  user.save()
}

export function withdraw(event: Withdraw): void {
  log.info('[MasterChefV2] Log Withdraw {} {} {} {}', [
    event.params.user.toHex(),
    event.params.pid.toString(),
    event.params.amount.toString()
  ])

  const masterChef = getMasterChef(event.block)
  const pool = getPool(event.params.pid, event.block)
  const user = getUser(event.params.user, event.params.pid, event.block)

  pool.slpBalance = pool.slpBalance.minus(event.params.amount)
  pool.save()

  user.amount = user.amount.minus(event.params.amount)
  user.rewardDebt = user.rewardDebt.minus(event.params.amount.times(pool.accSoulPerShare).div(ACC_SOUL_PRECISION))
  user.save()
}

export function harvest(event: Deposit): void {
  log.info('[MasterChefV2] Log Withdraw {} {} {}', [
    event.params.user.toHex(),
    event.params.pid.toString(),
    event.params.amount.toString()
  ])

  const masterChef = getMasterChef(event.block)
  const pool = getPool(event.params.pid, event.block)
  const user = getUser(event.params.user, event.params.pid, event.block)

  let accumulatedSoul = user.amount.times(pool.accSoulPerShare).div(ACC_SOUL_PRECISION)

  user.rewardDebt = accumulatedSoul
  user.soulHarvested = user.soulHarvested.plus(event.params.amount)
  user.save()
}
