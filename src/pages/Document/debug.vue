<template>
  <div class="row">
    <div class="col-12">
      <div class="row items-center justify-center">
        <div class="col-6">
          {{ gg }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'debug',
  data () {
    return {
      gg: null,
      sampleArrayOfText: [
        'aaaa1/bbbb1/ccc',
        'aaaa1/bbbb2',
        'aaaa2/bbbb1',
        'aaaa2/bbbb2'
      ],
      sampleArrayOfText1: [
        'aaaa1/bbbb1',
        'aaaa1/bbbb2',
        'aaaa2/bbbb1',
        'aaaa2/bbbb2'
      ],
      sampleArrayOfText1e: [
        {
          title: 'aaaa1',
          children: [
            'bbbb1',
            'bbbb2'
          ]
        },
        {
          title: 'aaaa2',
          children: [
            'bbbb1',
            'bbbb2'
          ]
        }
      ],
      sampleArrayOfText2: [
        'aaaa1/bbbb1/ccc1',
        'aaaa1/bbbb1/ccc2',
        'aaaa1/bbbb1/ccc3',
        'aaaa1/bbbb2/hhh1',
        'aaaa1/bbbb2/hhh2',
        'aaaa1/bbbb2/hhh3/kkk1',
        'aaaa1/bbbb2/hhh3/kkk2',
        'aaaa1/bbbb2/hhh3/kkk3',
        'aaaa2/bbbb1',
        'aaaa2/bbbb2'
      ],
      sampleArrayOfText2e: [
        {
          title: 'aaaa1',
          children: [
            {
              title: 'bbbb1',
              children: [
                'ccc1',
                'ccc2',
                'ccc3'
              ]
            },
            {
              title: 'bbbb2',
              children: [
                'hhh1',
                'hhh2',
                {
                  title: 'hhh3',
                  children: [
                    'kkk1',
                    'kkk2',
                    'kkk3'
                  ]
                }
              ]
            }
          ]
        },
        {
          title: 'aaaa2',
          children: [
            'bbbb1',
            'bbbb2'
          ]
        }
      ],
      sampleArrayOfText3: [
        // 'aaaa/bbbb/ccc',
        'aaaa1/bbbb1/ccc1',
        'aaaa1/bbbb1/ccc2',
        'aaaa1/bbbb1/ccc3',
        'aaaa1/bbbb2/hhh1',
        'aaaa1/bbbb2/hhh2',
        'aaaa1/bbbb2/hhh3/kkk1',
        'aaaa1/bbbb2/hhh3/kkk2',
        'aaaa1/bbbb2/hhh3/kkk3',
        'aaaa1/bbbb2/lll/mmmm/gggg1',
        'aaaa1/bbbb2/lll/mmmm/gggg2'
      ],
      sampleArrayOfText3e: [
        'aaaa/bbbb/ccc',
        {
          title: 'aaaa1',
          children: [
            {
              title: 'bbbb1',
              children: [
                'ccc1',
                'ccc2',
                'ccc3'
              ]
            },
            {
              title: 'bbbb2',
              children: [
                'hhh1',
                'hhh2',
                {
                  title: 'hhh3',
                  children: [
                    'kkk1',
                    'kkk2',
                    'kkk3'
                  ]
                }
              ]
            }
          ]
        },
        {
          title: 'aaaa2',
          children: [
            'bbbb1',
            'bbbb2'
          ]
        }
      ]
    }
  },
  mounted () {
    const delimiter = '/'
    // const targetIndex = 9
    // const targetArray = this.sampleArrayOfText3
    // const delimiterIgnoreCount = this.getDelimiterIgnoreCount(targetArray, targetIndex, delimiter)
    // this.gg = this.getGroupName(targetArray[targetIndex], delimiter, delimiterIgnoreCount)
    console.log(this.parseArrayOfText(this.sampleArrayOfText3, delimiter))
  },
  methods: {
    getGroupName (text, delimiter, delimiterIgnoreCount) {
      return text.toString().split(delimiter).slice(0, delimiterIgnoreCount + 1).join(delimiter)
    },
    getDelimiterIgnoreCount (arrayOfText, index, delimiter) {
      if (typeof arrayOfText[index] !== 'string') {
        return 0
      }
      const delimiterCount = arrayOfText[index].split(delimiter).length - 1
      let delimiterIgnoreCount = 0
      for (let i = delimiterCount; i > 0; i--) {
        if (arrayOfText.findIndex((item, itemIndex) => {
          const indexCondition = itemIndex !== index
          const groupName = this.getGroupName(arrayOfText[index], delimiter, i)
          const groupNameCondition = item.indexOf(groupName) === 0

          return indexCondition && groupNameCondition
        }) !== -1) {
          return i
        } else {
          delimiterIgnoreCount = i + 1
        }
      }

      return delimiterIgnoreCount
    },
    parseArrayOfText (arrayOfText, delimiter) {
      const clonedArrayOfText = [...arrayOfText]
      const result = []

      const getNodeWithChildren = (arrayOfText, index) => {
        const nodeResult = []
        const delimiterIgnoreCount = this.getDelimiterIgnoreCount(arrayOfText, index, delimiter)
        const groupName = this.getGroupName(arrayOfText[index], delimiter, delimiterIgnoreCount)
        const childCount = arrayOfText.filter(text => text.indexOf(groupName) === 0).length
        if (childCount === 1) {
          // arrayOfText.splice(index, 1)
          return {
            title: groupName,
            children: []
          }
        }

        const children = arrayOfText.reduce((accumulator, currentValue, currentIndex, array) => {
          if (currentValue.indexOf(groupName) === 0) {
            accumulator.push(currentValue.replace(groupName + delimiter, ''))
          }

          return accumulator
        }, [])

        const node = {
          title: groupName,
          children
        }

        node.children.forEach((text, textIndex) => {
          const localNodeResult = getNodeWithChildren(node.children, textIndex)
          if (localNodeResult) {
            nodeResult.push(localNodeResult)
          }
        })

        // arrayOfText.splice(index, 1)
        node.children = nodeResult

        return node
      }

      clonedArrayOfText.forEach((text, textIndex) => {
        // const parts = text.split('/')
        const nodeResult = getNodeWithChildren(clonedArrayOfText, textIndex)
        if (nodeResult) {
          result.push(nodeResult)
        }
      })

      return result
    }
  }
}

</script>
