import { Address, ethereum } from '@graphprotocol/graph-ts'
import { MasterContract } from '../../generated/schema'
import { getCoffinBox } from './coffinbox'

export function getMasterContract(masterContract: Address, block: ethereum.Block): MasterContract {
  const coffinBox = getCoffinBox(block)

  const id = masterContract.toHex()
  let masterContract = MasterContract.load(id)

  if (masterContract === null) {
    masterContract = new MasterContract(id)
    masterContract.coffinBox = coffinBox.id
    masterContract.save()
  }

  return masterContract as MasterContract
}
