from django.contrib import admin
from .models import URL, InspectionResult

@admin.register(URL)
class URLAdmin(admin.ModelAdmin):
    list_display = ('url', 'registered_at', 'is_dangerous')
    search_fields = ('url',)
    list_filter = ('is_dangerous',)

@admin.register(InspectionResult)
class InspectionResultAdmin(admin.ModelAdmin):
    list_display = ('url', 'inspected_at', 'is_dangerous')
    search_fields = ('url__url', 'description')
    list_filter = ('is_dangerous',)
