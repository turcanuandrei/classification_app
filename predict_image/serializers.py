from .models import ImageModel
from rest_framework import serializers


class ImageModelSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = ImageModel
        fields = '__all__'

    def get_image(self, obj):
        return obj.image.url
