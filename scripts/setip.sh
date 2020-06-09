#!/bin/bash

IP=$(curl ifconfig.me)
echo $IP

echo "PUBLIC_IP=$IP" > $HOME/ballot-online/.env
