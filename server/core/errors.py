from rest_framework.response import Response


def invalid_user():
    return Response({'detail': 'Invalid authentication details'}, status=400)


def invalid_serializer():
    return Response({'detail': 'Invalid data submitted'}, status=400)
