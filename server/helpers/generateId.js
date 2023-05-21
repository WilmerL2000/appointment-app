/**
 * The function generates a unique ID by combining the current timestamp with a random string.
 * @returns A string that concatenates the current timestamp (in milliseconds since January 1, 1970)
 * with a random string of characters generated using the base-32 encoding.
 */
const generateId = () => {
  return Date.now().toString() + Math.random().toString(32).substring();
};

export default generateId;
