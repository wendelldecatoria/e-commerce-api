import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index() {
    const categories = await Category.query()
    return categories
  }

  public async show({ params }: HttpContextContract) {
    const category = await Category.find(params.id)
    return category
  }

  public async update({ request, params }: HttpContextContract) {
    const category = await Category.find(params.id)
    if (category) {
      category.parentId = request.input('parentId')
      category.name = request.input('name')
      category.status = request.input('status')
      if (category.save()) {
        return category
      }
      return // 422
    }
    return // 401
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const category = new Category()
    category.parentId = request.input('parentId')
    category.name = request.input('name')
    category.status = request.input('status')
    await category.save()
    return category
  }

  public async destroy({ response, request, params }: HttpContextContract) {
    const product = await Category.query().where('id', params.id).delete()
    return response
  }
}
