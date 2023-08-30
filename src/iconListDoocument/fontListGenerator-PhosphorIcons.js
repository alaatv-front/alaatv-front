// run this file with node to create svg-icons.json

const fs = require('fs')
const filePath = '../assets/icons/PhosphorIcons/style.css'
// const list = fs.readdirSync(filename)
//   .map((child) => {
//     return child.replace('.svg', '')
//   return dirTree(filename + '/' + child)
// })
const rawData = fs.readFileSync(filePath, 'utf8')
const regex = /\.ph-.*:before/g
const list = rawData.match(regex).map(item => item.replace('.ph-', '').replace(':before', ''))

fs.writeFile('./font-icons-PhosphorIcons.json', JSON.stringify(list), (err) => {
  if (err) throw err
  console.info('Data written to file')
})

fs.writeFile('./font-icons-PhosphorIcons.js', 'export default ' + JSON.stringify(list), (err) => {
  if (err) throw err
  console.info('Data written to file')
})
