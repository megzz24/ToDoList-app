from rest_framework.views import APIView  
from rest_framework.response import Response  
from rest_framework import status  
from .serializers import UserSerializer 
from rest_framework.permissions import AllowAny  
from rest_framework.permissions import IsAuthenticated  
from rest_framework_simplejwt.tokens import RefreshToken 
from rest_framework_simplejwt.views import TokenObtainPairView  

class RegisterView(APIView):
    permission_classes = [AllowAny] 

    def post(self, request):
        serializer = UserSerializer(data=request.data)  

        if serializer.is_valid():  
            user = serializer.save()  
            refresh = RefreshToken.for_user(user)  

            return Response(
                {
                    "message": "Registration successful!",
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            {"message": "Registration failed.", "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )

class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny] 

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request):
        serializer = UserSerializer(request.user)  
        return Response(serializer.data)  