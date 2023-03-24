import socketio, eventlet, time, webbrowser

sio = socketio.Server(cors_allowed_origins='*', max_http_buffer_size=1e+8)
app = socketio.WSGIApp(sio)

@sio.event
def connect(sid, environ):
    print('Client connected:', sid)

@sio.event
def disconnect(sid):
    print('Client disconnected:', sid)

@sio.event
def ping(sid):
    print('Received ping from:', sid)
    sio.emit('pong', room=sid)

@sio.event
def message(sid, data):
    print('Received message:', data)
    sio.emit('message', "echo: " + data)

if __name__ == '__main__':
    webbrowser.open('example_socketio.html')
    eventlet.wsgi.server(eventlet.listen(('localhost', 8000)), app)
