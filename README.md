# sean-todo-list

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### json-server install
```
npm install -g json-server
```
### create db.json file with some data(root에 생성)
```
{
 "todos" : [
   {"id" : "1", "content" : "test"}
 ]
}
```

### json-server start
```
json-server --watch db.json
```

### axios install
```
npm install axios
```

### axios post request
```
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
