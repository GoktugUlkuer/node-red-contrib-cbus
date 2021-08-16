const mqtt = require('mqtt');
const fs = require('fs');

module.exports = function (RED) {
	function IoTScopeIn(config) {
		RED.nodes.createNode(this, config);

		var node = this;

		// Configuration options passed by Node Red
		node.brokerAddress = config.broker || "127.0.0.1";
		node.brokerPort = config.brokerport || "1883";
		node.username = "2ccc6223-64e8-4b96-b6ef-c6fe4c7a7f36";
		node.password = "c5bcb5c7-6ee0-41de-a502-22953b089d90";
		node.projectName = config.projectname || "Project Name";
		node.valueName = config.valuename || "Value Name";
		node.iotId = config.iot;
		node.unit = config.unit;

		// Config node state
		var isIotIdValid = node.iotId.length == 16;

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

		let mqttClient = mqtt.connect(`mqtt://` + node.brokerAddress + ":" + node.brokerPort, options);

		node.status({ fill: "red", shape: "ring", text: "Disconnected" });

		if (node.unit) {
			node.valueName += " [" + node.unit + "]";
		}

		node.on('input', function (msg) {
			if (mqttClient.connected) {

				if (isNaN(msg.payload)) {
					console.log("input is not a number!");
					return;
				};

				if (!isIotIdValid) {
					console.log("IoT ID is not valid!");
					return;
				}

				var json = [
					{ "Var": "Timestamp", "Val": createTimestamp() },
					{ "Var": node.valueName, "Val": msg.payload },
					{ "Var": "", "Val": 0 },
					{ "Var": "", "Val": 0 },
					{ "Var": "", "Val": 0 },
					{ "Var": "ProjectName", "Val": node.projectName }
				];

				endTime = new Date();

				var timeDiff = endTime - startTime;

				if (timeDiff < 900) {
					console.log("trigger interval is 1 second!");
					return;
				}
				else {
					mqttClient.publish(publishTopic, JSON.stringify(json));
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

		mqttClient.on('connect', function (connack) {
			if (mqttClient.connected) {
				console.log("Connected to broker");
				node.status({ fill: "green", shape: "dot", text: "Connected" });
			}
		});

		mqttClient.on('reconnect', () => {
			console.log('connection reconnecting');
			node.status({ fill: "yellow", shape: "ring", text: "Reconnecting" });
		});

		mqttClient.on('offline', () => {
			console.log('went offline');
			node.status({ fill: "red", shape: "ring", text: "Disconnected" });
		});

		mqttClient.on('error', () => {
			console.log('got error');
			node.status({ fill: "red", shape: "ring", text: "Disconnected" });
		});

	}
	RED.nodes.registerType("iot-scope-in", IoTScopeIn);
}