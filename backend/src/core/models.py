from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


# class AUTH_USER
class MyUserManager(BaseUserManager):
    def create_user(self, email, username, first_name, last_name, user_type, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')
        if not first_name:
            raise ValueError('Users must have a first_name')
        if not last_name:
            raise ValueError('Users must have a last_name')

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            first_name=first_name,
            last_name=last_name,
            user_type=user_type,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, first_name, last_name, password, user_type):

        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            username=username,
            first_name=first_name,
            last_name=last_name,
            user_type=user_type,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

    def create_student(self, email, username, first_name, last_name, password, user_type):

        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            username=username,
            first_name=first_name,
            last_name=last_name,
            user_type=user_type,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    userID = models.AutoField(primary_key=True)
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
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
    user_type = models.IntegerField(
        choices=((0, 'university'), (1, 'student'), (2, 'company')), default=0)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name',
                       'last_name', 'user_type']

    objects = MyUserManager()

    def __str__(self):
        return self.email

    # For checking permissions. to keep it simple all admin have ALL permissons
    def has_perm(self, perm, obj=None):
        return self.is_admin

    # Does this user have permission to view this app? (ALWAYS YES FOR SIMPLICITY)
    def has_module_perms(self, app_label):
        return True
# Extend using onetoonelink


class Companies(models.Model):
    company_id = models.AutoField(primary_key=True)
    company_name = models.CharField(max_length=50)
    user_id = models.ForeignKey(User, unique=True, on_delete=models.RESTRICT)
    # Discuss Max Text and Char???
    company_description = models.TextField()
    company_webpage_url = models.CharField(max_length=150)
    company_logo_url = models.CharField(max_length=150)


class Universities(models.Model):
    university_id = models.AutoField(primary_key=True)
    university_name = models.CharField(max_length=50)
    # Potential cause of issues on deleting
    user_id = models.ForeignKey(User, on_delete=models.RESTRICT)


class Events(models.Model):
    event_id = models.AutoField(primary_key=True)
    # Discuss Max Text and Char???
    university_id = models.ForeignKey(Universities, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    company_description = models.TextField()
    # default auto_now=False, auto_now_add=False
    event_start_time = models.TimeField()
    event_end_time = models.TimeField()


class Registrations(models.Model):
    event_id = models.ForeignKey(
        Events, unique=False, on_delete=models.RESTRICT)
    company_id = models.ForeignKey(
        Companies, unique=False, on_delete=models.CASCADE)
    approval_status = models.CharField(max_length=8)

    class Meta:
        unique_together = (("event_id", "company_id"),)


class Stalls(models.Model):
    stall_id = models.AutoField(primary_key=True)
    company_id = models.ForeignKey(Companies, on_delete=models.CASCADE)
    event_id = models.ForeignKey(Events, on_delete=models.CASCADE)


class Presentations(models.Model):
    presentation_id = models.AutoField(primary_key=True)
    presentation_link = models.CharField(max_length=255)


class Students(models.Model):
    student_id = models.AutoField(primary_key=True)
    university = models.CharField(max_length=50)
    degree = models.CharField(max_length=100)
    wam = models.DecimalField(max_digits=5, decimal_places=2)
    user_id = models.ForeignKey(User, unique=True, on_delete=models.RESTRICT)


class Opportunities(models.Model):
    job_id = models.AutoField(primary_key=True)
    job_description = models.TextField()
    application_link = models.CharField(max_length=100)
    stall_id = models.ForeignKey(
        Stalls, unique=True, on_delete=models.RESTRICT)
