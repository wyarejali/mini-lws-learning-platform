export const shortText = (text, characters = 50) => {
    return text.length > characters
        ? text.slice(0, characters - 1) + ' ...'
        : text;
};
