const { generateWidgetList } = require('../src/widgetListGetter/index.js')
const fs = require('fs')
const path = require('path')
const widgetJSon = require('../src/components/Widgets/widget.json')

const sourceDir = path.resolve(__dirname, './LocalDocs')
const destDir = path.resolve(__dirname, './components')

const widgetList = []
const widgetDocs = []
const layoutWidgets = []
const productWidgets = []
const ticketWidgets = []
const ttspWidgets = []
const localDocumentWidgets = []

/* This code block is performing the following tasks: */
fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error('Error reading source directory:', err)
    return
  }

  if (!fs.existsSync(destDir)) {
    fs.mkdir(destDir, { recursive: true }, (err) => {
      if (err) {
        console.error('Error creating destination directory:', err)
      }
    })
  }

  if (files.length > 0) {
    files.forEach(file => {
      const sourceFile = path.join(sourceDir, file)
      const destFile = path.join(destDir, file)

      fs.copyFile(sourceFile, destFile, (err) => {
        if (err) {
          console.error(`Error copying ${sourceFile}:`, err)
        } else {
          console.log(`Copied ${sourceFile} to ${destFile}`)
        }
      })
    })
  } else {
    console.log('there is no Local docs')
  }

  generateWidgetList('./docs/components')
  fs.readFile('docs/components/widget.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }

    getWidgetList(widgetJSon.children)

    const links = JSON.parse(data).children
    const srcPath = path.resolve('docs/') + '/'
    const linkList = links.map(link => {
      link.path = link.path.replace(srcPath, '')
      return getLink(link)
    }).join(',')

    const jsonData = `${[`{"title":"AlaaTV","children":[${localDocumentWidgets}]},{"title":"widgets","children":[${widgetDocs}]},{"title":"layouts","children":[${layoutWidgets}]},{"title":"TripleTitleSet","children":[${ttspWidgets}]},{"title":"Product","children":[${productWidgets}]},{"title":"Ticket","children":[${ticketWidgets}]},{"title":"otherComponent","children":[${linkList}]}`]}`

    // eslint-disable-next-line semi, no-useless-escape
    const regex = /\,(?!\s*?[\{\[\"\'\w])/g
    const components = jsonData.replace(regex, '')

    fs.writeFile('./docs/components.json', `{"components":[${components}]}`, (err) => {
      if (err) throw err
      console.info('Data written to file')
    })
  })
})

/**
 * This JavaScript function categorizes links based on their names and adds them to different arrays.
 * @param link - The `getLink` function takes a `link` object as a parameter. The function checks the
 * `name` property of the `link` object and categorizes it into different arrays based on certain
 * conditions. If the `name` property of the `link` object meets specific criteria, the function
 * @returns If none of the conditions in the function are met, the function will return a JSON string
 * with the title and link properties based on the input link object.
 */
function getLink (link) {
  if (link.name.includes('LocalDocument')) {
    localDocumentWidgets.push(`{"title":"${link.name.replace('LocalDocument', '')}","link":"/${link.path}"}`)
    return
  }
  if (widgetList.includes(link.name)) {
    widgetDocs.push(`{"title":"${link.name}","link":"/${link.path}"}`)
    return
  }
  if (link.name.includes('Layout')) {
    layoutWidgets.push(`{"title":"${link.name}","link":"/${link.path}"}`)
    return
  }
  if (link.name.includes('TripleTitleSet')) {
    ttspWidgets.push(`{"title":"${link.name}","link":"/${link.path}"}`)
    return
  }
  if (link.name.includes('Product')) {
    productWidgets.push(`{"title":"${link.name}","link":"/${link.path}"}`)
    return
  }
  if (link.name.includes('Ticket')) {
    ticketWidgets.push(`{"title":"${link.name}","link":"/${link.path}"}`)
    return
  }
  return `{"title":"${link.name}","link":"/${link.path}"}`
}

/**
 * The function `getWidgetList` recursively extracts the names of widgets from an array of objects
 * containing nested children.
 * @param objArray - The `objArray` parameter in the `getWidgetList` function is an array of objects.
 * Each object may have a `name` property and a `children` property. If an object has a `children`
 * property, it means that it has child objects that also need to be processed.
 */
function getWidgetList (objArray) {
  for (let index = 0; index < objArray.length; index++) {
    const element = objArray[index]
    // eslint-disable-next-line no-prototype-builtins
    if (element.hasOwnProperty('children')) {
      getWidgetList(element)
    }
    widgetList.push(element.name)
  }
}
