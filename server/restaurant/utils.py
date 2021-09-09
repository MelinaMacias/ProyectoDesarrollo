
from django.template.loader import get_template
from django.core.mail import EmailMultiAlternatives

def email_from_template(asunto, destinatario, mensaje, template_name="", data = {}):
    
    data['mensaje'] = mensaje
    template = get_template(template_name)
    email = EmailMultiAlternatives( 
        asunto, "Nada", to=[ destinatario ]
    )
    
    email.attach_alternative(template.render(data), "text/html")

    return email

def send_email_now(email):

    email.send()
