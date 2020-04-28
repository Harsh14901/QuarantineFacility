from django.core.cache import caches
from django.db.models.signals import *
from django.dispatch import receiver
from django.db.models.fields.related_descriptors import ForwardManyToOneDescriptor, ManyToManyDescriptor
from django.views.decorators.cache import cache_control
from django.views.decorators.http import etag

from rest_framework.viewsets import *

import inspect
from hashlib import md5

@receiver(post_save)
def clear_cache_on_model_save(sender, **kwargs):
    try:
        key = sender.__name__.lower()
        caches[key].clear()

        related = inspect.getmembers(sender, lambda x: isinstance(
            x, ForwardManyToOneDescriptor) or isinstance(x, ManyToManyDescriptor))
        for a, desc in related:
            post_save.send(sender=desc.field.related_model)
    except:
        pass


def get_etag(request, *args, **kwargs):
    cache = caches[kwargs['basename']]
    key = f"{request.user.username}"
    return cache.get(key, None)


class CacheMixin(object):

    @cache_control(max_age=600, must_revalidate=True)
    def dispatch(self, request, *args, **kwargs):
        @etag(get_etag)
        def _dispatch(request, *args, **kwargs):
            print("Etag-Check failed")
            cache = caches[kwargs['basename']]
            key = f"{request.user.username}"
            resp = super(ModelViewSet, self).dispatch(request, *args, **kwargs)
            resp.render()
            m = md5()
            m.update(resp.__bytes__())

            digest = m.hexdigest()
            cache.set(key, digest)
            resp._headers['etag'] = ('ETag', f"\"{digest}\"")

            return resp

        kwargs['basename'] = self.basename
        return _dispatch(request, *args, **kwargs)
