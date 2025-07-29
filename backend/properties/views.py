from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Property
from .serializers import PropertySerializer
from users.permissions import IsAgent, IsAdmin 

# Create your views here.

class PropertyListApiView(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsAdmin | IsAgent]


# This view handles creating a new property.
class PropertyCreateApiView(generics.CreateAPIView):
    queryset = Property.objects.filter(is_deleted=False)
    serializer_class = PropertySerializer
    permission_classes = [IsAgent | IsAdmin]

    
    def perform_create(self, serializer):
        # agent comes from the models
        serializer.save(agent=self.request.user)


# This view handles both retrieving and updating and deleteing a specific property. 

class PropertyDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAgent | IsAdmin]
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    def perform_update(self, serializer):
        serializer.save(last_edited_by=self.request.user)
    '''
        soft delete
        
        def perform_destroy(self, instance):
            # print to confirm trigger
            print(f"Deleting Property ID: {instance.id} by {self.request.user}")
            instance.deleted_by = self.request.user
            instance.is_deleted = True
            instance.save()
    '''

    def perform_destroy(self, instance):
        print(f"Deleting Property ID: {instance.id} by {self.request.user}")
        instance.deleted_by = self.request.user
        
        instance.delete()
    
    

    

    


    
