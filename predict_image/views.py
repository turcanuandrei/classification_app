from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.conf import settings
import matplotlib.pyplot as plt
import cv2
import numpy as np
from .models import ImageModel
from .serializers import ImageModelSerializer
from .utils import load_model, fashion_mnist_labels

# Load the model
model = load_model()


@api_view(['POST'])
def upload_image_view(request):
    image = request.data['image']
    try:
        image = ImageModel.objects.create(image=image)
        image.save()
    except ValueError:
        return Response({'details': 'invalid image'},
                        status=status.HTTP_400_BAD_REQUEST)

    return Response({'detail': 'image successfully uploaded!'},
                    status=status.HTTP_201_CREATED)


@api_view(['GET'])
def list_image_view(request):
    image_list = ImageModel.objects.all()
    serializer = ImageModelSerializer(image_list, many=True)

    return Response({'items': serializer.data}, status=status.HTTP_200_OK)


@api_view(['GET'])
def predict_image_view(request, pk):
    try:
        db_image = ImageModel.objects.get(pk=pk)
        serializer = ImageModelSerializer(db_image)
        image_obj = serializer.data

        if not image_obj.get('predicted', None):
            # Read the image
            image_data = cv2.imread(image_obj.get('image')[1:], cv2.IMREAD_GRAYSCALE)

            # Resize to the same size as Fashion MNIST images
            image_data = cv2.resize(image_data, (28, 28))

            # Invert image colors
            image_data = 255 - image_data

            # Reshape and scale pixel data
            image_data = (image_data.reshape(1, -1).astype(np.float32) - 127.5) / 127.5

            # Predict on the image
            confidences = model.predict(image_data)

            # Get prediction instead of confidence levels
            predictions = model.output_layer_activation.predictions(confidences)

            # Get label name from label index
            prediction = fashion_mnist_labels[predictions[0]]

            # update model
            db_image.category = prediction
            db_image.predicted = True
            db_image.save()

            return Response(status=status.HTTP_200_OK)
    except ImageModel.DoesNotExist:
        return Response({'detail': 'Image with this id does not exist!'},
                        status=status.HTTP_404_NOT_FOUND)
