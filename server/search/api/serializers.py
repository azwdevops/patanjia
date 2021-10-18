from rest_framework.serializers import ModelSerializer

from search.models import TitleCoordinate


class TitleSerializer(ModelSerializer):
    class Meta:
        model = TitleCoordinate
        fields = ('title', 'lat', 'lon')
