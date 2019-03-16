module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    'airbnb'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': ['error', 4, { 'SwitchCase': 1 }],
    'max-len': ['error', { 'code': 120 }],
    'class-methods-use-this': 'off', 
    'object-curly-newline': ['error', { 'consistent': true }],
    'comma-dangle': ['error', {
      'functions': 'never',
      'arrays': 'always-multiline',
      'objects': 'always-multiline'
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
