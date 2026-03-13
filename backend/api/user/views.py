from django.shortcuts import render
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view, throttle_classes
from .serializers import UserSerializer
import os
from django.conf import settings
from rest_framework.throttling import AnonRateThrottle
from django.contrib.auth.models import User
from ..rate_limit.TestThrottle import TestThrottle
from rest_framework import status
from .utils import generate_pin, send_reset_email
from django.core.cache import cache

# Create your views here.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['username'] = user.username
        
        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

       
@api_view(['POST'])
def registerUser(request):

    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "User registered successfully"},
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


RESET_CODE_TIMEOUT = 300 


@api_view(["POST"])
def request_password_reset(request):

    email = request.data.get("email")

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

    code = generate_pin()

    cache.set(
        f"reset_code_{email}",
        code,
        timeout=RESET_CODE_TIMEOUT
    )

    send_reset_email(user, code)

    return Response({"message": "Reset code sent"})

@api_view(["POST"])
def verify_reset_code(request):

    email = request.data.get("email")
    code = request.data.get("code")

    stored_code = cache.get(f"reset_code_{email}")

    if stored_code is None:
        return Response(
            {"error": "Code expired or not requested"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if stored_code != code:
        return Response(
            {"error": "Invalid code"},
            status=status.HTTP_400_BAD_REQUEST
        )

    return Response({"message": "Code verified", 'is_permitted': True})

@api_view(["POST"])
def reset_password(request):

    email = request.data.get("email")
    code = request.data.get("code")
    new_password = request.data.get("password")

    stored_code = cache.get(f"reset_code_{email}")

    if stored_code is None:
        return Response(
            {"error": "Code expired"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if stored_code != code:
        return Response(
            {"error": "Invalid code"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    user.set_password(new_password)
    user.save()

    cache.delete(f"reset_code_{email}")

    return Response({"message": "Password updated"})

@api_view(["POST"])
def resend_reset_code(request):

    email = request.data.get("email")

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    code = generate_pin()

    cache.set(
        f"reset_code_{email}",
        code,
        timeout=RESET_CODE_TIMEOUT
    )

    send_reset_email(user, code)

    return Response({"message": "New reset code sent"})


@api_view(['GET'])
@throttle_classes([TestThrottle])
def test(request):
    
    return Response('Hello')