import type { FilterStatus } from '@/types/filter-status';

export type Item = {
  id: string;
  name: string;
  status: FilterStatus;
};
