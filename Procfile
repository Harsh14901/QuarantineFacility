release: python3 manage.py makemigrations app
release: python3 manage.py migrate
web: gunicorn MainSystem.wsgi --log-file -
