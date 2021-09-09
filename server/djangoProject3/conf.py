
from rest_framework_jwt.utils import jwt_payload_handler

def jwt_custom_payload_handler(user):
	
	payload = jwt_payload_handler(user)
	payload['roles'] = [ 
		'staff' if (user.is_staff) else 'simpleuser'
	]

	if(user.is_superuser):
		payload['roles'].append('superuser')
	
	return payload
