import paho.mqtt.client as mqtt
import sys

#Definicoes: 
Broker = "test.mosquitto.org"
PortaBroker = 1883
KeepAliveBroker = 60
TopicoSubscribe = "MQTTProtocolTest" 

#Callback - Conexao ao broker realizada
def on_connect(client, userdata, flags, rc):
    print("[STATUS] - " + "\033[32m"+"[CONECTADO]"+"\033[0;0m" + " - Resultado de conexao: "+str(rc))
    client.subscribe(TopicoSubscribe)

#Callback - Mensagem recebida do broker
def on_message(client, userdata, msg):
	MensagemRecebida = str(msg.payload)
      
	print("\033[32m"+"[Mensagem recebida]"+"\033[0;0m" + " - Topico: "+msg.topic+" - mensagem: "+MensagemRecebida)
	
try:
        print("[STATUS] - Inicializando MQTT...")
        client = mqtt.Client()
        client.on_connect = on_connect
        client.on_message = on_message

        client.connect(Broker, PortaBroker, KeepAliveBroker)
        client.loop_forever()
except KeyboardInterrupt:
        print("\033[31m" + "[CTRL+C]" + "\033[0;0m" + " - Encerrando atividade!")
        sys.exit(0)