import socketio
import time
sio = socketio.Client()

@sio.event
def connect():
    print('connection established')
  
@sio.event
def send_message(data):
    sio.emit('process_file', data)

@sio.event
def disconnect():
    print('disconnected from server')

sio.connect('http://localhost:3001')
time.sleep(1)
sio.emit('process_file', {'response': 'my response'})

sio.wait()


