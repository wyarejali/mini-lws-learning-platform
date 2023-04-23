// Format date time to readable format
export const timeFormatter = (value) => {
    const date = new Date(value);

    const dateString = date
        .toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
        })
        .replace(/,/g, ''); // replace "," comma into empty string

    // Return this formate Jan 15 2021 9:17:01 PM
    return dateString;
};

export const formateDate = (value) => {
    const date = new Date(value);

    const dateString = date
        .toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
        .replace(/,/g, ''); // replace "," comma into empty string

    // Return this formate Jan 15 2021
    return dateString;
};
