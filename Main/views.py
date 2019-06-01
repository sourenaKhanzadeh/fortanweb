from django.shortcuts import render

# Create your views here.


def indexPage(request):

    return render(request, "Main/index.html")

def fortanGaming(request):
    return render(request, "Main/gaming.html")

def aboutUs(request):
    return render(request, "Main/About us.html")

def services(request):
    return render(request, "Main/services.html")

def contactUs(request):
    return render(request, "Main/Contact Us.html")

