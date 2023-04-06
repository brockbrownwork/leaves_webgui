import socketio, eventlet, time, webbrowser
from get_image_from_base64 import save_base64_image
import os

# make sure there's only one instance of this server running
# if there's already a server running, then open the client in a new tab
# use singleton to do this


sio = socketio.Server(cors_allowed_origins='*', max_http_buffer_size=1e+8)
app = socketio.WSGIApp(sio)

@sio.event
def connect(sid, environ):
    print('Client connected:', sid)

@sio.event
def disconnect(sid):
    print('Client disconnected:', sid)

@sio.event
def message(sid, data):
    print('Received message:', data)
    sio.emit('message', "echo: " + data)

@sio.event
def upload_image(sid, data):
    # takes in a base64 encoded image, and writes the image to output/test_{number of files in folder + 1}.png
    sio.emit('message', "image has been received", room = sid)
    save_base64_image(data, 'output/test_{}.png'.format(len(os.listdir('output')) + 1))
    sio.emit('message', "...image has been saved! Processing image...", room = sid)

def send_image(sid, base64image):
    # takes in a base64image then returns it back to the front end client
    sio.emit('image_processed', base64image, room = sid)

if __name__ == '__main__':
    webbrowser.open('main.html')
    eventlet.wsgi.server(eventlet.listen(('localhost', 8000)), app)
