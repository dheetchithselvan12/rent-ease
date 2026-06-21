export const formatDate = (date, locale = 'en-US') => {
  if (!date) return '';
  const d = new Date(date);
  
  // Return empty string if date object is invalid
  if (isNaN(d.getTime())) return ''; 

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
};