from rest_framework import serializers
from .models import Property, PropertyImage

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'image', 'caption', 'uploaded_at']


class PropertySerializer(serializers.ModelSerializer):
    # Pulls in all related images (related_name='images' from your model) as read-only files no edits.
    images = PropertyImageSerializer(many=True, read_only=True)
    
    # It's a custom field that accepts multiple images via the API when creating or updating a property.
    images = PropertyImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(max_length=1000000, allow_empty_file=False, use_url=False),
        write_only=True,
        required=False
    )

    class Meta:
        model = Property
        fields = [
            "id", "agent", "title", "description", "price", "property_type",
            "category", "location", "size", "beds", "baths", "status",
            "created_at", "updated_at", "uploaded_images", "images"
        ]
        read_only_fields = ('agent', 'last_edited_by', 'deleted_by', 'is_deleted')

    '''
        1. This overrides DRF’s default create() to manually handle uploaded_images.
        2. Pulls out the uploaded image files, creates the main Property, and then attaches each image to it one-by-one.
        3. Without this, DRF would throw an error — it doesn't natively understand how to handle nested image creation.
    '''
    def create(self, validated_data):
        # THIS IS THE CRITICAL LINE
        uploaded_images = validated_data.pop('uploaded_images', [])
        property_instance = Property.objects.create(**validated_data)

        for image in uploaded_images:
            PropertyImage.objects.create(property=property_instance, image=image)

        return property_instance
    
    '''
        1. Handles standard updates (title, price, etc.).
        2. Also lets the user add more images during an update (great UX).
        3. Doesn’t delete old images — just adds new ones. (Want to delete images too? 
            You’d need a separate endpoint or hook.)
    '''
    def update(self, instance, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', [])
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        for image in uploaded_images:
            PropertyImage.objects.create(property=instance, image=image)
        return instance





