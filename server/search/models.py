from uuid import uuid4

from django.db.models import CharField, Model, UUIDField, ForeignKey, CASCADE, DateTimeField
from django.contrib.postgres.fields import CICharField
from django.contrib.auth import get_user_model


User = get_user_model()


# title cordinates model

class TitleCoordinate(Model):
    id = UUIDField(primary_key=True, default=uuid4, editable=False)
    title = CICharField(max_length=255, unique=True, blank=True, null=True)
    lat = CharField(max_length=255, null=True, blank=True)
    lon = CharField(max_length=255, null=True, blank=True)
    created_by = ForeignKey(User, null=True, blank=True, on_delete=CASCADE)
    created_on = DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta():
        # to make sure that no two titles have the same coordinates
        unique_together = ('lat', 'lon')
