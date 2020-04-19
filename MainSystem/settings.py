"""
Django settings for reactify project.

Generated by 'django-admin startproject' using Django 2.0.6.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.serialization import *
import datetime
import os
from django.urls import reverse_lazy
import django_heroku


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = 'ksy0*&5)&=lxwj-7g+$zepz3#2*vt#os^nbi5o&2#k_s5s6ee@'
from decouple import config
import dj_database_url
SECRET_KEY = config('SECRET_KEY')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
DATABASE_URL = config('DATABASE_URL')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False
ALLOWED_HOSTS = ['*']
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Application definition

INSTALLED_APPS = [
    'whitenoise.runserver_nostatic',
    'rest_framework',
    'phone_field',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'app.apps.AppConfig',
    'django.contrib.sites',
    'corsheaders',
    'rest_framework.authtoken',
    'rest_auth',
    'rest_auth.registration',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',

]

SITE_ID = 1

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'MainSystem.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'MainSystem.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }


# Password validation
# https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Kolkata'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]
STATIC_ROOT = os.path.join(os.path.dirname(BASE_DIR), 'staticfiles')
STATIC_TMP = os.path.join(BASE_DIR, 'static')


CORS_ORIGIN_ALLOW_ALL = False
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = [
    '127.0.0.1:8000',
    '127.0.0.1:3000',
    'covid-quarantine-manager.web.app',
]

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    )
}

AUTHENTICATION_BACKENDS = (
    # default
    'django.contrib.auth.backends.ModelBackend',
    # email login
    'allauth.account.auth_backends.AuthenticationBackend',
)

ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
ACCOUNT_AUTHENTICATION_METHOD = "username_email"
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL = reverse_lazy(
    'account_confirm_complete')
ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL = reverse_lazy(
    'account_confirm_complete')

EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'djangotestinhell@gmail.com'


SETTINGS_PATH = os.path.normpath(os.path.dirname(__file__))
TEMPLATE_DIRS = (
    os.path.join(SETTINGS_PATH, 'templates'),
)

REST_USE_JWT = True

try:
    with open("private.pem", 'rb') as private:
        private_key = load_pem_private_key(
            private.read(), password=None, backend=default_backend())
    print("Successfully opened Private Key")
except IOError:
    print("Writing private key")
    private_key = rsa.generate_private_key(
        public_exponent=65537, key_size=2048, backend=default_backend())
    with open("private.pem", 'wb') as private:
        private.write(private_key.private_bytes(
            Encoding.PEM, PrivateFormat.PKCS8, NoEncryption()))


JWT_AUTH = {
    'JWT_ISSUER': "someone",
    'JWT_EXPIRATION_DELTA': datetime.timedelta(hours=12),
    'JWT_PRIVATE_KEY': private_key,
    'JWT_PUBLIC_KEY': private_key.public_key(),
    'JWT_ALGORITHM': 'RS256',
    'JWT_AUTH_COOKIE': "token"

}

# Always at the end
# import dj_database_url 
# prod_db  =  dj_database_url.config(conn_max_age=500)
# DATABASES['default'].update(prod_db)
DATABASES = {}
DATABASES = {
    'default': dj_database_url.config(
        default=config('DATABASE_URL')
    )
}

django_heroku.settings(locals())
