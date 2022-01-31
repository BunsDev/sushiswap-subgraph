import { Address, ethereum } from '@graphprotocol/graph-ts'
import { BIG_INT_ZERO } from 'const'
import { UserUnderworldPair } from '../../generated/schema'
import { UnderworldPair as UnderworldPairContract } from '../../generated/CoffinBox/UnderworldPair'


export function createUserUnderworldPair(user: Address, pair: Address, block: ethereum.Block): UserUnderworldPair {
  const id = getUserUnderworldPairId(user, pair)

  const userPair = new UserUnderworldPair(id)

  userPair.user = user.toHex()
  userPair.pair = pair.toHex()
  userPair.assetFraction = BIG_INT_ZERO
  userPair.collateralShare = BIG_INT_ZERO
  userPair.borrowPart = BIG_INT_ZERO
  userPair.block = block.number
  userPair.timestamp = block.timestamp
  userPair.save()

  return userPair as UserUnderworldPair
}

export function getUserUnderworldPair(user: Address, pair: Address, block: ethereum.Block): UserUnderworldPair {
  let userPair = UserUnderworldPair.load(getUserUnderworldPairId(user, pair))

  if (userPair === null) {
    userPair = createUserUnderworldPair(user, pair, block)
  }

  const underworldPairContract = UnderworldPairContract.bind(pair)
  userPair.block = block.number
  userPair.timestamp = block.timestamp
  userPair.save()

  return userPair as UserUnderworldPair
}

function getUserUnderworldPairId(user: Address, pair: Address): string {
  return user.toHex().concat('-').concat(pair.toHex())
}
