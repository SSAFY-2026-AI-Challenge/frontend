import type { Payroll } from './types';

export const mockPayroll: Payroll = {
  yearMonth: '2026-08',
  jobName: '칠판 관리인',
  earnings: [
    {
      name: '기본급',
      amount: 7000,
    },
    {
      name: '식대',
      amount: 1000,
    },
    {
      name: '지적수당',
      amount: 1500,
    },
    {
      name: '연장근로수당',
      amount: 500,
    },
  ],
  deductions: [
    {
      name: '소득세',
      amount: 800,
    },
    {
      name: '국민연금',
      amount: 450,
    },
    {
      name: '고용보험',
      amount: 100,
    },
    {
      name: '건강보험',
      amount: 400,
    },
    {
      name: '지방소득세',
      amount: 250,
    },
  ],
  grossPay: 10000,
  totalDeductions: 2000,
};