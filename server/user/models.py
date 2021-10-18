import uuid
from os import sys
from io import BytesIO
from PIL import Image

from django.core.files.uploadedfile import InMemoryUploadedFile

from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin, Group
from django.contrib.postgres.fields import CIEmailField, CICharField
from django.db.models import Model, DateField, DateTimeField, BooleanField, UUIDField, ImageField, TextField, CharField


from user.choices import profile_type


class MyAccountManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')

        user = self.model(email=self.normalize_email(
            email), username=username,)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(email=self.normalize_email(
            email), password=password, username=username)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    id = UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = CIEmailField(verbose_name="email",
                         max_length=100, unique=True)
    username = CICharField(max_length=50, unique=True)
    first_name = CICharField(max_length=100)
    last_name = CICharField(max_length=100)
    bio = TextField(blank=True, null=True)
    date_joined = DateTimeField(
        verbose_name='date joined', auto_now_add=True)
    last_login = DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = BooleanField(default=False)
    is_active = BooleanField(default=False)
    is_staff = BooleanField(default=False)
    is_superuser = BooleanField(default=False)
    photo = ImageField(
        upload_to='user_images', default='/user_images/avatar.png')
    profile_type = CharField(max_length=100, null=True,
                             blank=True, choices=profile_type)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = MyAccountManager()

    def __str__(self):
        return self.email

    # for permissions, to keep it simple, all admins have all permissions
    def has_perm(self, perm, obj=None):
        return self.is_admin

    # does this user has permission to view app, always yes for simplicity
    def has_module_perms(self, app_label):
        return True

    def save(self, *args, **kwargs):
        if self.photo:
            # to avoid error opening the file we use the try/catch block
            try:
                image = Image.open(self.photo)
                output = BytesIO()
                # resize the photo
                image = image.resize((512, 342))
                # after modifications, save to the output
                image.save(output, format='JPEG', quality=90)
                output.seek(0)
                # change the image field value to be the newly modified image value
                self.photo = InMemoryUploadedFile(output, 'ImageField', "%s.jpg" % self.photo.name.split(
                    '.')[0], 'image/jpeg', sys.getsizeof(output), None)
            except:
                pass
        super(User, self).save(*args, **kwargs)


# we add extra fields to the django group model
Group.add_to_class('is_active', BooleanField(default=True))
Group.add_to_class('about', CICharField(max_length=400, null=True))
Group.add_to_class('unique_name', CICharField(
    max_length=100, null=True, unique=True))
