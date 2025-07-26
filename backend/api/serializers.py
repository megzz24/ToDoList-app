from rest_framework import serializers 
from django.contrib.auth.models import User 

class UserSerializer(serializers.ModelSerializer): 
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User 
        fields = ["first_name", "last_name", "username", "email", "password"] 
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'username': {'required': True},
            'email': {'required': True},
        }
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
