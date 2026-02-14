// Pricing Calculation Utility for Muhammadiyah Games 2026
// Implements official pricing rules

import { PRICING, SportSlug } from './constants';

export interface PricingBreakdown {
  participantCount: number;
  officialCount: number;
  participantFee: number;
  officialFee: number;
  total: number;
  isVolleyball: boolean;
}

/**
 * Calculate registration cost based on sport and participant counts
 * 
 * Rules:
 * - General sports: Rp 100.000 per participant + Rp 50.000 per official
 * - Volleyball: Rp 1.200.000 per team + Rp 50.000 per official
 */
export function calculateRegistrationCost(
  sport: SportSlug,
  participantCount: number,
  officialCount: number
): PricingBreakdown {
  const isVolleyball = sport === 'voli_indoor';

  let participantFee: number;
  
  if (isVolleyball) {
    // Volleyball: flat team fee
    participantFee = PRICING.fee_voli_team;
  } else {
    // Other sports: per participant
    participantFee = participantCount * PRICING.fee_participant;
  }

  const officialFee = officialCount * PRICING.fee_official;
  const total = participantFee + officialFee;

  return {
    participantCount,
    officialCount,
    participantFee,
    officialFee,
    total,
    isVolleyball
  };
}

/**
 * Format currency in Indonesian Rupiah
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
}

/**
 * Get pricing breakdown as human-readable strings
 */
export function getPricingBreakdownText(breakdown: PricingBreakdown): {
  participantLabel: string;
  participantValue: string;
  officialLabel: string;
  officialValue: string;
  totalLabel: string;
  totalValue: string;
} {
  return {
    participantLabel: breakdown.isVolleyball 
      ? 'Biaya Tim (1 tim)'
      : `Biaya Peserta (${breakdown.participantCount} orang)`,
    participantValue: formatCurrency(breakdown.participantFee),
    officialLabel: `Biaya Official (${breakdown.officialCount} orang)`,
    officialValue: formatCurrency(breakdown.officialFee),
    totalLabel: 'Total Pembayaran',
    totalValue: formatCurrency(breakdown.total)
  };
}
