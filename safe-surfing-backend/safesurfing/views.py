from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import URL, InspectionResult
from .serializers import URLSerializer, InspectionResultSerializer
from .utils import check_url_with_safebrowsing
from django.db import DatabaseError
from rest_framework.generics import DestroyAPIView
from rest_framework.generics import ListAPIView


# URL 등록
class RegisterURLView(APIView):
    def post(self, request):
        serializer = URLSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# URL 검사 및 결과 반환
class InspectURLView(APIView):
    def post(self, request):
        url_str = request.data.get('url')
        if not url_str:
            return Response(
                {"detail": "URL 값이 필요합니다."},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            url_obj, created = URL.objects.get_or_create(url=url_str)
            last_result = url_obj.inspections.last()
            if last_result:
                return Response(
                    InspectionResultSerializer(last_result).data,
                    status=status.HTTP_200_OK
                )
            try:
                is_dangerous, description = check_url_with_safebrowsing(url_str)
            except Exception as api_exc:
                return Response(
                    {"detail": f"외부 보안 API 연동 실패: {api_exc}"},
                    status=status.HTTP_502_BAD_GATEWAY
                )
            result = InspectionResult.objects.create(
                url=url_obj,
                is_dangerous=is_dangerous,
                description=description
            )
            url_obj.is_dangerous = is_dangerous
            url_obj.save()
            return Response(
                InspectionResultSerializer(result).data,
                status=status.HTTP_200_OK
            )
        except DatabaseError as db_exc:
            return Response(
                {"detail": f"데이터베이스 오류: {db_exc}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        except Exception as exc:
            return Response(
                {"detail": f"알 수 없는 오류: {exc}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        

# URL 목록 조회
class URLListView(ListAPIView):
    queryset = URL.objects.all()
    serializer_class = URLSerializer

# URL 재검사
class URLReinspectView(APIView):
    def post(self, request, pk):
        inspection_id = request.data.get('inspection_id')
        try:
            url_obj = URL.objects.get(pk=pk)
            if inspection_id:
                # 특정 검사 결과만 삭제
                url_obj.inspections.filter(pk=inspection_id).delete()
            else:
                # inspection_id가 없으면 전체 삭제 (혹은 에러 반환)
                return Response({"detail": "inspection_id가 필요합니다."}, status=status.HTTP_400_BAD_REQUEST)
            # 외부 API로 재검사
            is_dangerous, description = check_url_with_safebrowsing(url_obj.url)
            # 검사 결과 저장
            result = InspectionResult.objects.create(
                url=url_obj,
                is_dangerous=is_dangerous,
                description=description
            )
            url_obj.is_dangerous = is_dangerous
            url_obj.save()
            return Response(InspectionResultSerializer(result).data)
        except URL.DoesNotExist:
            return Response({"detail": "해당 URL을 찾을 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)

# URL 삭제
class URLDeleteView(DestroyAPIView):
    queryset = URL.objects.all()
    lookup_field = 'pk'

class DeleteAllURLsView(APIView):
    def delete(self, request):
        try:
            InspectionResult.objects.all().delete()
            URL.objects.all().delete()
            return Response({"detail": "모든 데이터가 삭제되었습니다."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"detail": f"데이터 삭제 중 오류 발생: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )