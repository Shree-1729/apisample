import * as XLSX from 'xlsx';
import axios from 'axios';

// Ensure TypeScript understands Promises (assuming ES5 target)
declare const Promise: { new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason: any) => void) => void): Promise<T>; };

async function fetchData(apiUrl: string): Promise<any[]> {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

function generateExcel(data: any[], filename: string) {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  XLSX.writeFile(wb, filename);
  console.log('Excel file created successfully:', filename);
}

async function downloadExcel(apiUrl: string, filename: string) {
  try {
    const data = await fetchData(apiUrl);
    const dataAsArray = [data]; // Wrap in an array if needed
generateExcel(dataAsArray, filename);
  } catch (error) {
    console.error('Error generating Excel file:', error);
  }
}

// Example usage: Replace 'https://your-api.com/data' with your actual API URL
const apiUrl =  'https://jsonplaceholder.typicode.com/todos/1';
const filename = 'monitor.xlsx';

downloadExcel(apiUrl, filename);
