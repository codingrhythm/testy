from django.conf.urls import patterns, include, url
from django.conf import settings

urlpatterns = patterns('webapp.views',
    (r'^$','index'),
    (r'^tests/$','tests'),
    (r'^test/$','test'),
    (r'^management/$','management'),
    (r'^doc/$','doc'),
    (r'^run/(?P<test_id>.*)/$','run_test'),
    (r'^result/(?P<result_id>.*)/$','view_result'),
    (r'^save/run/$','save_run'),
)

urlpatterns += patterns('',
    (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}))
