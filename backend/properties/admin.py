from django.contrib import admin
import admin_thumbnails
from .models import Property, PropertyImage

@admin_thumbnails.thumbnail('image')
class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1

class PropertyAdmin(admin.ModelAdmin):
    inlines = [PropertyImageInline]
    list_display = ('title', 'agent', 'price', 'status')

admin.site.register(Property, PropertyAdmin)
