
# Why ?

A Typescript commander interface for querying PwnDB 2 Tor Hidden service for leaked password.
This should be use only for check if your mail address or domain have been hacked.

# How ?
 >1 - Install [Tor Service](https://www.torproject.org/docs/debian.html.en)
 >
 >2 - Git clone this repo
 >
 >3 - ```npm install && npm run build && cd lib```
 >
 >4 - ```node index.js %@domain or user@domain%```
 
 examples :
 
 >```node index.js toto@gmail.com```
 >
 >```node index.js @myCorporateDomain.com```
