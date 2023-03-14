// run this file with node to create svg-icons.json

const fs = require('fs')
const filename = '../../public/iconsax-svg/svg/linear'
const list = fs.readdirSync(filename)
  .map((child) => {
    return child.replace('.svg', '')
  // return dirTree(filename + '/' + child)
  })

fs.writeFile('./svg-icons.json', JSON.stringify(list), (err) => {
  if (err) throw err
  console.info('Data written to file')
})

fs.writeFile('./svg-icons.js', 'export default ' + JSON.stringify(list), (err) => {
  if (err) throw err
  console.info('Data written to file')
})
