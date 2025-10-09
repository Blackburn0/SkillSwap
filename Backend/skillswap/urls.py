"""
URL configuration for skillswap project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

urlpatterns = [
    path("admin/", admin.site.urls),

    path("", lambda request: HttpResponse("Welcome to SkillSwap!")), 

    # auth endpoints
    # custom endpoints (register, login overrides, etc.)
    path("api/v1/auth/", include("accounts.urls")),
    # dj-rest-auth built-in endpoints
    path("api/v1/auth/", include("dj_rest_auth.urls")),
    # dj-rest-auth registration
    path("api/v1/auth/registration/", include("dj_rest_auth.registration.urls")),
    # Social login redirects & callbacks
    path("accounts/", include("allauth.urls")),

    # user-skill endpoints
    path("api/v1/", include("userSkills.urls")),
    # Other endpoints
    path("api/v1/", include('skills.urls')),
    path("api/v1/", include("listings.urls")),
    path("api/v1/", include("reviews.urls")),
    path("api/v1/", include("userblocks.urls"))
]


# check site_id in shell
# python manage.py shell
# from django.contrib.sites.models import Site

# for site in Site.objects.all():
#     print(site.id, site.domain, site.name)
