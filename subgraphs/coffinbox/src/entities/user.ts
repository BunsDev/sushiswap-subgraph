import { Address, ethereum } from '@graphprotocol/graph-ts'
import { User } from '../../generated/schema'
import { getCoffinBox } from './coffinbox'
import { BIG_INT_ONE } from 'const'

export function getUser(address: Address, block: ethereum.Block): User {
  const coffinBox = getCoffinBox(block)

  const uid = address.toHex()
  let user = User.load(uid)

  if (user === null) {
    user = new User(uid)
    user.coffinBox = coffinBox.id

    coffinBox.totalUsers = coffinBox.totalUsers.plus(BIG_INT_ONE)
    coffinBox.save()
  }

  user.block = block.number
  user.timestamp = block.timestamp
  user.save()

  return user as User
}
