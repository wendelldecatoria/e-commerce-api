import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import { HttpContext } from '@adonisjs/core/build/standalone'
import Product from 'App/Models/Product'
import ProductPackage from 'App/Models/ProductPackage'
import ProductVariation from 'App/Models/ProductVariation'
// import { appKey } from 'Config/app'

export default class ProductsController {
  public async index() {
    const products = await Product.query().preload('package').preload('variation')
    return products
  }

  public async show({ params }: HttpContextContract) {
    const product = await Product.find(params.id)
    return product
  }

  public async update({ request, params }: HttpContextContract) {
    const product = await Product.find(params.id)
    if (product) {
      product.categoryId = request.input('category_id')
      product.media = request.input('media') // need to decode base 64 and save as file
      product.name = request.input('name')
      product.description = request.input('description')
      product.price = request.input('price')
      product.quantity = request.input('quantity')
      if (product.save()) {
        return product
      }
      return // 422
    }
    return // 401
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const product = new Product()
    product.categoryId = request.input('category_id')
    product.media = request.input('media') // need to decode base 64 and save as file
    product.name = request.input('name')
    product.description = request.input('description')
    product.price = request.input('price')
    product.quantity = request.input('quantity')
    await product.save()

    const productPackage = new ProductPackage()
    productPackage.productId = product.id
    productPackage.weight = request.input('weight')
    productPackage.length = request.input('length')
    productPackage.width = request.input('width')
    productPackage.height = request.input('height')
    productPackage.save()

    const variation = request.input('variation')
    variation.forEach((item) => {
      const productVariation = new ProductVariation()
      productVariation.productId = product.id
      productVariation.color = item.color
      productVariation.image = item.image
      productVariation.save()
    })
    return product
  }

  public async destroy({ response, request, params }: HttpContextContract) {
    const product = await Product.query().where('id', params.id).delete()
    return response
  }
}
