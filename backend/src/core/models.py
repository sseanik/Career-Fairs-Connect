from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, UserManager

# Create your models here.


class MyAccountManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, username, password, is_university, is_company, is_student):
        if not email:
            raise ValueError("users must have a email")
        if not first_name:
            raise ValueError("users must have a first_name")
        if not last_name:
            raise ValueError("users must have a last_name")
        if not username:
            raise ValueError("users must have a username")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            first_name=first_name,
            last_name=last_name,
            is_university=is_university,
            is_company=is_company,
            is_student=is_student,
            password=password
        )
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, username, password, is_university, is_company, is_student):
        if not email:
            raise ValueError("users must have a email")
        if not first_name:
            raise ValueError("users must have a first_name")
        if not last_name:
            raise ValueError("users must have a last_name")
        if not username:
            raise ValueError("users must have a username")

        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            first_name=first_name,
            last_name=last_name,
            is_university=is_university,
            is_company=is_company,
            is_student=is_student,
            password=password
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser):
    # default required
    username = models.CharField(max_length=30, unique=True)
    date_joined = models.DateTimeField(
        verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    # additional fields
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    # student, admin, company
    is_university = models.BooleanField(default=False)
    is_company = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name',
                       'username', 'is_university', 'is_company', 'is_student']

    objects = MyAccountManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True


class fairEvent(models.Model):
    eventId = models.AutoField(primary_key=True)
    title = models.CharField(max_length=50)
    description = models.TextField()
    eventStart = models.DateTimeField()
    eventEnd = models.DateTimeField()


class stall(models.Model):
    eventId = models.ForeignKey('fairEvent', on_delete=models.PROTECT)
    stallId = models.AutoField(primary_key=True)


class api_test(models.Model):
    test_field_1 = models.AutoField(primary_key=True)
    test_field_2 = models.CharField(max_length=50)


class Car(models.Model):
    name = models.CharField(max_length=100)
    top_speed = models.IntegerField()
