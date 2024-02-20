import { Content } from 'src/models/Content'
import { Set } from 'src/models/Set'

const state = {
  setList: [],
  setTopicList: [],
  selectedTopic: '',
  setListLoading: false,
  productLoading: false,
  setLoading: false,
  selectedProduct: {},
  selectedContent: new Content(),
  selectedSet: new Set()
}

export default state
