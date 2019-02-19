
# What is it ?

A Typescript CLI utility for searching in the PwnDB 2 Tor Hidden service database for leaked password.
Warning : Trying to get leaked password on domain or email you do not own is illegal.

# Goal

 [x] Filtering Inputs args
 
 [x] Make http request through TOR Protocol
 
 [x] Extract Data from RAW Html response
 
 [x] Forge JSON response
 
# How to install ?
 >1 - Install [Tor Service](https://www.torproject.org/docs/debian.html.en)
 >
 >2 - Git clone this repo
 >
 >3 - ```npm install && npm run build && cd lib```
 >
 >4 - ```node index.js %@domain or user@domain%```
 
# Input :
 
 >```node index.js toto@gmail.com```
 >
 >```node index.js @myCorporateDomain.com```

# Output 

> On Success
```
{
	"count": 2,
	"inputs": {
		"domain": "pwndomain.com",
		"username": "%"
	},
	"message": "You have been pwned... :(",
	"outputs": [{
		"domain": "pwndomain.com",
		"password": "1234",
		"username": "test"
	}, {
		"domain": "pwndomain.com",
		"password": "ABCDE",
		"username": "test2"
	}],
	"status": {
		"code": 200,
		"error": ""
	}
}

```
> On Error
```
{
	"count": 0,
	"inputs": {
		"domain": "notpwndomain.com",
		"username": "test"
	},
	"message": "No leak found for this query... :)",
	"outputs": [],
	"status": {
		"code": 200,
		"error": ""
	}
}

```
