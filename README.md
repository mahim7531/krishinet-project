# PROJECT PROPOSAL

## SmartPlant: An IoT-Based Smart Plant Monitoring and Automatic Irrigation System

**Submitted To:**  
Project Supervisor  
Department of Computer Science and Engineering

**Submitted By:**  
Group Members (4 Students)  
Department of Computer Science and Engineering

**Project Type:** IoT-Based Hardware and Software System

---

## 1. Introduction

Agriculture and plant cultivation require proper monitoring of soil moisture, temperature, and humidity. Traditionally, plants are watered manually, which can lead to overwatering, underwatering, and unnecessary water consumption.

To solve these problems, we propose **SmartPlant**, an IoT-based Smart Plant Monitoring and Automatic Irrigation System. The system uses an ESP32 microcontroller, a soil moisture sensor, and a DHT11 temperature and humidity sensor to monitor plant conditions.

The system automatically controls a water pump according to the soil moisture level. Additionally, a web-based dashboard developed using the MERN Stack allows users to monitor environmental data and manually control the irrigation system remotely through the internet.

## 2. Problem Statement

Traditional plant watering systems have several limitations:

- Manual watering requires regular human involvement.
- Plants may receive too much or too little water.
- Soil moisture conditions are not continuously monitored.
- Users cannot easily monitor plant conditions remotely.
- Water resources may be wasted due to improper irrigation.

SmartPlant aims to address these problems through an automated and IoT-based monitoring solution.

## 3. Objectives

The main objectives of this project are:

1. To develop an automated plant irrigation system.
2. To monitor soil moisture levels using a capacitive soil moisture sensor.
3. To measure temperature and humidity using a DHT11 sensor.
4. To automatically turn the water pump ON/OFF based on soil moisture thresholds.
5. To develop a web-based dashboard for real-time monitoring.
6. To provide remote manual pump control through the web application.
7. To reduce unnecessary water consumption and human involvement.

## 4. Proposed System

The proposed SmartPlant system consists of hardware components and a web-based software application.

The ESP32 collects data from the connected sensors. Based on the soil moisture reading, it automatically controls the water pump through a relay module.

The ESP32 also sends sensor readings to the backend server through Wi-Fi. Users can access the web dashboard to monitor plant conditions and control the pump manually.

The system supports both automatic and manual irrigation modes.

## 5. Hardware Requirements

| Component | Purpose |
|---|---|
| ESP32 DEVKIT V1 | Main microcontroller |
| Capacitive Soil Moisture Sensor | Measures soil moisture |
| DHT11 Sensor | Measures temperature and humidity |
| 5V Relay Module | Controls the water pump |
| 3V Mini DC Water Pump | Supplies water to the plant |
| Breadboard | Circuit connections |
| Jumper Wires | Electrical connections |
| External Power Supply | Provides pump power |

## 6. Software Requirements

| Technology | Purpose |
|---|---|
| Arduino IDE | ESP32 programming |
| Embedded C/C++ | Hardware programming |
| React.js | Frontend development |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MongoDB | Data storage |
| Wi-Fi | ESP32 internet connectivity |
| Netlify | Frontend deployment |
| Render | Backend deployment |

## 7. System Architecture

The system will work through the following process:

1. The soil moisture sensor measures the moisture level of the soil.
2. The DHT11 sensor measures temperature and humidity.
3. The ESP32 processes the collected sensor data.
4. If the soil moisture level falls below the predefined threshold, the ESP32 activates the relay and turns ON the water pump.
5. When the soil reaches the desired moisture level, the pump automatically turns OFF.
6. Sensor data is transmitted to the backend server through Wi-Fi.
7. The backend processes and stores the received information in MongoDB.
8. The React-based dashboard displays the sensor information.
9. Users can manually control the pump through the web application.

## 8. System Architecture Diagram

**Data Flow:**

Sensors → ESP32 → Wi-Fi → Node.js/Express Backend → MongoDB → React Dashboard

**Automatic Control:**

ESP32 → Relay Module → Water Pump

**Manual Control:**

React Dashboard → Backend API → ESP32 → Relay Module → Water Pump

## 9. Methodology

The project will be developed through the following stages:

**Stage 1: Hardware Development**

- Connect the soil moisture sensor to ESP32.
- Connect the DHT11 sensor.
- Configure the relay module and water pump.
- Test sensor readings and pump operation.

**Stage 2: Embedded System Development**

- Write ESP32 firmware using Arduino IDE.
- Implement soil moisture threshold logic.
- Implement automatic pump control.
- Configure Wi-Fi communication.

**Stage 3: Backend Development**

- Develop REST APIs using Node.js and Express.js.
- Establish communication between ESP32 and the backend.
- Store sensor readings in MongoDB.
- Implement manual pump control endpoints.

**Stage 4: Frontend Development**

- Develop a responsive dashboard using React.js.
- Display soil moisture, temperature, and humidity.
- Implement manual pump control.
- Display automatic/manual operating status.

**Stage 5: Integration and Testing**

- Integrate hardware with the MERN Stack application.
- Test automatic irrigation.
- Test remote manual pump control.
- Evaluate sensor accuracy and system reliability.

## 10. Expected Outcomes

After successful completion, the project is expected to provide:

- An automated plant watering system.
- Continuous soil moisture monitoring.
- Temperature and humidity monitoring.
- Automatic water pump control.
- Remote monitoring through a web dashboard.
- Manual pump control through the internet.
- Reduced human involvement in plant watering.
- More efficient water usage.

## 11. Future Scope

The system can be improved in the future by adding:

1. AI-based plant disease detection using leaf images.
2. Mobile application integration.
3. Multiple plant monitoring.
4. Weather-based irrigation recommendations.
5. Cloud-based analytics and historical reports.
6. Smart notifications when soil moisture becomes too low.

## 12. Conclusion

SmartPlant is an IoT-based solution designed to make plant monitoring and irrigation more efficient and convenient. By integrating ESP32, environmental sensors, automatic irrigation control, and a MERN Stack web application, the proposed system provides an affordable and practical smart gardening solution.

The project aims to demonstrate how IoT and modern web technologies can be integrated to solve real-world problems related to plant care and water management.

## 13. References

1. Espressif Systems, ESP32 Technical Reference Manual.
2. Arduino Documentation, https://docs.arduino.cc/
3. MongoDB Documentation, https://www.mongodb.com/docs/
4. React Documentation, https://react.dev/
5. Node.js Documentation, https://nodejs.org/docs/
6. Express.js Documentation, https://expressjs.com/
