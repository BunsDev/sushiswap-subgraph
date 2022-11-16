import { Address } from '@graphprotocol/graph-ts'
import { COFFINBOX_ADDRESS } from '../constants'
import { CoffinBox } from '../../generated/schema'

export function createCoffinBox(id: Address = COFFINBOX_ADDRESS): CoffinBox {
  const coffinBox = new CoffinBox(id.toHex())
  coffinBox.save()
  return coffinBox
}

export function getCoffinBox(id: Address = COFFINBOX_ADDRESS): CoffinBox {
  return CoffinBox.load(id.toHex()) as CoffinBox
}

export function getOrCreateCoffinBox(id: Address = COFFINBOX_ADDRESS): CoffinBox {
  let coffinBox = CoffinBox.load(id.toHex())

  if (coffinBox === null) {
    coffinBox = createCoffinBox(id)
  }

  return coffinBox
}