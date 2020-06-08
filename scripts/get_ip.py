import socket
public_ip = socket.gethostbyname(socket.gethostname())

with open('.env', 'w') as f:
    f.writelines(f'PUBLIC_IP={public_ip}')
    f.close()
