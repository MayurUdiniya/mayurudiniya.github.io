def test_redirect_js(request):
    response = HttpResponse("", status=302)
    response['Location'] = 'javascript:alert(`last webpage you opened was ${document.location.href} with cookie ${document.cookie}`)'
    response['status'] = '302'
    return response
