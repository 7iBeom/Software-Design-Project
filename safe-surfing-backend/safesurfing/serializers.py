from rest_framework import serializers
from .models import URL, InspectionResult

class InspectionResultSerializer(serializers.ModelSerializer):
    url = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = InspectionResult
        fields = ['id', 'url', 'inspected_at', 'is_dangerous', 'description']

class URLSerializer(serializers.ModelSerializer):
    inspections = InspectionResultSerializer(many=True, read_only=True)
    class Meta:
        model = URL
        fields = ['id', 'url', 'is_dangerous', 'registered_at', 'inspections']
