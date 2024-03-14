export function getDateForDB(timestamp: number): string {
    const date = new Date(timestamp).toLocaleDateString();
    const dateForDB = date.slice(-4) + '-' + date.slice(3, 5) + '-' + date.slice(0, 2);
    return dateForDB;
}