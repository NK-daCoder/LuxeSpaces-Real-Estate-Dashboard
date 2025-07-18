from django.urls import path
from .views import RegisterAgentView, RegisterAdminView, CustomTokenObtainPairView, AgentProfileView, AdminProfileView

urlpatterns = [
    path('register/agent/', RegisterAgentView.as_view(), name='register_agent'),
    path('register/admin/', RegisterAdminView.as_view(), name='register_admin'),
    path('login/', CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
    path("me/profile/", AgentProfileView.as_view(), name='agent-profile'),
    path('me/admin-profile/', AdminProfileView.as_view(), name='admin-profile'),
]