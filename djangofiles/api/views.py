from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import stripe
import json

from api.models import Category, Product, Sale
from api.serializers import CategorySerializer, ProductsSerializer, SaleSerializer

######CATEGORY######

class CategoryList(APIView):
#    '''Get all categories or create a category'''
    @csrf_exempt
    def get(self, request, format=None):
        cats = Category.objects.all()
        if request.query_params.get('title'):
            cats = cats.filter(title__contains=request.query_params.get('title'))
        serializer = CategorySerializer(cats, many=True)
        return Response(serializer.data)

    @csrf_exempt
    def post(self, request, format=None):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryDetail(APIView):
#    '''Work with an individual Category object'''
    @csrf_exempt
    def get(self, request, pk, format=None):
        cat = Category.objects.get(id=pk)
        serializer = CategorySerializer(cat)
        return Response(serializer.data)

    @csrf_exempt
    def put(self, request, pk, format=None):
        cat = Category.objects.get(id=pk)
        serializer = CategorySerializer(cat, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @csrf_exempt
    def delete(self, request, pk, format=None):
        cat = Category.objects.get(id=pk)
        cat.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

######PRODUCT######

class ProductList(APIView):
    @csrf_exempt
    def get(self, request, format=None):
        prod = Product.objects.all()
        if request.query_params.get('name'):
            prod = prod.filter(name__contains=request.query_params.get('name'))
        elif request.query_params.get('desciption'):
            prod = prod.filter(description__contains=request.query_params.get('description'))
        elif request.query_params.get('filename'):
            prod = prod.filter(filename__contains=request.query_params.get('filename'))
        elif request.query_params.get('price'):
            prod = prod.filter(price__contains=request.query_params.get('price'))
        elif request.query_params.get('category'):
            cat = Category.objects.all()
            cat = cat.filter(title__contains=request.query_params.get('category'))
            prod = prod.filter(category__in=cat)
        serializer = ProductsSerializer(prod, many=True)
        return Response(serializer.data)

    @csrf_exempt
    def post(self, request, format=None):
        serializer = ProductsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductDetail(APIView):
    @csrf_exempt
    def get(self, request, pk, format=None):
        prod = Product.objects.get(id=pk)
        serializer = ProductsSerializer(prod)
        return Response(serializer.data)

    @csrf_exempt
    def put(self, request, pk, format=None):
        prod = Product.objects.get(id=pk)
        serializer = ProductsSerializer(prod, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @csrf_exempt
    def delete(self, request, pk, format=None):
        prod = Product.objects.get(id=pk)
        prod.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

######SALES######

class SaleList(APIView):
    @csrf_exempt
    def post(self, request, format=None):
        #serializer = SaleSerializer(data=request.data)
        #if serializer.is_valid():
            #serializer.save()
            #return Response(serializer.data, status=status.HTTP_201_CREATED)
        #return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        body = json.loads(request.body)
        sale = Sale()
        sale.name = body['name']
        sale.address1 = body['address1']
        sale.address2 = body['address2']
        sale.city = body['city']
        sale.state = body['state']
        sale.zipcode = body['zipcode']
        sale.total = body['total']
        sale.items = body['items']
        sale.payment_intent = stripe.PaymentIntent.create(
            amount = sale.total,
            currency = 'usd'
        )
        sale.save()

        return Response({
            'sale_id': sale.id,
            'client_secret': sale.payment_intent['client_secret']
        })