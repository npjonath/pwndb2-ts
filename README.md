
# What is it ?

A Typescript commander interface for querying PwnDB 2 Tor Hidden service for leaked password.
Warning : Please use it only for checking your own security. Trying to get leaked password on domain or email you do not own is illegal.

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

```
[ { domain: 'domain.com',
    password: '***********',
    username: 'npjonath' } ]

```
