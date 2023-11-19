import { Product } from './Product.js'
import { Model, Collection } from 'js-abstract-model'
import { OrderProduct, OrderProductList } from './OrderProduct.js'

class CartItem extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'grand',
        relatedModel: Product
      },
      {
        key: 'order_product',
        relatedModel: OrderProductList
      }
    ])
  }

  isSelectableProduct () {
    return !!this.grand
  }

  getOrderId () {
    if (this.order_product.list.length === 0) {
      return null
    }
    return this.order_product.list[0].order_id
  }

  hasProduct (productId) {
    const isGrand = this.isGrand(productId)
    const findInOrderProduct = !!this.isInOrderProducts(productId)

    return isGrand || findInOrderProduct
  }

  hasGrand () {
    return this.grand.id !== null
  }

  isGrand (productId) {
    return this.grand.id === productId
  }

  isInOrderProducts (productId) {
    return !!this.order_product.hasProduct(productId)
  }

  removeFromOrderProducts (productId) {
    this.order_product.removeProduct(productId)
  }

  addOrderProducts (products) {
    products.forEach(product => {
      if (!this.hasProduct(product.id)) {
        this.order_product.add([new OrderProduct({ product })])
      }
    })
  }
}

class CartItemList extends Collection {
  model () {
    return CartItem
  }

  getCartItemByGrand (grandId) {
    return this.list.find(cartItem => cartItem.grand.id === grandId)
  }

  hasProduct (productId) {
    return !!this.list.find(cartItem => cartItem.hasProduct(productId))
  }

  addProductsByGrand (grandId, products) {
    const grandCartIndex = this.list.findIndex(cartItem => cartItem.isGrand(grandId))
    const addProductsToOrderProduct = function (orderProducts, products) {
      products.forEach(productId => {
        orderProducts.addProduct(productId)
      })
    }

    if (grandCartIndex === -1) {
      const orderProducts = new OrderProductList()
      addProductsToOrderProduct(orderProducts, products)
      this.add(new CartItem({
        grand: new Product({ id: grandId }),
        order_product: orderProducts
      }))
    } else {
      addProductsToOrderProduct(this.list[grandCartIndex].order_product, products)
    }
  }

  addConfigurableProduct (productId, attributes) {
    const cartIndex = this.list.findIndex(cartItem => !!cartItem.isInOrderProducts(productId))
    const orderProducts = new OrderProductList([{
      id: productId,
      order_id: productId,
      attributevalues: attributes,
      product: new Product({ id: productId })
    }])

    if (cartIndex === -1) {
      this.add(new CartItem({ order_product: orderProducts }))
    } else {
      this.list[cartIndex].order_product = orderProducts
    }
  }

  removeProduct (productId) {
    this.list.forEach((cartItem, cartItemIndex) => {
      const hasGrand = cartItem.hasGrand()
      const isGrand = cartItem.isGrand(productId)
      const isInOrderProduct = !!cartItem.isInOrderProducts(productId)
      if (isGrand) {
        this.list.splice(cartItemIndex, 1)
      } else if (isInOrderProduct) {
        cartItem.removeFromOrderProducts(productId)
        if (hasGrand && cartItem.order_product.list.length === 0) {
          this.list.splice(cartItemIndex, 1)
        }
      }
    })
  }

  removeOrderProduct (orderProductId) {
    this.list.forEach(cartItem => cartItem.order_product.removeOrderProduct(orderProductId))
  }

  getOrderId () {
    if (this.list.length === 0) {
      return null
    }
    return this.list[0].getOrderId()
  }
}

export { CartItem, CartItemList }
