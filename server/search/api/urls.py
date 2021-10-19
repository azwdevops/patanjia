from django.urls import path

from . import views

urlpatterns = (
    path('maintain-titles/<uuid:userId>/',
         views.TitleView.as_view(), name='maintain_titles'),
    path('valuer-get-title/<userId>/',
         views.ValuerTitleView.as_view(), name='valuer_get_title'),
)
