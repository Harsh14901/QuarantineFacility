from django.apps import AppConfig
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.serialization import *
import datetime
import os

class AppConfig(AppConfig):
    name = 'app'
    def ready(self):
        
        try:
            f = open("private.pem",'rb')
            print("Successfully opened Private Key")
            f.close()
        except IOError:
            print("Writing private and public key")
            private_key = rsa.generate_private_key(
                public_exponent=65537, key_size=2048, backend=default_backend())
            with open("private.pem", 'wb') as private:
                private.write(private_key.private_bytes(
                    Encoding.PEM, PrivateFormat.PKCS8, NoEncryption()))
        return super().ready()
