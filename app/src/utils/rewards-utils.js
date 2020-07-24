import { toBN } from 'web3-utils'

const UNLOCKED = 0
const WITHDRAWN = 1
const ABSENT = 0

const findMinimunBalanceInVotesForEpoch = (_votes, _from, _to) => {
  let min = null

  _votes.forEach((_vote, id) => {
    // TODO understand why startBlock is startBlock
    if (_vote.startBlock >= _from && _vote.startBlock <= _to) {
      if (!min) min = _vote.balance

      if (min.cmp(_vote.balance) === -1) {
        min = _vote.balance
      }
    }
  })

  // should be safe since is already converted in offchain format
  return !min ? 0 : min.toNumber()
}

const getElegibilityOnEpoch = (_votes, _from, _to, _missingVotesThreshold) => {
  if (_votes.length === 0)
    return { isElegible: false, missing: 0, votesInEpoch: [] }

  let votedAt = 0
  const votesInEpoch = []
  _votes.forEach((_vote, id) => {
    if (_vote.startBlock >= _from && _vote.startBlock <= _to) {
      if (_vote.state !== ABSENT) {
        votedAt += 1
      }
      votesInEpoch.push({
        ..._vote,
        id: id + 1,
      })
    }
  })

  return {
    isElegible:
      votedAt >= _votes.length - _missingVotesThreshold ? true : false,
    missingVotes: _votes.length - votedAt,
    votesInEpoch,
  }
}

export {
  findMinimunBalanceInVotesForEpoch,
  getElegibilityOnEpoch,
  UNLOCKED,
  WITHDRAWN,
}
