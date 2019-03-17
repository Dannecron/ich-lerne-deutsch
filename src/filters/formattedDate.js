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
    const buildDate = buildDate(value);
    return buildDate ? buildDate.toLocaleDateString() : null;
};

export default formattedDate;