
from rest_framework.routers import DefaultRouter

from restaurant.views import NoticiasView, PlatosView
router = DefaultRouter()

router.register(r'^noticias', NoticiasView)
router.register(r'^platos', PlatosView)

urlpatterns = router.urls
