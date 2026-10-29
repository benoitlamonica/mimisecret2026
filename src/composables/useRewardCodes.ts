import { useLocalStorage } from '@/composables/useLocalStorage'
import { usePoints } from '@/composables/usePoints'
import { rewardCodes, type RewardCode } from '@/config/codes'

const REDEEMED_CODES_STORAGE_KEY = 'mimi-redeemed-codes'

export function useRewardCodes() {
  const { value: redeemedCodes } = useLocalStorage<string[]>(REDEEMED_CODES_STORAGE_KEY, [])
  const { addPoints } = usePoints()

  function redeemCode(input: string): RewardCode {
    const normalizedCode = input.trim().toLocaleUpperCase()
    if (!normalizedCode) throw new Error('Saisis un code avant de valider.')

    const reward = rewardCodes.find(({ code }) => code.toLocaleUpperCase() === normalizedCode)
    if (!reward) throw new Error('Ce code est invalide.')
    if (redeemedCodes.value.includes(reward.code)) {
      throw new Error('Ce code a déjà été utilisé.')
    }

    addPoints(reward.points)
    redeemedCodes.value = [...redeemedCodes.value, reward.code]
    return reward
  }

  return {
    redeemCode,
  }
}
