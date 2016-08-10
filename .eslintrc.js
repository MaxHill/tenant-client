module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'google',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  env: {
        "browser": true,
        "node": true
  },
  // add your custom rules here
  'rules': {
    "indent": ["error", 4],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
