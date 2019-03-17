export const emailRules = [
    value => !!value || 'Пожалуйста, введите email',
    value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Неправильный email',
];

export const passwordRules = [
    value => !!value || 'Пожалуйста введите пароль',
    value => (value && value.length >= 6) || 'Пароль слишком короткий - минимум 6 символов',
];

export const nameRules = [
    value => !!value || 'Пожалуйста введите ваше имя',
];
