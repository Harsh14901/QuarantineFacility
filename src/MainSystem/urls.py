"""reactify URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
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
from django.views.generic import TemplateView
from django.urls import path, include
from django.conf.urls import url
from rest_auth.registration.views import VerifyEmailView, RegisterView
from allauth.account.views import confirm_email
from app.views import *
from rest_auth.views import PasswordResetConfirmView


urlpatterns = [
    
   
    url(r'^rest-auth/', include('rest_auth.urls')),


    url(r'^rest-auth/registration/account-email-verification-sent/',
        null_view, name='account_email_verification_sent'),
    url(r'^rest-auth/registration/account-confirm-email/(?P<key>[-:\w]+)/$',
        confirm_email, name='account_confirm_email'),
    url(r'^rest-auth/registration/complete/$', complete_view,
        name='account_confirm_complete'),
    url(r'^rest-auth/password/reset/confirm/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', PasswordResetConfirmView.as_view(),
            name='password_reset_confirm'),


    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    
    path('', TemplateView.as_view(template_name='react.html')),
    path('admin/', admin.site.urls),
    path('',include('app.urls')),
]
