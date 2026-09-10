import axios from 'axios'
import { MEMPOOL_API } from './constants'

export interface AddressData {
  address: string
  balance: number
  txCount: number
  firstSeen: number | null
  lastSeen: number | null
  funded: number
  spent: number
}

export async function fetchAddressData(address: string): Promise<AddressData> {
  const { data } = await axios.get(`${MEMPOOL_API}/address/${address}`)

  const chain = data.chain_stats
  const mempool = data.mempool_stats

  return {
    address,
    balance: chain.funded_txo_sum - chain.spent_txo_sum,
    txCount: chain.tx_count + mempool.tx_count,
    firstSeen: null,
    lastSeen: null,
    funded: chain.funded_txo_sum,
    spent: chain.spent_txo_sum,
  }
}

export function isValidBitcoinAddress(address: string): boolean {
  const legacy = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/
  const bech32 = /^bc1[a-z0-9]{39,59}$/
  return legacy.test(address) || bech32.test(address)
}