from django.db import models
from django.conf import settings

# Create your models here.
class Property(models.Model):
    agent = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    last_edited_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="edited_properties")
    deleted_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL, related_name='deleted_properties')
    is_deleted = models.BooleanField(default=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    property_type = models.CharField(max_length=50)
    category = models.CharField(max_length=20, choices=[('sale', 'For Sale'), ("rent", "For Rent")])
    location = models.CharField(max_length=255)
    size = models.PositiveIntegerField(default=0)
    beds = models.PositiveIntegerField(default=0)
    baths = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=20, choices=[("available", "Available"), ("pending", "Pending"), ("sold", "Sold")])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)



class PropertyImage(models.Model):
    property = models.ForeignKey("Property", on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to="property_images/")
    caption = models.CharField(max_length=255, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Property for {self.property.title}"