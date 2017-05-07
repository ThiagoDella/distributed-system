int objeto = 0;
int incomingByte = 0;
int pastIR = 999;
int pastSound = 999;
int hasSound = 0;
void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(7, INPUT); // Proximity
  pinMode(4, OUTPUT); // led 1
  pinMode(5, OUTPUT); // led 2
  pinMode(8, INPUT); // Sound sensor (digital port)
}

void loop() {
  // put your main code here, to run repeatedly:
  objeto = digitalRead(7);
  hasSound = digitalRead(8);
  
  if (Serial.available() > 0) {
    // read the incoming byte:
    incomingByte = Serial.parseInt();
  
    // say what you got:
    //Serial.print("I received: ");
    Serial.println(incomingByte);
  }
  //delay(2000);  
  if(incomingByte == 1){
    digitalWrite(4, HIGH);
  }else if(incomingByte == 11){
    digitalWrite(4, LOW);
  }else if(incomingByte == 2){
    digitalWrite(5, HIGH);
    delay(2000);
  }else if(incomingByte == 22){
    digitalWrite(5, LOW);
  }

  if(hasSound != pastSound){
    pastSound = hasSound;
    if(hasSound == 1){
      Serial.println("sensor 2");  
    }else{
      Serial.println("sensor 2 reset");  
    }
  }

  // Reading distance from the IR sensor
  if(objeto != pastIR){
    pastIR = objeto;
    if(objeto == 0){
      Serial.println("sensor 1");
    }else{      
      Serial.println("sensor 1 reset");
    }
  }
  delay(50); // poll every 100ms
}

