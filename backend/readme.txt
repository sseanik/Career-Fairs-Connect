django-admin - list available commands


##### Connecting to local server #####
#1 connect to virtual environment 9323backendenv
navigate to backend dir
(mac) $ source 9323backendenv/bin/activate
(windows) $ .\9323backendenv\bin\activate

#2 $ cd onlinecareersfair

#3 $ python3 manage.py runserver

#4 open http://localhost:8000/  
    for admin panel go to http://localhost:8000/admin
    login=admin pw=admin
    for api docs go to http://localhost:8000/swagger or http://localhost:8000/redoc
    or create new superuser if you want $ python manage.py createsuperuser


################## BACKEND NOTES ##################
Django setup
https://docs.djangoproject.com/en/3.2/intro/tutorial01/

##### Creating Databases #####
https://docs.djangoproject.com/en/3.2/intro/tutorial02/
or youtube guide: https://www.youtube.com/watch?v=aHC3uTkT9r8&list=PL-osiE80TeTtoQCKZ03TU5fNfx2UY6U4p&index=5&ab_channel=CoreySchafer

    Database fields:
    https://docs.djangoproject.com/en/3.2/ref/models/
    https://docs.djangoproject.com/en/3.2/ref/models/fields/

##### Django rest framework #####
https://www.youtube.com/watch?v=DiSoVShaOLI&list=PLgCYzUzKIBE9Pi8wtx8g55fExDAPXBsbV&index=3&ab_channel=CodingWithMitch


##### Auth #####
https://www.youtube.com/watch?v=3aVqWaLjqS4&list=PL-osiE80TeTtoQCKZ03TU5fNfx2UY6U4p&index=7&ab_channel=CoreySchafer