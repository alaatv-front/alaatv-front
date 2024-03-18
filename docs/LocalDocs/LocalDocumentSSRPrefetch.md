# SSR Prefetch

Usually, frameworks such as Vue.js are used to display content on the client side, and the components of this framework are created and displayed on the client side and in the browser using JavaScript as runtime. Among the advantages of this work is that there is no processing load on the server side and it is enough to download the web content from the server once and then the rest of the work is done by the user's browser on the client side. Sometimes, for the reasons that will be mentioned later, it is necessary to display and execute the components on the server side and send only HTML and CSS content on the client side.
With the help of SSR, a web application has better SEO, and search engines like Google find the desired page more easily and quickly. Normally, search engines like Google or Bing index web applications synchronously. In SPA mode, data is usually received through AJAX, and as a result, search engines do not wait to receive information, and from the SEO point of view, SPA websites may rank lower than Prerender or SSR websites.
It should be noted that if the request reaches the node js directly, the page will be rendered on the server side, and in this case, the server side node js should send the required requests to the backend of the project. But if the user reaches the desired page by changing pages on the browser side and by simply clicking on the browser buttons, this time the request does not reach the server and node js, and on the desired page, the requests are completely sent from the user's browser to the backend. to be Therefore, in order to implement a request in a component that we intend to make an SSR request if necessary, we must be careful when to send the request to the server and when to execute the request to the client, and in both cases the received data render in the template.
For this purpose, in order to prevent the programmer from getting involved with these complications, three methods have been defined for him that he can rewrite in widgets that require SSR requests.

## Methods
```javascript
prefetchServerDataPromise () {
 return Promise.resolve()
},
prefetchServerDataPromiseThen (data) {
},
prefetchServerDataPromiseCatch () {
}

```

### prefetchServerDataPromise
In this method, the programmer only needs to return a promise, the result of which will be an ajax request. Of course, according to the framework of the project, all requests are sent through the APIGateway layer, the details of which you can read in the relevant section.

### prefetchServerDataPromiseThen
In this method, which has a data argument, we only need to implement the codes related to the time of receiving information.

### prefetchServerDataPromiseCatch
In this method, we only need to implement the codes related to the time of the error.
