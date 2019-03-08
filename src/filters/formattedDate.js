const formattedDate = (value) => {
    if (value === null) {
        return null;
    }
    if (value instanceof Date) {
        return value.toLocaleDateString();
    }

    return value.toDate().toLocaleDateString();
};

export default formattedDate;