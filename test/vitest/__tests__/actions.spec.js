import { Notify } from 'quasar'
import { Cart } from 'src/models/Cart.js'
import { Product } from 'src/models/Product.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { CartItemList } from 'src/models/CartItem.js'
import { addToCart, reviewCart } from 'src/store/Cart/actions.js'
import { AEE } from 'src/assets/js/AEE/AnalyticsEnhancedEcommerce.js'
// eslint-disable-next-line
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Mock outside dependencies
vi.mock('src/api/APIGateway.js', () => ({
  APIGateway: {
    cart: {
      addToCart: vi.fn(() => Promise.resolve(true)),
      reviewCart: vi.fn(() => Promise.resolve(new Cart())),
      removeFromCartByProductId: vi.fn(() => Promise.resolve(true))
    }
  }
}))

vi.mock('src/assets/js/CookieCart.js', () => ({
  CookieCart: {
    deleteCartItemListFromCookie: vi.fn()
  }
}))

vi.mock('src/assets/js/AEE/AnalyticsEnhancedEcommerce.js', () => ({
  AEE: {
    productAddToCart: vi.fn(),
    checkout: vi.fn(),
    productRemoveFromCart: vi.fn()
  }
}))

vi.mock('quasar', () => ({
  Notify: { create: vi.fn() }
}))

