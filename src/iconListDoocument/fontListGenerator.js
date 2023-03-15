// run this file with node to create svg-icons.json

const fs = require('fs')
const filePath = '../assets/icons/IconSaxNew/style.css'
// const list = fs.readdirSync(filename)
//   .map((child) => {
//     return child.replace('.svg', '')
//   return dirTree(filename + '/' + child)
// })
const rawData = fs.readFileSync(filePath, 'utf8')
const regex = /\.isax-[a-zA-Z0-9]*:before/g
const list = rawData.match(regex).map(item => item.replace('.isax-', '').replace(':before', ''))

fs.writeFile('./font-icons.json', JSON.stringify(list), (err) => {
  if (err) throw err
  console.info('Data written to file')
})

fs.writeFile('./font-icons.js', 'export default ' + JSON.stringify(list), (err) => {
  if (err) throw err
  console.info('Data written to file')
})
