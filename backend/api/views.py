# APIView: A class from DRF used to build custom API endpoints.
# It lets you define your own logic for GET, POST, PUT, etc
from rest_framework.views import APIView

# Response: Used to send data back to the client (like success or error messages).
from rest_framework.response import Response

# status: Contains standard HTTP status codes (like 200 OK, 400 Bad Request, etc.).
# You use it to make your responses more readable.
from rest_framework import status

# This imports the custom serializer you created earlier (UserSerializer) from the same app.
from .serializers import UserSerializer

# AllowAny: A permission class that allows any user, even those not logged in, to access this view.
from rest_framework.permissions import AllowAny

# RefreshToken: Used to generate secure access and refresh tokens for users after login or registration.
from rest_framework_simplejwt.tokens import RefreshToken

# This is the default login view provided by JWT.
# It handles token generation when valid username/password is provided.
from rest_framework_simplejwt.views import TokenObtainPairView

# This class handles the user registration.
# Inherits from APIView, meaning you can define your own POST method for signup.
class RegisterView(APIView):
    
    # Anyone (logged in or not) is allowed to access this view 
    permission_classes = [AllowAny]

    # This runs when someone sends a POST request to this endpoint (i.e., tries to register).
    def post(self, request):
        
        # Takes the user data sent in the request and passes it into your UserSerializer to validate and save.
        serializer = UserSerializer(data=request.data)

        # Checks if the data is correct — like if email is valid, all required fields are present, etc.
        if serializer.is_valid():
            
            # If the data is valid, the create() method in your serializer is called, and a new User is saved.
            user = serializer.save()

            # This creates JWT tokens (access + refresh) for the new user:
                # Access Token = used to access protected routes.
                # Refresh Token = used to get a new access token when the old one expires.
            refresh = RefreshToken.for_user(user)

            # Returns a JSON response with:
                # Confirmation message
                # User ID, username, and email
                # access token: short-lived token for accessing secured APIs
                # refresh token: longer-lived token for getting new access tokens
                # status.HTTP_201_CREATED: Standard response code for successful creation.
            return Response({
                'message': 'Registration successful!',
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }, status=status.HTTP_201_CREATED)
        
        # If the serializer finds problems (e.g. missing fields), it returns those errors.
        # 400 Bad Request tells the client something was wrong with their input.
        return Response({"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# This is a login endpoint using JWT.
# It comes ready-made with DRF Simple JWT.
# It handles:
    # Validating username/password
    #Returning access/refresh tokens if valid
class LoginView(TokenObtainPairView):
    permission_classes = [AllowAny]