# Node-RED CBUS IoT Scope And IoT SQL

This library includes two nodes. One of them is IoT Scope, and the other one is IoT SQL. They both uses MQTT protocol to send data to the cloud.

1) IoT Scope

Data sent by this node can be monitored at IoT Scope's web page with the given IoT ID. The sampling rate is 1 second, and the chart starts the drawing when the browser is opened. It shows last 1 hour data as it gathers data from the node.

2) IoT SQL

Same concept applies here, but the main difference is that data sent by this node is stored in database, so history of the data can be tracked. The sampling rate is 1 minute.

![image](https://user-images.githubusercontent.com/84990490/130230937-191f7289-6f08-4bb8-b016-9ce323ef112e.png)

# How to install

    cd ~/.node-red
    npm install node-red-contrib-cbus
    
# How to use it

## Requesting IoT Scope ID or IoT Scope ID

As a first step, an IoT ID should be requested. To do that, the following site can be used.

[IoT Scope or IoT SQL ID Request Website](https://iot.cbus.io/license)

Just enter valid e-mail adress and hit enter. 

![image](https://user-images.githubusercontent.com/84990490/134559582-7963c015-52e7-4f61-ab69-8b4761bdca58.png)

## Node settings

After installing node package, enter the IoT ID in node properties.

![image](https://user-images.githubusercontent.com/84990490/129741161-f743939a-652d-4c5c-8f48-6bda28cfdf41.png)

## IoT Scope Web Interface

After preparing node-red project, you can use the following link to observe IoT Scope value.

https://iot.cbus.io/iotscope?ID=0123456789012345

Basically, replace 0123456789012345 with your IoT ID.

![image](https://user-images.githubusercontent.com/84990490/129887528-bc061dce-a1b4-4242-ba41-02fe75d3469c.png)

## Example project for IoT Scope

Node-red flow :

![image](https://user-images.githubusercontent.com/84990490/129888267-82a92976-7b3a-4cd9-8eaf-e325d474f49a.png)

You can import this example as follows.

    [{"id":"934df569c8ec9982","type":"iot-scope-in","z":"be8de71f8b865057","name":"IoT Scope","broker":"nr.cbus.io","brokerport":"1883","iot":"","projectname":"Trial Project","valuename":"Counter","unit":"Tick","x":830,"y":140,"wires":[]},{"id":"456f3ed31ecd2cf2","type":"inject","z":"be8de71f8b865057","name":"","props":[{"p":"payload"}],"repeat":"1","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"Trigger","payloadType":"str","x":380,"y":140,"wires":[["86cde155107cf0e6"]]},{"id":"86cde155107cf0e6","type":"function","z":"be8de71f8b865057","name":"Counter","func":"var counter = context.get('counter') || 0;\ncounter += 1;\nif(counter > 60)\n    counter = 0;\nmsg.payload = counter;\ncontext.set('counter', counter);\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","libs":[],"x":590,"y":140,"wires":[["934df569c8ec9982"]]}]

IoT Scope :

![nr-iotscope](https://user-images.githubusercontent.com/84990490/129889051-4a0e9741-0114-43c1-9e22-5033f3fe4af9.gif)

## IoT SQL Web Interface

Same concept in IoT Scope node applies here. After preparing node-red project, you can use the following link to observe IoT SQL value.

https://iot.cbus.io/sql?ID=0123456789012345

Basically, replace 0123456789012345 with your IoT ID.

IoT SQL :

![image](https://user-images.githubusercontent.com/84990490/134560976-2c58b2cc-aea0-4038-a477-6517a413c831.png)

## Example project for IoT SQL

Node-red flow :

![12](https://user-images.githubusercontent.com/84990490/134561707-d9912f28-3e08-4af2-9fd6-18488d3968f2.png)

You can import this example as follows.

    [{"id":"51b26449adc16038","type":"iot-sql","z":"be8de71f8b865057","name":"IoT Sql","broker":"nr.cbus.io","brokerport":"1883","iot":"","valuename":"Node-Red Counter","x":840,"y":180,"wires":[]},{"id":"8ffa8a36f4ffd078","type":"inject","z":"be8de71f8b865057","name":"","props":[{"p":"payload"}],"repeat":"60","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"Trigger","payloadType":"str","x":400,"y":180,"wires":[["7f7c01660e5cd7c4"]]},{"id":"7f7c01660e5cd7c4","type":"function","z":"be8de71f8b865057","name":"Counter","func":"var counter = context.get('counter') || 0;\ncounter += 1;\nif(counter > 60)\n    counter = 0;\nmsg.payload = counter;\ncontext.set('counter', counter);\nreturn msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","libs":[],"x":600,"y":180,"wires":[["51b26449adc16038"]]}]

# Contact information

 For any question -> <info@cbus.io>
