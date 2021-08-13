const mqtt = require('mqtt');
const fs = require('fs');

module.exports = function (RED) {
	function IoTScopeIn(config) {
		RED.nodes.createNode(this, config);

		var node = this;

		// Configuration options passed by Node Red
		node.brokerAddress = config.broker || "127.0.0.1";
		node.brokerPort = config.brokerport || "1883";
		node.username = config.username;
		node.password = config.password;
		node.projectName = config.projectname || "Project Name";
		node.valueName = config.valuename || "Value Name";
		node.iotId = config.iot;
		node.unit = config.unit;

		// Config node state
		var publishTopic = "CBUS/IOT_SCOPE/" + node.iotId;
		var startTime, endTime;

		startTime = endTime = new Date();

		let options = {
			username: node.username,
			password: node.password,
			connectTimeout: 5000,
			rejectUnauthorized: false,
			ca: null,
			reconnectPeriod: 5000
		};

		let my_client = mqtt.connect(`mqtt://` + node.brokerAddress + ":" + node.brokerPort, options);

		node.status({ fill: "red", shape: "ring", text: "Disconnected" });

		if(node.unit){
			node.valueName += " [" + node.unit + "]";
		}

		node.on('input', function (msg) {
			if (my_client.connected) {

				if(isNaN(msg.payload)){
					console.log("input is not a number!");
					return;
				};

				var json = [
					{ "Var": "Timestamp", "Val": createTimestamp()},
					{ "Var": node.valueName, "Val": msg.payload },
					{ "Var": "", "Val": 0 },
					{ "Var": "", "Val": 0 },
					{ "Var": "", "Val": 0 },
					{ "Var": "ProjectName", "Val": node.projectName }
				];

				endTime = new Date();

				var timeDiff = endTime - startTime;
				// console.log(timeDiff);
				// console.log(startTime);
				// console.log(endTime);
				
				if(timeDiff < 900){
					console.log("trigger interval is 1 second!");
					return;
				}
				else{
					my_client.publish(publishTopic, JSON.stringify(json));
					startTime = new Date();
				}


			}
		});

		function createTimestamp() {

			var date = new Date();

			var month = date.getMonth() + 1;
			var day = date.getDate();
			var hour = date.getHours();
			var min = date.getMinutes();
			var sec = date.getSeconds();

			month = (month < 10 ? "0" : "") + month;
			day = (day < 10 ? "0" : "") + day;
			hour = (hour < 10 ? "0" : "") + hour;
			min = (min < 10 ? "0" : "") + min;
			sec = (sec < 10 ? "0" : "") + sec;

			var str = day + "/" + month + "/" + date.getFullYear() + " " + hour + ":" + min + ":" + sec;

			return str;
		}

		my_client.on('connect', function (connack) {
			if (my_client.connected) {
				console.log("Connected to broker");
				node.status({ fill: "green", shape: "dot", text: "Connected" });
			}
		});

		my_client.on('reconnect', () => {
			console.log('connection reconnecting');
			node.status({ fill: "yellow", shape: "ring", text: "Reconnecting" });
		});

		my_client.on('offline', () => {
			console.log('went offline');
			node.status({ fill: "red", shape: "ring", text: "Disconnected" });
		});

		my_client.on('error', () => {
			console.log('got error');
			node.status({ fill: "red", shape: "ring", text: "Disconnected" });
		});

	}
	RED.nodes.registerType("iot-scope-in", IoTScopeIn);
}