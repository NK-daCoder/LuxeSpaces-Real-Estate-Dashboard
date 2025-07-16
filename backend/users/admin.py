# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, AgentProfile

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    # Optional: Show your custom fields in admin list and form
    list_display = ('username', 'email', 'is_agent', 'is_admin', 'is_staff')
    fieldsets = UserAdmin.fieldsets + (
        ('Role Information', {'fields': ('is_agent', 'is_admin')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Role Information', {'fields': ('is_agent', 'is_admin')}),
    )

@admin.register(AgentProfile)
class AgentProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name', 'phone_number', 'license_number', 'is_complete')
    search_fields = ('user_username', 'first_name', 'last_name')
    list_filter = ('created_at',)

    def is_complete(self, obj):
        return obj.is_complete
    is_complete.boolean = True


