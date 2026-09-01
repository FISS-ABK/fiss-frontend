/**
 * Calculate the platform fee markup (2.5% + ₦99).
 */
export function calculatePlatformFee(baseAmount: number): number {
  if (!baseAmount || baseAmount <= 0) return 0;
  return Math.round(baseAmount * 0.025 + 99);
}

/**
 * Calculate total amount payable including platform fee markup.
 */
export function calculateTotalPayable(baseAmount: number): number {
  if (!baseAmount || baseAmount <= 0) return 0;
  return baseAmount + calculatePlatformFee(baseAmount);
}
