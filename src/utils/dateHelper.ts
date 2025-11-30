export const formatTime = (isoString: string): string => {
  const date = new Date(isoString);
  // Format: 14:00 - 20 Nov
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    day: 'numeric',
    month: 'short',
  }).format(date);
};