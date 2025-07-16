from django.urls import path
from .views import RegisterAgentView, RegisterAdminView, loginView, AgentProfileView, AdminProfileView

urlpatterns = [
    path('register/agent/', RegisterAgentView.as_view(), name='register_agent'),
    path('register/admin/', RegisterAdminView.as_view(), name='register_admin'),
    path('login/', loginView.as_view(), name='login'),
    path("me/profile/", AgentProfileView.as_view(), name='agent-profile'),
    path('me/admin-profile/', AdminProfileView.as_view(), name='admin-profile'),
]