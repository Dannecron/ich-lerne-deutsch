export * from '@/utils/helpers/article';
export * from '@/utils/helpers/formRules';
export * from '@/utils/helpers/word';

export * from '@/utils/eventBus';

export const declOfNum = (number, titles) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

