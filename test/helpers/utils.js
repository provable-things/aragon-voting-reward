const { encodeCallScript } = require('@aragon/test-helpers/evmScript')

const newVote = (_voting, _to, _callData, _from) => {
  const action = { to: _to, calldata: _callData }
  const script = encodeCallScript([action])
  return _voting.newVoteExt(script, '', false, false, { from: _from })
}

// NOTE: _supports and _executesIfDecided hardcoded to true as they don't matter in this case
const vote = (_voting, _voteId, _from) =>
  _voting.vote(_voteId, true, true, {
    from: _from,
  })

const claim = (_votingReward, _beneficiary, _from) =>
  _votingReward.claimReward(_beneficiary, {
    from: _from,
  })

module.exports = {
  claim,
  newVote,
  vote,
}