/**
 * Fetch data from Rick and Morty API
 * @param url - API URL
 * @returns data - Return data from Rick and Morty API
 */
export const fetchData = async <T>(url: string): Promise<T>  => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}