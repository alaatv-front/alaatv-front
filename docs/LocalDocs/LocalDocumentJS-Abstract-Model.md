# Js-abstract-model

One of the technologies used in this project and invented by our team is the use of Js-abstract-model package.
The important use of this package is to normalize any data that is sent to the user in a desired way.
In this way, we first create a class with the desired instance and define all the keys and methods we need in that class.
Then, using the new keyword, we create an instance of the desired class and give the desired data as a parameter to the desired class.
What the package does for us here is that it compares all the keys in the data that we have given as parameters with the keys that we have defined in the initial instance for the class and completely removes the keys that are in the class. And besides, it will return null value for the keys that are not in our data.
Also, all the methods defined in the desired class can be used for the data output from the class.
By using this package, any data can be normalized and converted to desired data.

## Model Sample
```javascript

class className extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'baseRoute',
        default: '/c'
      },
      { key: 'id' },
      { key: 'type' },
      { key: 'title' },
      { key: 'duration' },
      { key: 'photo' },
      { key: 'order' },
      { key: 'url' }
    ])
  }


  customMethod(parameter) {
    // Do something
     }
}

export default className


```
