from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


# class AUTH_USER
class MyUserManager(BaseUserManager):
    def create_user(self, email, user_type, username="", password=None):
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            user_type=user_type,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, user_type, username=""):

        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            username=username,
            user_type=user_type,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    STUDENT = 0
    UNIVERSITY = 1
    COMPANY = 2
    # core fields required by django
    userID = models.AutoField(primary_key=True)
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    username = models.CharField(max_length=30)
    date_joined = models.DateTimeField(verbose_name="date joined", auto_now_add=True)
    last_login = models.DateTimeField(verbose_name="last login", auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    # extra fields
    user_type = models.IntegerField(
        choices=(
            (STUDENT, "student"),
            (UNIVERSITY, "university"),
            (COMPANY, "company"),
        ),
        default=0,
    )
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["user_type"]

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
    user_id = models.OneToOneField(User, on_delete=models.RESTRICT)
    # Discuss Max Text and Char???
    company_description = models.TextField()
    company_webpage_url = models.CharField(max_length=150)
    company_logo_64 = models.CharField(max_length=2000000)


class Universities(models.Model):
    university_id = models.AutoField(primary_key=True)
    university_name = models.CharField(max_length=50)
    # university_abbreviation = models.CharField(max_length=10)
    university_logo_64 = models.CharField(max_length=2000000)
    university_site_url = models.CharField(max_length=150, default="")
    # Potential cause of issues on deleting
    user_id = models.ForeignKey(User, on_delete=models.RESTRICT)


class CareerFairs(models.Model):
    event_id = models.AutoField(primary_key=True)
    university_id = models.ForeignKey(Universities, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField(default="")
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()


class Stalls(models.Model):
    stall_id = models.AutoField(primary_key=True)
    company_id = models.ForeignKey(Companies, on_delete=models.CASCADE)
    event_id = models.ForeignKey(CareerFairs, on_delete=models.CASCADE)
    approval_status = models.CharField(max_length=20, default="Pending")


class Presentations(models.Model):
    presentation_id = models.AutoField(primary_key=True)
    stall_id = models.ForeignKey(Stalls, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    color = models.CharField(max_length=255)
    textColor = models.CharField(max_length=255)
    borderColor = models.CharField(max_length=255, default="black")
    presentation_link = models.CharField(max_length=255)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    presentation_description = models.TextField(default="")


class Students(models.Model):
    student_id = models.AutoField(primary_key=True)
    university = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    degree = models.CharField(max_length=100, null=True)
    wam = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    student_logo_64 = models.CharField(max_length=2000000)
    # changed to one to one field to suppress warnings - thornton, do we want restrict or cascade?
    user_id = models.OneToOneField(User, on_delete=models.RESTRICT)


class Opportunities(models.Model):
    job_id = models.AutoField(primary_key=True)
    job_description = models.TextField()
    application_link = models.CharField(max_length=100)
    stall_id = models.ForeignKey(Stalls, on_delete=models.CASCADE)
    type = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    wam = models.CharField(max_length=100, blank=True)
    expiry = models.DateTimeField(auto_now_add=True, blank=True)


class QAMessages(models.Model):
    post_id = models.AutoField(primary_key=True)
    author_id = models.ForeignKey(User, on_delete=models.CASCADE)
    stall_id = models.ForeignKey(Stalls, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True, blank=True)
    num_upvotes = models.IntegerField(default=0)
    question = models.TextField()
    answer = models.TextField(null=True)


class Upvotes(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    post_id = models.ForeignKey(QAMessages, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("user_id", "post_id")


class Students_opportunities(models.Model):
    student_id = models.ForeignKey(Students, on_delete=models.CASCADE)
    job_id = models.ForeignKey(Opportunities, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("student_id", "job_id")
