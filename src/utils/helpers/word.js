export const getFullOriginalWord = (entity) => {
    const { origText } = entity;

    if (entity.origPrefix) {
        return `${entity.origPrefix} ${origText}`;
    }

    return origText;
};

export const WORD_TYPES = {
    WORD: 1,
    REDEWNNDUNG: 2,
};
