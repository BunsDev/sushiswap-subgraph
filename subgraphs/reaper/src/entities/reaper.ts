import { Reaper } from '../../generated/schema'
import { ethereum , dataSource } from '@graphprotocol/graph-ts'
import { BIG_DECIMAL_ZERO, BIG_INT_ZERO } from 'const'


export function getReaper(block: ethereum.Block): Reaper {
  let reaper = Reaper.load(dataSource.address().toHex())

  if (reaper === null) {
    reaper = new Reaper(dataSource.address().toHex())
    reaper.soulServed = BIG_INT_ZERO
    reaper.totalServings = BIG_DECIMAL_ZERO
  }

  reaper.timestamp = block.timestamp
  reaper.block = block.number
  reaper.save()

  return reaper as Reaper
}
