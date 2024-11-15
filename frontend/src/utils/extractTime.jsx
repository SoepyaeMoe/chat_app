export const extractTime = (dateString) => {
    const date = new Date(dateString);
    const hour = padZero(date.getHours());
    const minute = padZero(date.getMinutes());

    return `${hour}: ${minute}`;
}

const padZero = (number) => {
    return number.toString().padStart(2, "0");
}