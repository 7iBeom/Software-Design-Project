from django.db import models

class URL(models.Model):
    url = models.URLField(unique=True)
    registered_at = models.DateTimeField(auto_now_add=True)
    is_dangerous = models.BooleanField(default=False)

    def __str__(self):
        return self.url

class InspectionResult(models.Model):
    url = models.ForeignKey(URL, on_delete=models.CASCADE, related_name='inspections')
    inspected_at = models.DateTimeField(auto_now_add=True)
    is_dangerous = models.BooleanField()
    description = models.TextField()

    def __str__(self):
        return f"{self.url} - {'위험' if self.is_dangerous else '안전'}"
