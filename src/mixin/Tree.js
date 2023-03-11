import { APIGateway } from 'src/api/APIGateway'

const mixinTree = {
  methods: {
    showTree (refKey, callback) {
      return new Promise((resolve, reject) => {
        callback
          .then(response => {
            const node = response
            let treeComponent = this.$refs[refKey]
            if (!treeComponent.createRoot) {
              treeComponent = this.$refs[refKey][0]
            }
            treeComponent.createRoot({
              title: node.title,
              id: node.id,
              order: node.order,
              parent: node.parent,
              children: node.children
            })
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    getRootNode (nodeType) {
      return APIGateway.forrest.getNodeByType({
        data: {
          nodeType
        }
      })
    },

    getNode (id) {
      return APIGateway.forrest.getNodeById({
        data: {
          id
        }
      })
    },

    getNodeById (id, done, fail, loadChildOfNode) {
      return new Promise((resolve, reject) => {
        this.getNode(id)
          .then(response => {
            const node = response
            resolve(loadChildOfNode(node, done))
          }).catch(() => {
            if (fail) {
              reject(fail())
            }
          })
      })
    },

    createNode (parentId, type, title, order, callback) {
      return new Promise((resolve, reject) => {
        APIGateway.forrest.createNode({
          data: { parent_id: parentId, title, order }
        }).then(response => {
          if (callback) {
            callback(response)
          }
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    },

    editNode (id, title, order) {
      return new Promise((resolve, reject) => {
        APIGateway.forrest.editNode(id, {
          data: { title, order }
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

    setTickedMode (refKey, key, state) {
      const ref = (this.$refs[refKey] && this.$refs[refKey][0] && this.$refs[refKey][0].$el) ? this.$refs[refKey][0]
        : (this.$refs[refKey] && this.$refs[refKey].$el) ? this.$refs[refKey]
            : null
      if (!ref) {
        return
      }
      ref.setNodesTicked(key, state)
    }
  }
}

export default mixinTree
