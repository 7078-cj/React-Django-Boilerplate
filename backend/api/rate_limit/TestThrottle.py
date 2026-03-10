from rest_framework.throttling import SimpleRateThrottle


class TestThrottle(SimpleRateThrottle):
    scope = "test"

    def get_cache_key(self, request, view):
        if request.user and request.user.is_authenticated:
            ident = request.user.id
        else:
            ident = self.get_ident(request)

        return self.cache_format % {
            "scope": self.scope,
            "ident": ident
        }