from django.db.models import Q

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from search.models import TitleCoordinate
from .serializers import TitleSerializer
from core.views import verify_user, get_object_or_none
from core.errors import invalid_user, invalid_serializer


class TitleView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, **kwargs):
        user = verify_user(request, kwargs['userId'])
        if not user:
            return invalid_user()

        if user.profile_type != 'Staff':
            return Response({'detail': 'Permission denied'}, status=400)
        data = request.data
        try:
            title_exists = TitleCoordinate.objects.get(Q(title__iexact=data['title']) | Q(
                lat__iexact=data['lat'], lon__iexact=data['lon']))
            if title_exists:
                return Response({'detail': 'Title with these details already exists'}, status=400)
        except:
            pass
        serializer = TitleSerializer(data=data)
        if serializer.is_valid():
            title = serializer.save()
            title.created_by = user
            title.save()
            new_title = TitleSerializer(title).data
            return Response({'detail': 'Title details added successfully', 'new_title': new_title}, status=201)
        else:
            return invalid_serializer()

    def get(self, request, **kwargs):
        user = verify_user(request, kwargs['userId'])
        if not user:
            return invalid_user()

        if user.profile_type != 'Staff':
            return Response({'detail': 'Permission denied'}, status=400)
        titles = TitleCoordinate.objects.all()
        titles_data = TitleSerializer(titles, many=True).data
        return Response({'detail': 'success', 'titles_data': titles_data}, status=200)

# search for title details


class ValuerTitleView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, **kwargs):
        # user = verify_user(request, kwargs['userId'])
        # for now we disable authentication check
        # if not user:
        #     return invalid_user()

        # if user.profile_type not in ['Staff', 'Valuer']:
        #     return Response({'detail': 'Permission denied'}, status=400)
        title = get_object_or_none(
            TitleCoordinate, title__iexact=request.data['titleNumber'])
        if not title:
            return Response({'detail': 'Title number not found'}, status=400)
        title_data = TitleSerializer(title).data
        return Response({'detail': 'success', 'title_data': title_data}, status=200)
