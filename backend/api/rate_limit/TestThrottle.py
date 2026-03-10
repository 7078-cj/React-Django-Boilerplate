from rest_framework.throttling import SimpleRateThrottle

class TestThrottle(SimpleRateThrottle):
    scope = "test"

    # Define the rate here directly instead of using settings.py
    rate = "5/min" 

    def get_cache_key(self, request, view):
        if request.user and request.user.is_authenticated:
            ident = request.user.id
        else:
            ident = self.get_ident(request)

        return self.cache_format % {
            "scope": self.scope,
            "ident": ident
        }

    def get_rate(self):
        return self.rate