import { Address, BigInt, ethereum } from '@graphprotocol/graph-ts'

import { User } from '../../generated/schema'
import { getCoffinBox } from './coffinbox'

export function getOrCreateUser(id: Address, event: ethereum.Event): User {
  let user = User.load(id.toHex())

  if (user === null) {
    const coffinBox = getCoffinBox()
    user = new User(id.toHex())
    user.coffinBox = coffinBox.id
    user.block = event.block.number
    user.timestamp = event.block.timestamp
    user.save()
  }

  return user as User
}