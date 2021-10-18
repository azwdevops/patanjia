from django.contrib.admin import ModelAdmin, register


from .models import TitleCoordinate


@register(TitleCoordinate)
class TitleCoordinateAdmin(ModelAdmin):
    list_display = ('title', 'lat', 'lon')