describe('Actions', () => {
  let context

  beforeEach(() => {
    context = {
      getters: {
        loading: false,
        'Auth/isUserLogin': false,
        'Cart/cart': {},
        cart: {
          loading: false,
          items: new CartItemList(),
          addToCart: vi.fn()
        }
      },
      commit: vi.fn(),
      dispatch: vi.fn()
    }
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('addToCart', () => {
    it('adds a product to the cart for a guest user and shows notification (logout) -> simple', async () => {
      const mockCart = new Cart({
        id: 123,
        items: []
      })
      context.getters.cart = mockCart
      context.getters['Auth/isUserLogin'] = false
      const productToAdd = new Product({ id: 1 })
      const productData = { product: productToAdd, product_id: productToAdd.id }

      await addToCart(context, productData)

      // context.commit.mock.calls.forEach(call => {
      //   console.log(call[1].items.list[0].grand) // `call[1]` is the second argument of the call
      // })

      expect(context.commit).toHaveBeenNthCalledWith(1, 'updateCart', expect.objectContaining({
        loading: true
      }))
      // expect(context.getters.cart.addToCart).toHaveBeenNthCalledWith(1, expect.objectContaining({
      //   attribute: [],
      //   // product: {
      //   //   id: productToAdd.id
      //   // },
      //   product_id: productToAdd.id,
      //   products: []
      // }))

      expect(context.commit).toHaveBeenNthCalledWith(2, 'updateCart', expect.objectContaining({
        id: 123,
        items: expect.objectContaining({
          list: expect.arrayContaining([
            expect.objectContaining({
              grand: expect.objectContaining({
                id: null
              }),
              order_product: expect.objectContaining({
                list: expect.arrayContaining([
                  expect.objectContaining({
                    product: expect.objectContaining({
                      id: productToAdd.id
                    }),
                    id: productToAdd.id,
                    order_id: productToAdd.id
                  })
                ])
              })
            })
          ])
        })
      }))
      expect(Notify.create).toHaveBeenCalledTimes(1)

      expect(context.commit).toHaveBeenNthCalledWith(3, 'updateCart', expect.objectContaining({
        loading: false
      }))

      expect(AEE.productAddToCart).toHaveBeenNthCalledWith(1,
        'product.addToCart', // actionFieldList
        [new Product(productData.product).eec.getData()] // products
      )
    })
  })

  describe('reviewCart', () => {
    it('successfully reviews the cart, commits update, and calls AEE checkout (logout) -> simple', async () => {
      const mockCart = new Cart({
        id: 123,
        items: [
          {
            grand: new Product({
              id: 1234,
              title: 'test product'
            })
            // order_product: new OrderProductList([
            //   {
            //     product: new Product({
            //       id: 1234,
            //       title: 'test product'
            //     })
            //   }
            // ])
          }
        ]
      })
      context.getters.cart = mockCart
      context.getters['Auth/isUserLogin'] = false
      mockCart.addToCart = vi.fn()
      APIGateway.cart.reviewCart = vi.fn(() => Promise.resolve(mockCart))

      await reviewCart(context)

      // // AEE.checkout.mock.calls.forEach(call => {
      // //   console.log(call) // `call[1]` is the second argument of the call
      // // })
      // // expect(context.commit).toHaveBeenNthCalledWith(1, 'updateCart', expect.anything())
      //
      expect(context.commit).toHaveBeenNthCalledWith(1, 'updateCart', expect.objectContaining({
        loading: true
      }))
      expect(APIGateway.cart.reviewCart).toHaveBeenNthCalledWith(1, [
        {
          products: [],
          attribute: [],
          product_id: 1234
        }
      ])
      expect(context.commit).toHaveBeenNthCalledWith(2, 'updateCart', expect.objectContaining(mockCart))

      expect(AEE.checkout).toHaveBeenNthCalledWith(1,
        1, // step
        'reviewAndPayment', // option
        mockCart.items.list[0]?.order_product?.list.map(item => item.product.eec.getData()), // products
        // cache
        {
          TTl: 1000,
          key: 'reviewCart'
        })

      expect(context.commit).toHaveBeenNthCalledWith(3, 'updateCart', expect.objectContaining({
        loading: false
      }))
    })

    it('successfully reviews the cart, commits update, and calls AEE checkout (login) -> simple', async () => {
      const mockCart = new Cart({
        id: 123,
        items: [
          {
            grand: new Product({
              id: 1234,
              title: 'test product'
            })
            // order_product: new OrderProductList([
            //   {
            //     product: new Product({
            //       id: 1234,
            //       title: 'test product'
            //     })
            //   }
            // ])
          }
        ]
      })
      context.getters.cart = mockCart
      context.getters['Auth/isUserLogin'] = true
      mockCart.addToCart = vi.fn()
      APIGateway.cart.reviewCart = vi.fn(() => Promise.resolve(mockCart))

      await reviewCart(context)

      expect(context.commit).toHaveBeenNthCalledWith(1, 'updateCart', expect.objectContaining({
        loading: true
      }))
      expect(APIGateway.cart.reviewCart).toHaveBeenNthCalledWith(1, [])
      expect(context.commit).toHaveBeenNthCalledWith(2, 'updateCart', expect.objectContaining(mockCart))

      expect(AEE.checkout).toHaveBeenNthCalledWith(1,
        1, // step
        'reviewAndPayment', // option
        mockCart.items.list[0]?.order_product?.list.map(item => item.product.eec.getData()), // products
        // cache
        {
          TTl: 1000,
          key: 'reviewCart'
        })

      expect(context.commit).toHaveBeenNthCalledWith(3, 'updateCart', expect.objectContaining({
        loading: false
      }))
    })

    it('successfully reviews the cart, commits update, and calls AEE checkout (logout) -> selectable', async () => {
      const mockCart = new Cart({
        id: 123,
        items: [
          {
            grand: {
              id: 1234,
              title: 'test grand product'
            },
            order_product: [
              {
                product: {
                  id: 12345,
                  title: 'test child 1 product'
                }
              },
              {
                product: {
                  id: 12346,
                  title: 'test child 2 product'
                }
              }
            ]
          }
        ]
      })
      context.getters.cart = mockCart
      context.getters['Auth/isUserLogin'] = false
      mockCart.addToCart = vi.fn()
      APIGateway.cart.reviewCart = vi.fn(() => Promise.resolve(mockCart))

      await reviewCart(context)

      // // AEE.checkout.mock.calls.forEach(call => {
      // //   console.log(call) // `call[1]` is the second argument of the call
      // // })
      // // expect(context.commit).toHaveBeenNthCalledWith(1, 'updateCart', expect.anything())
      //
      expect(context.commit).toHaveBeenNthCalledWith(1, 'updateCart', expect.objectContaining({
        loading: true
      }))
      expect(APIGateway.cart.reviewCart).toHaveBeenNthCalledWith(1, [
        {
          products: [12345, 12346],
          attribute: [],
          product_id: 1234
        }
      ])
      expect(context.commit).toHaveBeenNthCalledWith(2, 'updateCart', expect.objectContaining(mockCart))

      expect(AEE.checkout).toHaveBeenNthCalledWith(1,
        1, // step
        'reviewAndPayment', // option
        mockCart.items.list[0]?.order_product?.list.map(item => item.product.eec.getData()), // products
        // cache
        {
          TTl: 1000,
          key: 'reviewCart'
        })

      expect(context.commit).toHaveBeenNthCalledWith(3, 'updateCart', expect.objectContaining({
        loading: false
      }))
    })

    it('successfully reviews the cart, commits update, and calls AEE checkout (login) -> selectable', async () => {
      const mockCart = new Cart({
        id: 123,
        items: [
          {
            grand: {
              id: 1234,
              title: 'test grand product'
            },
            order_product: [
              {
                product: {
                  id: 12345,
                  title: 'test child 1 product'
                }
              },
              {
                product: {
                  id: 12346,
                  title: 'test child 2 product'
                }
              }
            ]
          }
        ]
      })
      context.getters.cart = mockCart
      context.getters['Auth/isUserLogin'] = true
      mockCart.addToCart = vi.fn()
      APIGateway.cart.reviewCart = vi.fn(() => Promise.resolve(mockCart))

      await reviewCart(context)

      // // AEE.checkout.mock.calls.forEach(call => {
      // //   console.log(call) // `call[1]` is the second argument of the call
      // // })
      // // expect(context.commit).toHaveBeenNthCalledWith(1, 'updateCart', expect.anything())
      //
      expect(context.commit).toHaveBeenNthCalledWith(1, 'updateCart', expect.objectContaining({
        loading: true
      }))
      expect(APIGateway.cart.reviewCart).toHaveBeenNthCalledWith(1, [])
      expect(context.commit).toHaveBeenNthCalledWith(2, 'updateCart', expect.objectContaining(mockCart))

      expect(AEE.checkout).toHaveBeenNthCalledWith(1,
        1, // step
        'reviewAndPayment', // option
        mockCart.items.list[0]?.order_product?.list.map(item => item.product.eec.getData()), // products
        // cache
        {
          TTl: 1000,
          key: 'reviewCart'
        })

      expect(context.commit).toHaveBeenNthCalledWith(3, 'updateCart', expect.objectContaining({
        loading: false
      }))
    })
  })
})
