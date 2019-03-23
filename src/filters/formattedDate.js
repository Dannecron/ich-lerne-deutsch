export const buildDate = (value) => {
    if (value === null) {
        return null;
    }
    if (value instanceof Date) {
        return value;
    }

    return value.toDate();
}

const formattedDate = (value) => {
    const date = buildDate(value);
    return date ? date.toLocaleDateString() : null;
};

export default formattedDate;