import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import ProductPackage from './ProductPackage'
import ProductVariation from './ProductVariation'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: 'category_id' })
  public categoryId: number

  @column()
  public media: string

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public quantity: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => ProductPackage)
  public package: HasOne<typeof ProductPackage>

  @hasMany(() => ProductVariation)
  public variation: HasMany<typeof ProductVariation>
}
