import os
os.environ['DJANGO_SETTINGS_MODULE'] = 'arcticapi.settings'
import django 
django.setup()

from api.models import Category, Product
import json

def main():
    with open('products.json') as json_file:
        PRODUCTS = json.load(json_file)
    products = PRODUCTS['products']
    cats =[]
    for prod in products:
        if (prod['category'] not in cats):
            cat = Category()
            cat.title = prod['category']
            cat.save()
            cats.append(prod['category'])

    for prod in products:
        p = Product()
        p.name = prod['name']
        p.category = Category.objects.get(title = prod['category'])
        p.description = prod['description']
        p.filename = prod['filename']
        p.price = prod['price']
        p.save()
    
    print("LOADED THE FILE 'products.json' into the DB")


if __name__ == '__main__':
    main()