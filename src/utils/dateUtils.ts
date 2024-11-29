import { format, formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date: number | Date): string => {
  return format(date, 'dd/MM/yyyy HH:mm', { locale: es });
};

export const formatRelativeTime = (date: number | Date): string => {
  return formatDistanceToNow(date, { addSuffix: true, locale: es });
};

export const isOverdue = (date: number | Date): boolean => {
  return new Date(date) < new Date();
};