import Price from 'src/models/Price.js'
import { Coupon } from 'src/models/Coupon.js'
import { Product } from 'src/models/Product.js'
import { Model, Collection } from 'js-abstract-model'
import { OrderProduct } from 'src/models/OrderProduct.js'
import { CartItem, CartItemList } from 'src/models/CartItem.js'

class Cart extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      {
        key: 'couponInfo',
        relatedModel: Coupon
      },
      {
        key: 'items',
        relatedModel: CartItemList
      },
      {
        key: 'price',
        relatedModel: Price
      },
      { key: 'pay_by_wallet' },
      { key: 'coupon' },
      { key: 'referralCode' },
      {
        key: 'order_has_donate',
        default: false
      },
      { key: 'count' },
      { key: 'redirect_to_gateway' }
    ])
  }

  getOrderId () {
    return this.items.getOrderId()
  }

  isExistInCart (productId) {
    return this.items.hasProduct(productId)
  }

  addToCart (data) {
    const isSelectableProduct = data.products && data.products.length > 0
    const isConfigurableProduct = data.attribute && data.attribute.length > 0
    const isSimpleProduct = !isSelectableProduct && !isConfigurableProduct
    const addSimpleProduct = (data) => {
      const product = new Product({ id: data.product_id })
      if (this.items.hasProduct(product.id)) {
        return
      }
      const getItemWithNullGrandIndex = () => this.items.list.findIndex(item => !item.grand.id)

      let itemWithNullGrandIndex = getItemWithNullGrandIndex()
      if (itemWithNullGrandIndex === -1) {
        this.items.add(new CartItem())
        itemWithNullGrandIndex = getItemWithNullGrandIndex()
      }
      this.items.list[itemWithNullGrandIndex].order_product.add(new OrderProduct({
        product,
        id: product.id,
        order_id: product.id
      }))
    }
    const addSelectableProduct = (data) => {
      const grandProduct = new Product({ id: data.product_id })
      const products = data.products
      this.items.addProductsByGrand(grandProduct.id, products)
    }
    const addConfigurableProduct = (data) => {
      this.items.addConfigurableProduct(data.product_id, data.attribute)
    }

    if (isSimpleProduct) {
      addSimpleProduct(data)
    } else if (isSelectableProduct) {
      addSelectableProduct(data)
    } else if (isConfigurableProduct) {
      addConfigurableProduct(data)
    }

    // if (isSelectableProduct) {
    //   const grand = data.product
    //   const cartItemThatHasGrand = this.items.getCartItemByGrand(grand.id)
    //   cartItemThatHasGrand.addOrderProducts(data.products.map(product => new Product({ id: product })))
    // } else {
    //   const product = new Product({ id: data.product_id })
    //   if (this.items.hasProduct(product.id)) {
    //     return
    //   }
    //   this.items.add(new CartItem({
    //     grand: product
    //   }))
    // }

    // this.changeCartItems()
  }

  removeProduct (productId) {
    this.items.removeProduct(productId)
  }

  removeItem (cartItemId) {
    this.items.list = this.items.list.filter(item => item.grand.id !== cartItemId)
    // this.changeCartItems()
  }

  removeAllItems () {
    this.items.list = []
    this.changeCartItems()
  }

  calculateTotalFinalPrice () {
    let finalPrice = 0
    this.items.list.forEach(item => {
      finalPrice += item.grand.price.final
    })
    this.price.final = finalPrice
  }

  calculateTotalBasePrice () {
    let basePrice = 0
    this.items.list.forEach(item => {
      basePrice += item.grand.price.base
    })
    this.price.base = basePrice
  }

  calculateTotalDiscount () {
    let totalDiscount = 0
    this.items.list.forEach(item => {
      totalDiscount += item.grand.price.discount
    })
    this.price.discount = totalDiscount
  }

  isEmpty () {
    return !this.items.list.length
  }

  changeCartItems () {
    this.calculateTotalFinalPrice()
    this.calculateTotalDiscount()
    this.calculateTotalBasePrice()
  }
}
class CartList extends Collection {
  model () {
    return Cart
  }
}
export { Cart, CartList }
