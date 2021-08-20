# Node-RED CBUS IoT Scope 

A node that sends data to the cloud by using MQTT protocol. These data can be monitored at IoT Scope's web page with the given IoT ID.

![image](https://user-images.githubusercontent.com/84990490/130226045-bd6f660e-595e-414a-921e-ffa09654eb0f.png)

# How to install

    cd ~/.node-red
    npm install node-red-contrib-cbus
    
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

After preparing node-red project, you can use the following link to observe IoT Scope value.

https://iot.cbus.io/iotscope?ID=0123456789012345

![image](https://user-images.githubusercontent.com/84990490/129887528-bc061dce-a1b4-4242-ba41-02fe75d3469c.png)

## Example project

Node-red flow :

![image](https://user-images.githubusercontent.com/84990490/129888267-82a92976-7b3a-4cd9-8eaf-e325d474f49a.png)

You can import this example as follows.

    [{"id":"934df569c8ec9982","type":"iot-scope-in","z":"be8de71f8b865057","name":"IoT Scope","broker":"nr.cbus.io","brokerport":"1883","iot":"","projectname":"Trial Project","valuename":"Counter","unit":"Tick","x":830,"y":140,"wires":[]},{"id":"456f3ed31ecd2cf2","type":"inject","z":"be8de71f8b865057","name":"","props":[{"p":"payload"}],"repeat":"1","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"Trigger","payloadType":"str","x":380,"y":140,"wires":[["86cde155107cf0e6"]]},{"id":"86cde155107cf0e6","type":"function","z":"be8de71f8b865057","name":"Counter","func":"var counter = context.get('counter') || 0;\ncounter += 1;\nif(counter > 60)\n    counter = 0;\nmsg.payload = counter;\ncontext.set('counter', counter);\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","libs":[],"x":590,"y":140,"wires":[["934df569c8ec9982"]]}]

IoT Scope :

![nr-iotscope](https://user-images.githubusercontent.com/84990490/129889051-4a0e9741-0114-43c1-9e22-5033f3fe4af9.gif)

# Contact information

 For any question -> <info@cbus.io>
