import { BigInt, log } from '@graphprotocol/graph-ts'
import { COFFINBOX_ADDRESS } from '../constants'
import { Rebase } from '../../generated/schema'

export function createRebase(token: string | null): Rebase {
  const rebase = new Rebase(token)
  rebase.token = token
  rebase.coffinBox = COFFINBOX_ADDRESS.toHex()
  rebase.base = BigInt.fromI32(0)
  rebase.elastic = BigInt.fromI32(0)
  rebase.save()
  return rebase as Rebase
}

export function getRebase(token: string): Rebase {
  return Rebase.load(token) as Rebase
}

export function getOrCreateRebase(token: string): Rebase {
  const rebase = Rebase.load(token)

  if (rebase === null) {
    return createRebase(token)
  }

  return rebase as Rebase
}

export function toBase(total: Rebase, elastic: BigInt, roundUp: boolean): BigInt {
  if (total.elastic.equals(BigInt.fromI32(0))) {
    return elastic
  }

  const base = elastic.times(total.base).div(total.elastic)

  if (roundUp && base.times(total.elastic).div(total.base).lt(elastic)) {
    return base.plus(BigInt.fromI32(1))
  }

  return base
}

export function toElastic(total: Rebase, base: BigInt, roundUp: boolean): BigInt {
  if (total.base.equals(BigInt.fromI32(0))) {
    return base
  }

  const elastic = base.times(total.elastic).div(total.base)

  if (roundUp && elastic.times(total.base).div(total.elastic).lt(base)) {
    return elastic.plus(BigInt.fromI32(1))
  }

  return elastic
}