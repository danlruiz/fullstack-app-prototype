# Demo App


## About

This is a proof-of-concept demo application where a Django backend communicates with an Ionic/React front-end using JSON web token authentication.

A default user has been provided in order to facilitate this demo.

username: Ike

password: supersecret123


## Notes

The backend provides a stand-alone website using django templates. 

This can be found in the /todo/login/ path.




## Setup

### Back-end Setup

To setup the django backend, open the djangoRest/mysite2/ directory and run the following:

```bash

pip install -r requirements.txt

python manage.py runserver 127.0.0.2:9000

```




### Front-end Setup

To setup the Ionic front-end, open the ionApp/ directory and run

```bash 

npm install

ionic lab

(or ionic serve)


```

## TroubleShoot

if the authentication button doesn't work, try installing the CORS-plugin found here : 


https://addons.mozilla.org/en-CA/firefox/addon/cors-plugin/


https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en


