## Ethereum Smart Contract Transactions Indexer

Docker runs two images, one for redis one for Socios app respectively.
```
docker-compose -f ./docker-compose.yml build
```

And then run
```
docker-compose -f ./docker-compose.yml up
```


## Run locally on your environment without docker

``` 
yarn install
```
You need to run the below command first
```
redis-server
```
and then 
```
yarn start
```

# Test the services when server is up

### 3 Main APIs
1) Get all the transactions 
2) Get the amount transferred of for all the transactions
3) Search a specific TX based on its Transaction Hash

```
http://localhost:3000/api/transactions/
http://localhost:3000/api/transactions/amount
http://localhost:3000/api/transactions/search/:txHash
```

**In order to make the project run, you need to run your INFURA KEY, on the environment variables.**


### Run tests 
```
yarn test
```

For more check **.env.example file**.
