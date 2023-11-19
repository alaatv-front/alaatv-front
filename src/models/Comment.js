import { Model, Collection } from 'js-abstract-model'

class Comment extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'commentable_id' },
      { key: 'commentable_type' },
      { key: 'comment' },
      {
        key: 'content',
        default: {
          id: null,
          title: null
        }
      },
      {
        key: 'set',
        default: {
          id: null,
          short_title: null
        }
      },
      //  new for order's api :
      { key: 'updated_at' },
      { key: 'created_at' }
    ])
  }
}

class CommentList extends Collection {
  model () {
    return Comment
  }
}
export { Comment, CommentList }
