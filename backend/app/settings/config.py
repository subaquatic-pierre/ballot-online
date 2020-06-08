import os
import json
# path to config file outsite django server
home = os.path.expanduser('~')
with open(home + '/etc/ballot-online/config.json') as f:
    config = json.load(f)


class Config():

    DEBUG = config.get("DEBUG")
    SECRET_KEY = config.get("SECRET_KEY")
