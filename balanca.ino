#include "HX711.h"
#include <ESP8266WiFi.h>
#include <PubSubClient.h>              
#define DOUT D6                      
#define CLK  D7                       
HX711 bau;                             
float calibration_factor = 277730;    

IPAddress ip(192, 168, 0, 102);
IPAddress gateway(192, 168, 0, 1);


IPAddress subnet(255, 255, 255, 0);
IPAddress DNS(8, 8, 8, 8); 

const char* mqttServer = "206.189.97.240";
const int mqttPort = 1883;
const char* mqttUser = "usuario";
const char* mqttPassword = "senha";
 
const char* ssid = "MOB-NET HOUSER-5G-ESCR";
const char* password = "Deusebon!1@2#3";
WiFiServer server(80);

WiFiClient client = server.available();
PubSubClient clientMqtt(client);
clientMqtt.setServer(mqttServer, mqttPort);

void setup()
{
  Serial.begin(125000); 
  bau.begin(DOUT, CLK);     
  bau.set_scale(calibration_factor);          
  bau.tare();                                    
  
  Serial.println();
  Serial.print("Connectando ");
  Serial.println(ssid);
  WiFi.config(ip, gateway, subnet, DNS);
  delay(100);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi conectado");
  
  server.begin();
  Serial.println("Web server rodando. Aguardando pelo ESP IP...");
  delay(10000);
  
  
  Serial.println(WiFi.localIP());
}

void loop()
{
  Serial.print("Peso: ");                            
  Serial.print(bau.get_units(), 3);         
  Serial.println(" kg");                            
  delay(500) ;                                       
  if (Serial.available())                            
  {
    char temp = Serial.read();                      
    if (temp == 't' || temp == 'T')                 
    {
      bau.tare();                                
      Serial.println(" Balança zerada");           
    }
  }
  
  // WiFiClient client = server.available();
  // PubSubClient clientMqtt(client);
  // clientMqtt.setServer(mqttServer, mqttPort);

  while (!clientMqtt.connected()) {
        Serial.println("Connecting to MQTT…");
        String clientId = "ESP32Client-";
        clientId += String(random(0xffff), HEX);
        if (clientMqtt.connect(clientId.c_str(), mqttUser, mqttPassword )) {
            Serial.println("connected");
        } else {
            Serial.print("failed with state ");
            Serial.print(clientMqtt.state());
            delay(2000);
        }
    }
    Serial.print("Tentando enviar a mensagem");
    char data[6];
    char* valor = dtostrf(bau.get_units(),4,2,data);
    clientMqtt.publish("weight", valor);
}