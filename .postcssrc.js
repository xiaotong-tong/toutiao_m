module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue ({ file }) {
        return file.includes('vant') ? 37.5 : 75
      },
      propList: ['*'],
      exclude: 'github-markdown-css'
    }
  }
}
