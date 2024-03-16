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
        'aaaa/bbbb/ccc',
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
    this.gg = this.getGroupName(this.sampleArrayOfText[0], '/', 1)
  },
  methods: {
    getGroupName (text, delimiter, delimiterIgnoreCount) {
      return text.toString().split(delimiter).slice(0, delimiterIgnoreCount + 1).join(delimiter)
    },
    getDelimiterIgnoreCount (arrayOfText, delimiter) {
      return arrayOfText.reduce((accumulator, currentValue, currentIndex, array) => {
        if (typeof currentValue !== 'string') {
          return false
        }
        const delimiterCount = currentValue.split(delimiter).length - 1
        for (let i = 0; i < delimiterCount; i++) {
          array.findIndex(item => item === this.getGroupName(currentValue, delimiter, i))
        }
        return accumulator
      }, 0)
    },
    parseArrayOfText (arrayOfText) {
      const result = []

      // Helper function to recursively build the nested structure
      function buildTree (node, path) {
        const [current, ...rest] = path

        // Find existing node with the same title or create a new one
        let childNode = node.children.find(child => child.title === current)
        if (!childNode) {
          childNode = { title: current, children: [] }
          node.children.push(childNode)
        }

        // If there are more levels in the path, continue building the tree
        if (rest.length > 0) {
          buildTree(childNode, rest)
        }
      }

      arrayOfText.forEach(text => {
        const parts = text.split('/')
        buildTree({ children: result }, parts)
      })

      return result
    }
  }
}

</script>
