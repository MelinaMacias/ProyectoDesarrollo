
from rest_framework.routers import DefaultRouter

from restaurant.views import NoticiasView, PlatosView, PerfilView

router = DefaultRouter()

router.register(r'^platos', PlatosView)
router.register(r'^perfiles', PerfilView)
router.register(r'^noticias', NoticiasView)

urlpatterns = router.urls
