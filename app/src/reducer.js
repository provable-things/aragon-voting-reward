import { toBN } from 'web3-utils'
import { offChainFormat } from './utils/amount-utils'

const BLOCK_TIME = 15

const reducer = (_state) => {
  if (_state === null) {
    return {
      account: null,
      settings: null,
      voting: null,
      baseVault: null,
      rewardsVault: null,
      rewardsToken: null,
      epoch: null,
      percentageReward: null,
      rewards: [],
      votes: [],
    }
  }

  const { votes, epoch, rewards, rewardsToken } = _state

  return {
    ..._state,
    epoch: epoch
      ? {
          duration: parseInt(epoch.duration) / BLOCK_TIME,
          current: parseInt(epoch.current),
        }
      : null,
    votes: votes
      ? votes.map((_vote) => {
          return {
            ..._vote,
            executed: _vote.executed,
            open: _vote.open,
            script: _vote.script,
            snapshotBlock: parseInt(_vote.snapshotBlock),
            startDate: parseInt(_vote.startDate),
            minAcceptQuorum: parseInt(_vote.minAcceptQuorum, 10) / 18,
            nay: offChainFormat(toBN(_vote.nay), rewardsToken.decimals),
            yea: offChainFormat(toBN(_vote.yea), rewardsToken.decimals),
            votingPower: offChainFormat(
              toBN(_vote.votingPower),
              rewardsToken.decimals
            ),
            supportRequired: parseInt(_vote.supportRequired, 10) / 18,
          }
        })
      : [],
    rewards: rewards
      ? rewards.map((_reward) => {
          return {
            ..._reward,
            amount: parseInt(_reward.amount),
            // lockTime is expressed in blocks
            lockTime: parseInt(lockTime * BLOCK_TIME),
            expirationDate: _reward.lockDate + parseInt(lockTime * BLOCK_TIME),
          }
        })
      : [],
  }
}

export default reducer
