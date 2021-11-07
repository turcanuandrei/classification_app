from django.urls import path
from . import views

urlpatterns = [
    path('upload/', views.upload_image_view, name='predict_image'),
    path('images/', views.list_image_view, name='images'),
    path('predict/<int:pk>', views.predict_image_view, name='predict')
]
