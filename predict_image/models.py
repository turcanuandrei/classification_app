from django.db import models


class ImageModel(models.Model):
    category = models.CharField(max_length=100, default='not predicted yet')
    image = models.ImageField(upload_to="images/")
    predicted = models.BooleanField(default=False)

    def __str__(self):
        return str(self.image.name)
