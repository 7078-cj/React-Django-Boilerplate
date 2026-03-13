from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import registerUser, MyTokenObtainPairView, test, request_password_reset, verify_reset_code, reset_password, resend_reset_code


urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', registerUser, name='register_user'),
    path('test/', test, name='test'),
    path("forgot-password/", request_password_reset, name='request_password_reset'),
    path("verify-code/", verify_reset_code, name='verify_reset_code'),
    path("reset-password/", reset_password, name='reset_password'),
    path("resend-code/", resend_reset_code, name='resend_code'),
    
]