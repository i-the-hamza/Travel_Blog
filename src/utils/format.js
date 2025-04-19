/**
 * Format a date string into a more readable format
 * @param {string} dateString - The date string to format
 * @returns {string} The formatted date string
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  // Return formatted date: Jan 1, 2023
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Truncate a string to a specified length and add ellipsis
 * @param {string} str - The string to truncate
 * @param {number} length - The maximum length
 * @returns {string} The truncated string
 */
export function truncate(str, length = 100) {
  if (!str) return '';
  if (str.length <= length) return str;
  
  return str.slice(0, length) + '...';
}

/**
 * Create a URL-friendly slug from a string
 * @param {string} str - The string to convert to a slug
 * @returns {string} The slug
 */
export function createSlug(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-');
} 