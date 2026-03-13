import random
from django.conf import settings
from django.core.mail import send_mail



def generate_pin():
    return str(random.randint(1000, 9999))

def send_reset_email(user, code):
    send_mail(
        "Password Reset Code",
        f"Your password reset code is: {code}",
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
    )