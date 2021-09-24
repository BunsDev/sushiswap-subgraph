import { Address, BigInt, ethereum, log } from '@graphprotocol/graph-ts'
import {
  BIG_DECIMAL_1E12,
  BIG_DECIMAL_1E18,
  BIG_DECIMAL_ZERO,
  BIG_INT_ONE,
  BIG_INT_ZERO,
  SUMMONER_ADDRESS,
} from 'const'
import {
  Deposit,
  SoulSummoner as SoulSummonerContract,
  SoulSummoner__poolInfoResult,
  SetCall,
  Withdraw,
} from '../generated/SoulSummoner/SoulSummoner'
import { Pool, User } from '../generated/schema'
import { getSoulPrice } from 'pricing'
import { Pair as PairContract } from '../generated/SoulSummoner/Pair'

export function getUser(pid: BigInt, address: Address, block: ethereum.Block): User {
  const uid = address.toHex()
  const id = pid.toString().concat('-').concat(uid)

  let user = User.load(id)

  if (user === null) {
    user = new User(id)
    user.pool = pid.toString()
    user.address = address
    user.amount = BIG_INT_ZERO
    user.rewardDebt = BIG_INT_ZERO
    user.sushiHarvestedSinceLockup = BIG_DECIMAL_ZERO
    user.sushiHarvestedSinceLockupUSD = BIG_DECIMAL_ZERO
    user.save()
  }

  return user as User
}

export function getPool(id: BigInt): Pool {
  let pool = Pool.load(id.toString())

  if (pool === null) {
    const soulSummonerContract = SoulSummonerContract.bind(MASTER_CHEF_ADDRESS)

    // Create new pool.
    pool = new Pool(id.toString())
    const poolInfo = soulSummonerContract.poolInfo(id)
    pool.allocPoint = poolInfo.value1
    pool.accSoulPerShare = poolInfo.value3

    pool.save()
  }

  return pool as Pool
}

// Calls

function transfer(pid: BigInt, userAddr: Address, block: ethereum.Block): void {
  const soulSummonerContract = SoulSummonerContract.bind(SUMMONER_ADDRESS)
  const user = getUser(pid, userAddr, block)

  const poolInfo = soulSummonerContract.poolInfo(pid)
  const pool = getPool(pid)
  pool.accSoulPerShare = poolInfo.value3
  pool.save()

  const userInfo = soulSummonerContract.userInfo(pid, userAddr)
  user.amount = userInfo.value0
  user.rewardDebt = userInfo.value1
  user.save()
}

// Events
export function deposit(event: Deposit): void {
  transfer(event.params.pid, event.params.user, event.block)
}

export function withdraw(event: Withdraw): void {
  transfer(event.params.pid, event.params.user, event.block)
}
