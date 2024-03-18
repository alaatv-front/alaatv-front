# API Gateway

API Gateway
API Gateway is an architectural pattern in distributed systems that acts as an intermediate layer between clients and microservices. API Gateway is the main entry point for clients and performs various tasks including routing, security enforcement, caching, traffic analysis and load balancing. This architectural pattern is used independently of microservices and provides improved performance, security and management of APIs.

Modeling this architecture, we have implemented an API Gateway layer for the front layer, with the difference that this layer is placed between the pages that want to make requests and the HTTP client of the project, which can be axios or any other client whose settings It is done only once in the project. In this layer, all the endpoints necessary for the project are implemented in the API Gateway models in the form of special API Gateway classes, and when the developer needs to get information or send data to the backend. It is doing the desired process by calling the available functions and sending the relevant parameters and receiving the response of the request in the form of models defined in the project which are explained in detail in the models section.
For example, in the following code sample, to get the information of a product, it is enough to call the get function from the product model with the relevant parameter, which is the product ID, so that the information is returned as product class:


```javascript
getProduct() {
   this.loading = true
   this.$apiGateway.product.get(this.productId)
   .then(product => {
     this.product = product
     this.loading = false
   })
   .catch(() => {
     this.loading = false
   })
  }

```
By using this structure, when developing the program, there is no need to set a token for authentication or other necessary headers to send requests to the back-end server, and even the addresses of the endpoints are already prepared and there is no need to repeat them in We don't have the whole project and we are sure that the requests are sent to the right addresses with the right configuration and the answers reach the pages in the form of existing normalized classes. On the other hand, due to data normalization before sending another request, we avoid sending requests with incorrect or wrong information and face fewer errors.

But among the other important points that are done in this layer, we can mention the use of cache for requests and the merging of requests to reduce the number of requests from the users to the server. In this process, the developer can send the cache settings as a parameter to the API Gateway and those settings are applied to the request, or when defining the functions, the default cache value can be defined for the requests, which can be rewritten by the developer. and in this defined interval, if the request is repeated, its response will be returned from the cache. On the other hand, if a request is called on the page through several widgets, all of them are aggregated and sent to the server in the form of a request.
