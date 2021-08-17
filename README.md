# Node-RED CBUS IoT Scope 

A node that sends data to the cloud by using MQTT protocol. These data can be monitored at IoT Scope's web page with the given IoT ID.

# How to install

    $ cd ~/.node-red
    $ npm install node-red-contrib-cbus
    
# How to use it

## Requesting IoT Scope ID

As a first step, an IoT ID should be requested. To do that, the following site can be used.

[IoT Scope Request Website](https://iot.cbus.io/license)

Just enter valid e-mail adress and hit enter. 

![image](https://user-images.githubusercontent.com/84990490/129736302-6bd64e09-3068-44de-92f7-c7397e5978c3.png)

## Node settings

After installing node package, enter the IoT ID in node properties.

![image](https://user-images.githubusercontent.com/84990490/129741161-f743939a-652d-4c5c-8f48-6bda28cfdf41.png)

## IoT Scope Web Interface

https://iot.cbus.io/m.aspx?ID=[IoT_SCOPE_ID]
