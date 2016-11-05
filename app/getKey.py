# not using the PokitDok Python client library
import requests
from base64 import urlsafe_b64encode

client_id = YOUR_APP_CLIENT_ID
client_secret = YOUR_APP_CLIENT_SECRET
access_token = requests.post('https://platform.pokitdok.com/oauth2/token',
headers={'Authorization': 'Basic ' +
urlsafe_b64encode(client_id + ':' + client_secret)},
data={'grant_type':'client_credentials'}).json()['access_token']
print(access_token)
activity = requests.get('https://platform.pokitdok.com/api/v4/activities/53187d2027a27620f2ec7537',
headers={'Authorization': 'Bearer ' + access_token}).json()
# using https://github.com/pokitdok/pokitdok-python
import pokitdok

client = pokitdok.api.connect('your_client_id', 'your_client_secret')