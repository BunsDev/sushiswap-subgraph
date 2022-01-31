import { CoffinBox } from '../../generated/schema'
import { dataSource, ethereum } from '@graphprotocol/graph-ts'
import { BIG_INT_ZERO } from 'const'

export function getCoffinBox(block: ethereum.Block): CoffinBox {
  let coffinBox = CoffinBox.load(dataSource.address().toHex())

  if (coffinBox === null) {
    coffinBox = new CoffinBox(dataSource.address().toHex())
    coffinBox.totalTokens = BIG_INT_ZERO
    coffinBox.totalUsers = BIG_INT_ZERO
    coffinBox.totalUnderworldPairs = BIG_INT_ZERO
  }

  coffinBox.block = block.number
  coffinBox.timestamp = block.timestamp
  coffinBox.save()

  return coffinBox as CoffinBox
}
