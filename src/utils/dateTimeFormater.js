export const dateTimeFormater = (isoDate) => {
    const date = new Date(isoDate);
    const localDate = date.toLocaleDateString(); 
    const localTime = date.toLocaleTimeString();
    return localDate+" "+localTime;
}