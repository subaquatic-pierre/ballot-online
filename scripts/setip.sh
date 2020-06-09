#!/bin/bash

IP=$(curl ifconfig.me)
CWD=$(pwd)
echo $IP

echo "PUBLIC_IP=$IP" > $HOME/ballot-online/.env
