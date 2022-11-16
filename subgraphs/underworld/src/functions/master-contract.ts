import { Address } from '@graphprotocol/graph-ts'
import { MasterContract } from '../../generated/schema'
import { getOrCreateCoffinBox } from './coffinbox'

export function getOrCreateMasterContract(id: Address): MasterContract {
  const coffinBox = getOrCreateCoffinBox()

  let masterContract = MasterContract.load(id.toHex())

  if (masterContract === null) {
    masterContract = new MasterContract(id.toHex())
    masterContract.coffinBox = coffinBox.id
    masterContract.approved = false
    masterContract.save()
  }

  return masterContract as MasterContract
}