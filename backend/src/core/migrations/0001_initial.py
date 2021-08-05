# Generated by Django 3.2.5 on 2021-08-05 04:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('userID', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=60, unique=True, verbose_name='email')),
                ('username', models.CharField(max_length=30)),
                ('date_joined', models.DateTimeField(auto_now_add=True, verbose_name='date joined')),
                ('last_login', models.DateTimeField(auto_now=True, verbose_name='last login')),
                ('is_admin', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('user_type', models.IntegerField(choices=[(0, 'student'), (1, 'university'), (2, 'company')], default=0)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='CareerFairs',
            fields=[
                ('event_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField(default='')),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Companies',
            fields=[
                ('company_id', models.AutoField(primary_key=True, serialize=False)),
                ('company_name', models.CharField(max_length=50)),
                ('company_description', models.TextField()),
                ('company_webpage_url', models.CharField(max_length=150)),
                ('company_logo_64', models.CharField(max_length=2000000)),
                ('user_id', models.OneToOneField(on_delete=django.db.models.deletion.RESTRICT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Students',
            fields=[
                ('student_id', models.AutoField(primary_key=True, serialize=False)),
                ('university', models.CharField(max_length=50)),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('degree', models.CharField(max_length=100, null=True)),
                ('wam', models.DecimalField(decimal_places=2, max_digits=5, null=True)),
                ('student_logo_64', models.CharField(max_length=2000000)),
                ('user_id', models.OneToOneField(on_delete=django.db.models.deletion.RESTRICT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Universities',
            fields=[
                ('university_id', models.AutoField(primary_key=True, serialize=False)),
                ('university_name', models.CharField(max_length=50)),
                ('university_abbreviation', models.CharField(max_length=10)),
                ('university_logo_64', models.CharField(max_length=2000000)),
                ('university_site_url', models.CharField(default='', max_length=150)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Stalls',
            fields=[
                ('stall_id', models.AutoField(primary_key=True, serialize=False)),
                ('approval_status', models.CharField(default='Pending', max_length=20)),
                ('stall_description', models.TextField()),
                ('title', models.CharField(max_length=100)),
                ('company_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.companies')),
                ('event_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.careerfairs')),
            ],
        ),
        migrations.CreateModel(
            name='QAMessages',
            fields=[
                ('post_id', models.AutoField(primary_key=True, serialize=False)),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('num_upvotes', models.IntegerField(default=0)),
                ('question', models.TextField()),
                ('answer', models.TextField()),
                ('stall_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.stalls')),
            ],
        ),
        migrations.CreateModel(
            name='Presentations',
            fields=[
                ('presentation_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=255)),
                ('color', models.CharField(max_length=255)),
                ('presentation_link', models.CharField(max_length=255)),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('presentation_description', models.TextField(default='')),
                ('stall_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.stalls')),
            ],
        ),
        migrations.CreateModel(
            name='Opportunities',
            fields=[
                ('job_id', models.AutoField(primary_key=True, serialize=False)),
                ('job_description', models.TextField()),
                ('application_link', models.CharField(max_length=100)),
                ('type', models.CharField(max_length=100)),
                ('role', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=100)),
                ('wam', models.CharField(max_length=100)),
                ('expiry', models.DateTimeField(auto_now_add=True)),
                ('link', models.CharField(max_length=500)),
                ('stall_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='core.stalls')),
            ],
        ),
        migrations.AddField(
            model_name='careerfairs',
            name='university_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.universities'),
        ),
        migrations.CreateModel(
            name='Students_opportunities',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.opportunities')),
                ('student_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.students')),
            ],
            options={
                'unique_together': {('student_id', 'job_id')},
            },
        ),
    ]
