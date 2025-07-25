# A serializer helps convert complex data like Django models into JSON (for APIs), and vice versa.
# rest_framework: refers to Django REST Framework (DRF) — a powerful library for building APIs.
from rest_framework import serializers 
# django.contrib.auth.models: Django's built-in user authentication system.
# User: this is the default user model that stores user info like username, password, etc.
from django.contrib.auth.models import User 

# UserSerializer class inherits from ModelSerializer, which:
    # Links the serializer to a Django model.
    # Auto-handles converting model data to JSON and vice versa.
class UserSerializer(serializers.ModelSerializer): 
    
    # customizes the password field:
        # CharField: it's a field that stores text (like a string).
        # write_only=True: this means the password can be sent to the API, but won’t be shown back in the response (for security).
        # required=True: makes sure the user must provide a password.
    password = serializers.CharField(write_only=True, required=True)

    # inner class that tells Django which model the serializer is linked to and which fields to use
    class Meta:
        model = User
        fields = ["first_name", "last_name", "username", "email", "password"]
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'username': {'required': True},
            'email': {'required': True},
        }
    
    # a method that tells Django how to create a new User object when someone signs up.
    # validated_data: this is a Python dictionary containing the cleaned/validated user input.    
    def create(self, validated_data):
        
        # creating a new user instance using the validated data from the API request.
        user = User(
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            username=validated_data["username"],
            email=validated_data["email"],
        )
        
        # set_password(...) hashes the password securely (encrypts it).
        user.set_password(validated_data["password"]) 
        
        # Saves the new user to the database.
        user.save() 
        
        # Returns the newly created user object.
        return user 